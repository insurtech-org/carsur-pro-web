"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import BottomNavigator from "@/components/common/BottomNavigator";
import { useLoadingStore } from "@/store/loading";
import Toast from "@/components/common/Toast";
import LoadingPage from "@/components/common/LoadingPage";
import CommonModal from "@/components/modal/CommonModal";
import ProposeModal from "@/components/modal/ProposeModal";
import ForceUpdateModal from "@/components/modal/ForceUpdateModal";
import { useToastStore } from "@/store/toast";
import AuthGuard from "@/components/common/AuthGuard";
import { useUserStore } from "@/store/user";
import { registerTokenApi } from "@/api/push.api";
import { waitForAppVersion, isVersionTooOld, type AppVersionInfo } from "@/utils/versionCheck";
import NoticeModal from "@/components/modal/Notice/NoticeModal";

// 최소 요구 앱 버전 (필요 시 이 값을 변경)
const MINIMUM_APP_VERSION = "1.1.0";

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

  // FCM 토큰 요청 여부를 추적 (세션당 한 번만)
  const hasRequestedToken = useRef(false);

  // 강제 업데이트 모달 상태
  const [showForceUpdate, setShowForceUpdate] = useState(false);
  const [platform, setPlatform] = useState<"ios" | "android">("android");

  // 버전 체크 완료 여부
  const hasCheckedVersion = useRef(false);

  // user가 변경될 때 (로그인/로그아웃) 토큰 요청 플래그 리셋
  useEffect(() => {
    hasRequestedToken.current = false;
  }, [user?.id]);

  // 마지막으로 등록된 FCM 토큰을 localStorage에서 가져오기
  const getLastRegisteredToken = useCallback((userId: number | string): string | null => {
    try {
      const stored = localStorage.getItem(`fcm_token_${userId}`);
      return stored;
    } catch {
      return null;
    }
  }, []);

  // FCM 토큰을 localStorage에 저장
  const saveLastRegisteredToken = useCallback((userId: number | string, token: string) => {
    try {
      localStorage.setItem(`fcm_token_${userId}`, token);
    } catch {
      // 저장 실패 시 무시
    }
  }, []);

  // FCM 토큰 전송 함수
  const sendFCMToken = useCallback(
    async (token: string, deviceId: string, deviceType: string, deviceName: string) => {
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

  // 앱 버전 체크 (RN 환경에서만, 최초 1회)
  useEffect(() => {
    // Check RN environment inside useEffect for Next.js hydration
    // 구버전 앱에는 window.ReactNativeWebView가 없으므로 User-Agent도 체크
    const hasReactNativeWebView = typeof window !== "undefined" && !!window.ReactNativeWebView;
    const isAndroidWebView = /wv|WebView/i.test(navigator.userAgent) && /Android/i.test(navigator.userAgent);
    const isiOSWebView = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !/Safari/i.test(navigator.userAgent);
    const isReactNative = hasReactNativeWebView || isAndroidWebView || isiOSWebView;

    if (!isReactNative || hasCheckedVersion.current) {
      console.log("ℹ️ [웹] 버전 체크 건너뜀:", {
        isReactNative,
        hasReactNativeWebView,
        isAndroidWebView,
        isiOSWebView,
        hasCheckedVersion: hasCheckedVersion.current,
      });
      return;
    }

    const checkVersion = async () => {
      console.log("\n========================================");
      console.log("🚀 [웹] 강제 업데이트 체크 시작");
      console.log(`📋 [웹] 최소 요구 버전: ${MINIMUM_APP_VERSION}`);
      console.log("========================================\n");

      try {
        const VERSION_CHECK_TIMEOUT = 2000; // 2초 타임아웃

        // RN으로부터 앱 버전 및 플랫폼 정보 받아오기 (타임아웃 2초)
        const appInfo = await waitForAppVersion(VERSION_CHECK_TIMEOUT);

        console.log("\n========================================");
        console.log("📊 [웹] 버전 체크 결과");
        console.log(`   받은 앱 버전: ${appInfo.version || "null (타임아웃 또는 구버전)"}`);
        console.log(`   받은 플랫폼: ${appInfo.platform || "null"}`);
        console.log(`   최소 요구 버전: ${MINIMUM_APP_VERSION}`);
        console.log("========================================\n");

        // 플랫폼 정보가 있으면 설정, 없으면 User-Agent로 감지
        if (appInfo.platform) {
          setPlatform(appInfo.platform);
          console.log(`📱 [웹] 플랫폼 설정: ${appInfo.platform}`);
        } else {
          // Fallback: User-Agent 기반 플랫폼 감지
          const isiOSWebView = /iPhone|iPad|iPod/i.test(navigator.userAgent);
          const detectedPlatform = isiOSWebView ? "ios" : "android";
          setPlatform(detectedPlatform);
          console.log(`📱 [웹] User-Agent 기반 플랫폼 감지: ${detectedPlatform}`);
        }

        // 버전이 없으면 구버전으로 간주하여 강제 업데이트
        if (!appInfo.version) {
          console.warn("⚠️ [웹] 앱 버전 정보 없음 → 강제 업데이트 팝업 표시");
          setShowForceUpdate(true);
          return;
        }

        // 버전이 있으면 최소 요구 버전과 비교
        const isTooOld = isVersionTooOld(appInfo.version, MINIMUM_APP_VERSION);
        console.log(`🔢 [웹] 버전 비교 결과: ${isTooOld ? "구버전 (업데이트 필요)" : "최신 버전"}`);

        if (isTooOld) {
          console.warn("⚠️ [웹] 구버전 감지 → 강제 업데이트 팝업 표시");
          setShowForceUpdate(true);
        } else {
          console.log("✅ [웹] 최신 버전 사용 중 - 정상 진행");
        }
      } catch (error) {
        // 에러 발생 시 User-Agent로 플랫폼 감지하고 강제 업데이트 표시
        const isiOSWebView = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const detectedPlatform = isiOSWebView ? "ios" : "android";
        setPlatform(detectedPlatform);
        console.log(`📱 [웹] 에러 발생 시 User-Agent 기반 플랫폼 감지: ${detectedPlatform}`);

        console.error("❌ [웹] 버전 체크 중 오류 발생:", error);
        console.warn("⚠️ [웹] 오류로 인한 강제 업데이트 팝업 표시");
        setShowForceUpdate(true);
      }
    };

    hasCheckedVersion.current = true;
    checkVersion();
  }, []);

  // RN으로부터 FCM 토큰을 받기 위한 메시지 리스너
  useEffect(() => {
    // Check RN environment inside useEffect for Next.js hydration
    // 구버전 앱에는 window.ReactNativeWebView가 없으므로 User-Agent도 체크
    const hasReactNativeWebView = typeof window !== "undefined" && !!window.ReactNativeWebView;
    const isAndroidWebView = /wv|WebView/i.test(navigator.userAgent) && /Android/i.test(navigator.userAgent);
    const isiOSWebView = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !/Safari/i.test(navigator.userAgent);
    const isReactNative = hasReactNativeWebView || isAndroidWebView || isiOSWebView;

    if (!isReactNative) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);

        // 플랫폼 정보 저장
        if (data.type === "APP_VERSION" && data.platform) {
          setPlatform(data.platform.toLowerCase() === "ios" ? "ios" : "android");
        }

        if (data.type === "FCM_TOKEN") {
          // RN에서 전송한 디바이스 정보 추출
          const fcmToken = data.fcmToken || data.token; // 하위 호환성
          const deviceId = data.deviceId || "unknown_device_id";
          const deviceType = data.deviceType || data.platform || "ANDROID";
          const deviceName = data.deviceName || "unknown_device";

          // 플랫폼 정보 저장
          setPlatform(deviceType.toLowerCase() === "ios" ? "ios" : "android");

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
  }, [user?.id, sendFCMToken]);

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
      {/* 강제 업데이트 모달 (최상위 z-index) */}
      <ForceUpdateModal isOpen={showForceUpdate} platform={platform} onClose={() => setShowForceUpdate(false)} />
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
