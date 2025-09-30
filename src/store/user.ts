import { create } from "zustand";
import { persist } from "zustand/middleware";

import { logout as logoutApi } from "@/api/auth.api";

// 사용자 정보 인터페이스
interface IUser {
  id: number | string;
  username: string;
  userId: string;
  tellNo: string;
  factoryName: string;
  roles: string;
}

// 토큰 정보 인터페이스
interface ITokens {
  accessToken: string;
  refreshToken: string;
}

// 사용자 store 인터페이스
interface IUserStore {
  user: IUser | null;
  tokens: ITokens | null;

  // 사용자 정보 설정
  setUser: (user: IUser) => void;

  // 토큰 설정
  setTokens: (tokens: ITokens) => void;

  // 전체 사용자 데이터 설정 (사용자 정보 + 토큰)
  setUserData: (user: IUser, tokens: ITokens) => void;

  // 사용자 정보만 업데이트
  updateUser: (userData: Partial<IUser>) => void;

  // 토큰만 업데이트
  updateTokens: (tokens: Partial<ITokens>) => void;

  // 로그아웃 (API 호출 후 데이터 초기화)
  logout: () => void;

  // 로그인 상태 확인
  isLoggedIn: () => boolean;

  // 스토어 초기화 함수 추가
  clearUserStore: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,

      setUser: user => set({ user }),

      setTokens: tokens => set({ tokens }),

      setUserData: (user, tokens) => set({ user, tokens }),

      updateUser: userData =>
        set(state => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      updateTokens: tokens =>
        set(state => ({
          tokens: state.tokens ? { ...state.tokens, ...tokens } : null,
        })),

      // 로그아웃 (API 호출 후 데이터 초기화)
      logout: async () => {
        try {
          await logoutApi();
        } catch (error) {
          console.error("로그아웃 API 호출 실패:", error);
        } finally {
          set({ user: null, tokens: null });
        }
      },

      isLoggedIn: () => {
        const state = get();
        return !!(state.user && state.tokens?.accessToken);
      },

      // 스토어 초기화 함수 추가
      clearUserStore: () => set({ user: null, tokens: null }),
    }),
    {
      name: "user-storage", // localStorage에 저장될 키 이름
      partialize: state => ({
        user: state.user,
        tokens: state.tokens,
      }), // localStorage에 저장할 데이터만 선택
    }
  )
);
