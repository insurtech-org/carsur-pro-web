"use client";

import React, { useEffect } from "react";

export default function R() {
  // URL 쿼리 파라미터에서 action 값 추출
  const urlParams = new URLSearchParams(window.location.search);
  const action = urlParams.get("action");

  // 모바일 기기 체크
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  const handleRedirect = () => {
    if (isMobile) {
      const appScheme = "suretech://";
      const appUrl = action ? `${appScheme}${action}` : appScheme;

      const androidPackage = process.env.NEXT_PUBLIC_ANDROID_PACKAGE || "com.suretech.carsurpromobile";

      const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.suretech.carsurpromobile";
      const iosStoreUrl = "https://apps.apple.com/us/app/%EC%B9%B4%EC%8A%88%EC%96%B4%ED%94%84%EB%A1%9C/id6751558142"; // iOS 앱스토어 링크 업데이트

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Android 인텐트 방식의 딥링크
      if (isAndroid) {
        const intentUrl =
          `intent://${action || ""}#Intent;` +
          "scheme=suretech;" +
          `package=${androidPackage};` + // 개발/운영 환경에 따라 패키지명 변경
          "S.browser_fallback_url=" +
          encodeURIComponent(androidStoreUrl) +
          ";" +
          "end;";
        window.location.href = intentUrl;
      }

      // iOS 유니버설 링크 방식
      else if (isIOS) {
        // 앱이 설치되어 있는지 확인하기 위해 딥링크 시도
        const appUrl = action ? `suretech://${action}` : "suretech://";

        let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

        // 타이머 클리어 함수
        const cleanup = () => {
          if (fallbackTimer) {
            clearTimeout(fallbackTimer);
            fallbackTimer = null;
          }
        };

        // 앱이 설치되어 있지 않으면 앱스토어로 이동
        fallbackTimer = setTimeout(() => {
          window.location.href = iosStoreUrl;
        }, 1000); // 타이머를 1초로 단축

        // 앱이 열리면 타이머 클리어 (이벤트 리스너는 한 번만 실행)
        window.addEventListener("pagehide", cleanup, { once: true });
        window.addEventListener("blur", cleanup, { once: true });

        // 앱이 설치되어 있으면 앱으로 이동
        window.location.href = appUrl;
      }
    } else {
      // PC인 경우 웹으로 리다이렉트 (action이 있으면 해당 경로로)
      const webBaseUrl = process.env.NEXT_PUBLIC_WEB_URL || "https://carsur-pro.insurtech.co.kr/";
      const webUrl = action ? `${webBaseUrl}${action}` : webBaseUrl;
      window.location.href = webUrl;
    }
  };

  // 페이지 로드 시 자동 리다이렉트
  useEffect(() => {
    handleRedirect();
  }, []);

  const onClickDownButton = (type: "android" | "ios") => {
    if (type === "android") {
      window.location.href = "https://play.google.com/store/apps/details?id=com.suretech.carsurpromobile";
    } else {
      window.location.href = "https://apps.apple.com/us/app/%EC%B9%B4%EC%8A%88%EC%96%B4%ED%94%84%EB%A1%9C/id6751558142";
    }
  };

  // 앱 다운로드 권유 페이지 UI
  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-[102px] object-fill mb-8">
        <img src="/images/logo_login.png" alt="카슈어프로 로고" />
      </div>

      <p className="text-gray-500 text-sm mb-4">앱을 다운로드 후 이용해주세요</p>

      <div className="flex gap-4 justify-center">
        {/* Android 다운로드 버튼 */}
        <button onClick={() => onClickDownButton("android")} className="w-32">
          <img
            src="/images/img/app_down_button_android.png"
            alt="Android 다운로드"
            className="w-full h-full object-contain"
          />
        </button>

        {/* iOS 다운로드 버튼 */}
        <button onClick={() => onClickDownButton("ios")} className="w-32">
          <img src="/images/img/app_down_button_ios.png" alt="iOS 다운로드" className="w-full h-full object-contain" />
        </button>
      </div>
    </div>
  );
}
