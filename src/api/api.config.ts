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
    // 401 에러 시 로그인 페이지로 리다이렉트 ,예외 : 비밀번호 변경 로직은 401 에러 처리 X
    if (error.response?.status === 401 && !error.config.url.includes("/auth/factory/change-password")) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// 요청 인터셉터 - 로딩 시작
instance.interceptors.request.use(config => {
  const { startLoading } = useLoadingStore.getState();
  startLoading();

  const { tokens } = useUserStore.getState();
  if (tokens && tokens.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

export default instance;
