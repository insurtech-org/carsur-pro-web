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

//페이지 정보
export interface IPageInfo {
  currentPage: number;
  totalItems: number;
  totalPage: number;
}

// 모달 관련 타입 정의
export interface CommonModalConfig {
  title: string;
  description?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  type?: "confirm" | "alert";
}

export interface AppWebSelectModalConfig {
  type: "app-web-select";
  onSelectApp?: () => void;
  onSelectWeb?: () => void;
}

export type ModalConfig = CommonModalConfig | AppWebSelectModalConfig;

export interface ModalState {
  isOpen: boolean;
  config: ModalConfig | null;
}

export interface ModalActions {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

// * 서버 에러 응답 타입 정의
export interface ServerErrorResponse {
  result: boolean;
  code: string;
  message: string;
  data: any;
}
