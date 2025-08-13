// Toast props 인터페이스
export interface ToastProps {
  type?: ToastType;
  message: string;
  subMessage?: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export interface ToastState {
  isVisible: boolean;
  type: ToastType;
  message: string;
  subMessage?: string;
}

// Toast 타입 정의
export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastState {
  isVisible: boolean;
  type: ToastType;
  message: string;
  subMessage?: string;
}

export interface ToastActions {
  showToast: (type: ToastType, message: string, subMessage?: string) => void;
  hideToast: () => void;
  showSuccess: (message: string, subMessage?: string) => void;
  showError: (message: string, subMessage?: string) => void;
  showInfo: (message: string, subMessage?: string) => void;
  showWarning: (message: string, subMessage?: string) => void;
}
