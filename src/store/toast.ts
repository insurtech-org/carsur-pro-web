import { create } from "zustand";
import { ToastActions, ToastState } from "@/type/etc.type";

export const useToastStore = create<ToastState & ToastActions>((set) => ({
  // 초기 상태
  isVisible: false,
  type: "success",
  message: "",
  subMessage: "",

  // 액션들
  showToast: (type, message, subMessage) =>
    set({ isVisible: true, type, message, subMessage }),

  hideToast: () => set({ isVisible: false }),

  showSuccess: (message, subMessage) =>
    set({ isVisible: true, type: "success", message, subMessage }),

  showError: (message, subMessage) =>
    set({ isVisible: true, type: "error", message, subMessage }),

  showInfo: (message, subMessage) =>
    set({ isVisible: true, type: "info", message, subMessage }),

  showWarning: (message, subMessage) =>
    set({ isVisible: true, type: "warning", message, subMessage }),
}));
