/**
 * 앱 버전을 비교하는 함수
 * @param current 현재 버전 (예: "1.2.3")
 * @param minimum 최소 요구 버전 (예: "1.0.0")
 * @returns 현재 버전이 최소 요구 버전보다 낮으면 true
 */
export const isVersionTooOld = (
  current: string,
  minimum: string
): boolean => {
  const currentParts = current.split(".").map(Number);
  const minimumParts = minimum.split(".").map(Number);

  for (let i = 0; i < Math.max(currentParts.length, minimumParts.length); i++) {
    const currentPart = currentParts[i] || 0;
    const minimumPart = minimumParts[i] || 0;

    if (currentPart < minimumPart) return true;
    if (currentPart > minimumPart) return false;
  }

  return false; // 버전이 같으면 false
};

/**
 * RN으로부터 앱 버전을 받아오는 함수
 * @param timeout 타임아웃 시간 (ms)
 * @returns Promise<string | null> 앱 버전 또는 null
 */
export const waitForAppVersion = (timeout: number): Promise<string | null> => {
  console.log("🔍 [웹] RN 앱 버전 요청 시작");
  console.log(`⏱️ [웹] 타임아웃 설정: ${timeout}ms`);

  return new Promise((resolve) => {
    let isResolved = false;

    // 타임아웃 설정
    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        console.warn("⚠️ [웹] RN 앱 버전 수신 타임아웃 - 구버전 앱으로 간주");
        resolve(null);
      }
    }, timeout);

    // 메시지 리스너 등록
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        console.log("📨 [웹] RN으로부터 메시지 수신:", data);

        if (data.type === "APP_VERSION" && !isResolved) {
          isResolved = true;
          clearTimeout(timeoutId);

          console.log("✅ [웹] RN 앱 버전 수신 성공!");
          console.log(`📱 [웹] 받은 버전: ${data.version}`);
          console.log(`📱 [웹] 플랫폼: ${data.platform}`);

          // 버전 정보 저장
          if (data.version) {
            localStorage.setItem("rn_app_version", data.version);
            console.log("💾 [웹] localStorage에 버전 저장 완료");
            resolve(data.version);
          } else {
            console.warn("⚠️ [웹] 버전 정보가 비어있음");
            resolve(null);
          }

          // 리스너 제거
          window.removeEventListener("message", handleMessage);
          document.removeEventListener("message", handleMessage as EventListener);
        }
      } catch (error) {
        console.error("❌ [웹] 메시지 파싱 오류:", error);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);

    // RN에 버전 요청
    if (window.ReactNativeWebView) {
      console.log("📤 [웹] RN에 앱 버전 요청 전송");
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "REQUEST_APP_VERSION",
        })
      );
    } else {
      // RN 환경이 아니면 즉시 null 반환
      isResolved = true;
      clearTimeout(timeoutId);
      console.log("ℹ️ [웹] RN 환경이 아님 - 웹 브라우저에서 실행 중");
      resolve(null);
    }
  });
};

/**
 * localStorage에서 마지막으로 저장된 앱 버전을 가져오는 함수
 * @returns string | null
 */
export const getStoredAppVersion = (): string | null => {
  try {
    return localStorage.getItem("rn_app_version");
  } catch {
    return null;
  }
};
