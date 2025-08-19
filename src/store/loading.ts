import { create } from "zustand";

interface ILoadingStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<ILoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
