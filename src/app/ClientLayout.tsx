"use client";

import { useEffect, useCallback, useRef } from "react";
import BottomNavigator from "@/components/common/BottomNavigator";
import { useLoadingStore } from "@/store/loading";
import Toast from "@/components/common/Toast";
import LoadingPage from "@/components/common/LoadingPage";
import CommonModal from "@/components/modal/CommonModal";
import ProposeModal from "@/components/modal/ProposeModal";
import { useToastStore } from "@/store/toast";
import AuthGuard from "@/components/common/AuthGuard";
import { useUserStore } from "@/store/user";
import { registerTokenApi } from "@/api/push.api";

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
  const { user } = useUserStore();

  // RN 환경인지 체크
  const isReactNative =
    typeof window !== "undefined" && window.ReactNativeWebView;

  // FCM 토큰 요청 여부를 추적 (세션당 한 번만)
  const hasRequestedToken = useRef(false);

  // user가 변경될 때 (로그인/로그아웃) 토큰 요청 플래그 리셋
  useEffect(() => {
    hasRequestedToken.current = false;
  }, [user?.id]);

  // 마지막으로 등록된 FCM 토큰을 localStorage에서 가져오기
  const getLastRegisteredToken = useCallback(
    (userId: number | string): string | null => {
      try {
        const stored = localStorage.getItem(`fcm_token_${userId}`);
        return stored;
      } catch {
        return null;
      }
    },
    []
  );

  // FCM 토큰을 localStorage에 저장
  const saveLastRegisteredToken = useCallback(
    (userId: number | string, token: string) => {
      try {
        localStorage.setItem(`fcm_token_${userId}`, token);
      } catch {
        // 저장 실패 시 무시
      }
    },
    []
  );

  // FCM 토큰 전송 함수
  const sendFCMToken = useCallback(
    async (
      token: string,
      deviceId: string,
      deviceType: string,
      deviceName: string
    ) => {
      // user 정보가 없으면 토큰 등록을 건너뜀
      if (!user?.id) {
        return;
      }

      // 이미 등록된 토큰과 동일한지 확인
      const lastToken = getLastRegisteredToken(user.id);
      if (lastToken === token) {
        return;
      }

      try {
        await registerTokenApi({
          userType: "FACTORY_MEMBER",
          userId: user.id,
          fcmToken: token,
          deviceId: deviceId,
          deviceType: deviceType.toUpperCase(),
          deviceName: deviceName,
        });

        // 등록 성공 시 토큰 저장
        saveLastRegisteredToken(user.id, token);
      } catch {
        // 에러 발생 시 무시
      }
    },
    [user?.id, getLastRegisteredToken, saveLastRegisteredToken]
  );

  // RN으로부터 FCM 토큰을 받기 위한 메시지 리스너
  useEffect(() => {
    if (!isReactNative) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "FCM_TOKEN") {
          // RN에서 전송한 디바이스 정보 추출
          const fcmToken = data.fcmToken || data.token; // 하위 호환성
          const deviceId = data.deviceId || "unknown_device_id";
          const deviceType = data.deviceType || data.platform || "ANDROID";
          const deviceName = data.deviceName || "unknown_device";

          // 토큰 및 디바이스 정보를 서버에 전송
          sendFCMToken(fcmToken, deviceId, deviceType, deviceName);
        }
      } catch {
        // 메시지 파싱 오류 무시
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);

    // 로그인 후 user 정보가 있으면 FCM 토큰 요청 (세션당 한 번만)
    if (user?.id && window.ReactNativeWebView && !hasRequestedToken.current) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "REQUEST_FCM_TOKEN",
        })
      );
      hasRequestedToken.current = true;
    }

    // 클린업
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [isReactNative, user?.id, sendFCMToken]);

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
