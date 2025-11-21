import axios, { InternalAxiosRequestConfig } from "axios";

import { useUserStore } from "@/store/user";
import { useLoadingStore } from "@/store/loading";
import { refreshToken as refreshTokenApi } from "./auth.api";

// axios config 타입 확장 - skipLoading 옵션 추가
declare module "axios" {
  export interface AxiosRequestConfig {
    skipLoading?: boolean; // skipLoading 옵션이 true인 경우 로딩을 건너뜀
  }
}

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 20000,
});

// 토큰 갱신 중인지 확인하는 플래그
let isRefreshing = false;
// 토큰 갱신 중에 대기하는 요청들을 저장하는 큐
let refreshSubscribers: ((token: string) => void)[] = [];

// 대기 중인 요청들을 처리하는 함수
const processQueue = (error: Error | null, token: string | null) => {
  refreshSubscribers.forEach(callback => {
    if (error) {
      callback(error.message);
    } else if (token) {
      callback(token);
    }
  });
  refreshSubscribers = [];
};

// 토큰 갱신 후 원래 요청을 재시도하는 함수
const retryOriginalRequest = (originalRequest: InternalAxiosRequestConfig) => {
  return new Promise(resolve => {
    refreshSubscribers.push((token: string) => {
      originalRequest.headers.Authorization = "Bearer " + token;
      resolve(instance(originalRequest));
    });
  });
};

// 응답 인터셉터 - 로딩 종료
instance.interceptors.response.use(
  response => {
    // skipLoading 옵션이 true인 경우 로딩 종료를 건너뜀
    if (!response.config.skipLoading) {
      const { endLoading } = useLoadingStore.getState();
      endLoading();
    }
    return response;
  },
  async error => {
    // skipLoading 옵션이 true인 경우 로딩 종료를 건너뜀
    if (!error.config?.skipLoading) {
      const { endLoading } = useLoadingStore.getState();
      endLoading();
    }

    const originalRequest = error.config;

    // 로그인 API 요청인 경우 토큰 갱신을 시도하지 않음
    const isLoginRequest = originalRequest.url?.includes("/auth/factory/login");
    if (isLoginRequest) {
      return Promise.reject(error);
    }

    // 토큰 만료 에러(401)이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { tokens } = useUserStore.getState();
          const response = await refreshTokenApi({ refreshToken: tokens?.refreshToken || "" });
          const responseData = response.data.data;

          // 새로운 토큰 정보 저장
          const { setTokens, updateUser } = useUserStore.getState();
          setTokens({
            accessToken: responseData.accessToken,
            refreshToken: responseData.refreshToken,
          });

          // 사용자 정보 업데이트
          updateUser({
            id: responseData.id,
            username: responseData.username || "",
            userId: responseData.userId,
            tellNo: responseData.tellNo || "",
            factoryName: responseData.factoryName || "",
            roles: responseData.roles || "",
          });

          // 대기 중인 요청들 처리
          processQueue(null, responseData.accessToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${responseData.accessToken}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 처리
          console.error("토큰 갱신 실패:", refreshError);
          processQueue(refreshError as Error, null);

          const { clearUserStore } = useUserStore.getState();
          clearUserStore();

          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // 토큰 갱신 중인 경우 대기열에 추가
        return retryOriginalRequest(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// 요청 인터셉터 - 로딩 시작
instance.interceptors.request.use(config => {
  // skipLoading 옵션이 true인 경우 로딩을 건너뜀
  if (!config.skipLoading) {
    const { startLoading } = useLoadingStore.getState();
    startLoading();
  }

  // 로그인 API와 토큰 갱신 API는 토큰을 추가하지 않음
  const isLoginApi = config.url?.includes("/auth/factory/login");
  const isRefreshApi = config.url?.includes("/auth/factory/refresh");

  if (!isLoginApi && !isRefreshApi) {
    const { tokens } = useUserStore.getState();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
  }

  return config;
});

export default instance;
