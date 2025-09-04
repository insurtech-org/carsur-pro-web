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

      const androidStoreUrl = "https://play.google.com/store/apps/details?id=com.suretech.carsurpromobile";
      const iosStoreUrl = "https://carsur-pro-dev.insurtech.co.kr"; // iOS 앱스토어 ID 필요

      const isAndroid = /Android/i.test(navigator.userAgent);
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      const startTime = new Date().getTime();

      // Android 인텐트 방식의 딥링크
      if (isAndroid) {
        const intentUrl =
          `intent://${action || ""}#Intent;` +
          "scheme=suretech;" +
          "package=com.suretech.carsurpromobile;" +
          "S.browser_fallback_url=" +
          encodeURIComponent(androidStoreUrl) +
          ";" +
          "end;";
        window.location.href = intentUrl;
      }

      // iOS 유니버설 링크 방식
      else if (isIOS) {
        // 웹 URL 설정
        const webBaseUrl = "https://carsur-pro-dev.insurtech.co.kr/";
        const webUrl = action ? `${webBaseUrl}${action}` : webBaseUrl;

        // iOS의 경우 바로 웹으로 리다이렉트
        window.location.href = webUrl;
      }
    } else {
      // PC인 경우 웹으로 리다이렉트 (action이 있으면 해당 경로로)
      const webBaseUrl = "https://carsur-pro-dev.insurtech.co.kr/";
      const webUrl = action ? `${webBaseUrl}${action}` : webBaseUrl;
      window.location.href = webUrl;
    }
  };

  // 페이지 로드 시 자동 리다이렉트
  useEffect(() => {
    handleRedirect();
  }, []);

  // 로딩 중 표시를 위한 최소한의 UI 반환
  return (
    <div className="h-screen bg-white flex items-center justify-center">
      <div className="text-gray-500">이동 중...</div>
    </div>
  );
}
