"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import BottomNavigator from "@/components/common/BottomNavigator";
import { useToastStore } from "@/store/toast";
import Toast from "@/components/common/Toast";
import LoadingPage from "@/components/common/LoadingPage";
import { useLoadingStore } from "@/store/loading";
import CommonModal from "@/components/modal/CommonModal";
import AuthGuard from "@/components/common/AuthGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useLoadingStore();

  // 안드로이드 뒤로가기 버튼 처리
  useEffect(() => {
    const handleBackButton = (e: PopStateEvent) => {
      e.preventDefault();

      // window.ReactNativeWebView가 존재하는 경우에만 메시지 전송
      if (window.ReactNativeWebView) {
        // React Native에 메시지 전송
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
    <html lang="ko">
      <head>
        {/* 프리텐다드 웹폰트 CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        <div className="min-h-screen bg-gray-50">
          <AuthGuard>
            <div className="hybrid-container">
              <div className="flex-1 w-full">{children}</div>
              {isLoading && <LoadingPage />}
              <BottomNavigator />
            </div>
          </AuthGuard>
        </div>

        {/* 전역 Toast 렌더링 */}
        <GlobalToast />

        {/* 전역 모달 렌더링 */}
        <CommonModal />
      </body>
    </html>
  );
}

// TypeScript 타입 선언 추가 (파일 최상단에 추가)
declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}

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
