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
  (response) => {
    const { setIsLoading } = useLoadingStore.getState();
    setIsLoading(false);
    return response;
  },
  (error) => {
    const { setIsLoading } = useLoadingStore.getState();
    setIsLoading(false);
    // 401 에러 시 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// 요청 인터셉터 - 로딩 시작
instance.interceptors.request.use((config) => {
  const { setIsLoading } = useLoadingStore.getState();
  setIsLoading(true);

  const { tokens } = useUserStore.getState();
  if (tokens && tokens.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }

  return config;
});

export default instance;
