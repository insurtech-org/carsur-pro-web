"use client";

import { useEffect } from "react";
import BottomNavigator from "@/components/common/BottomNavigator";
import { useLoadingStore } from "@/store/loading";
import Toast from "@/components/common/Toast";
import LoadingPage from "@/components/common/LoadingPage";
import CommonModal from "@/components/modal/CommonModal";
import ProposeModal from "@/components/modal/ProposeModal";
import { useToastStore } from "@/store/toast";
import AuthGuard from "@/components/common/AuthGuard";
import NoticeModal from "@/components/modal/Notice/NoticeModal";

// 전역 Toast 컴포넌트
function GlobalToast() {
  const { isVisible, type, message, subMessage, hideToast } = useToastStore();

  return (
    <Toast
      type={type}
      message={message}
      subMessage={subMessage}
      isVisible={isVisible}
      onClose={hideToast}
      duration={3000}
    />
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoadingStore();

  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      e.preventDefault();
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            type: "HANDLE_BACK_PRESS",
            data: {
              canGoBack: window.history.length > 1,
            },
          })
        );
      }
    };

    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthGuard>
        <div className="hybrid-container">
          <div className="flex-1 w-full">{children}</div>
          {isLoading && <LoadingPage />}
          <BottomNavigator />
        </div>
      </AuthGuard>
      <GlobalToast />
      <CommonModal />
      <ProposeModal />
      <NoticeModal />
    </div>
  );
}

// TypeScript 타입 선언
declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}
