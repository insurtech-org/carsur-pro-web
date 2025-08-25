import { create } from "zustand";
import { ModalState, ModalActions, ModalConfig } from "@/type/etc.type";

export const useModalStore = create<ModalState & ModalActions>((set) => ({
  // 초기 상태
  isOpen: false,
  config: null,

  // 액션들
  showModal: (config: ModalConfig) => set({ isOpen: true, config }),

  hideModal: () => set({ isOpen: false, config: null }),
}));
