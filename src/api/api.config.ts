import axios from "axios";

import { useUserStore } from "@/store/user";
import { useLoadingStore } from "@/store/loading";

// axios 인스턴스 생성
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

// 응답 인터셉터 - 로딩 종료
instance.interceptors.response.use(
  response => {
    const { endLoading } = useLoadingStore.getState();
    endLoading();
    return response;
  },
  error => {
    const { endLoading } = useLoadingStore.getState();

    endLoading();

    // 401 에러 시 로그인 페이지로 리다이렉트
    // 예외: 특정 페이지들에서는 401 에러 처리 X
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isPasswordChange = error.config.url.includes("/auth/factory/change-password");
      const isAuthPage = currentPath === "/login" || currentPath === "/find-id";

      // 비밀번호 변경이나 인증 관련 페이지가 아닌 경우에만 리다이렉트
      if (!isPasswordChange && !isAuthPage) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// 요청 인터셉터 - 로딩 시작
instance.interceptors.request.use(config => {
  const { startLoading } = useLoadingStore.getState();
  startLoading();

  // 로그인 API는 토큰을 추가하지 않음
  const isLoginApi = config.url?.includes("/auth/factory/login");

  if (!isLoginApi) {
    const { tokens } = useUserStore.getState();
    if (tokens && tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
  }

  return config;
});

export default instance;
