import { create } from "zustand";

interface ILoadingStore {
  isLoading: boolean;
  loadingCount: number;
  debounceTimer: NodeJS.Timeout | null;
  startLoading: () => void;
  endLoading: () => void;
}

export const useLoadingStore = create<ILoadingStore>((set, get) => ({
  isLoading: false,
  loadingCount: 0,
  debounceTimer: null,

  startLoading: () => {
    const state = get();

    // 로딩 카운트 증가
    set({ loadingCount: state.loadingCount + 1 });

    // 이미 로딩 중이면 추가 처리 불필요
    if (state.isLoading) return;

    // 디바운스 타이머가 있다면 클리어
    if (state.debounceTimer) {
      clearTimeout(state.debounceTimer);
    }

    // 로딩 상태 즉시 시작
    set({ isLoading: true });
  },

  endLoading: () => {
    const state = get();

    // 로딩 카운트 감소
    const newCount = Math.max(0, state.loadingCount - 1);
    set({ loadingCount: newCount });

    // 아직 진행 중인 요청이 있으면 로딩 유지
    if (newCount > 0) return;

    // 디바운스 타이머가 있다면 클리어
    if (state.debounceTimer) {
      clearTimeout(state.debounceTimer);
    }

    // 300ms 후에 로딩 상태 해제
    const timer = setTimeout(() => {
      set({ isLoading: false, debounceTimer: null });
    }, 300);

    set({ debounceTimer: timer });
  },
}));
