import { datadogRum } from '@datadog/browser-rum';
import { reactPlugin } from '@datadog/browser-rum-react';

/**
 * Datadog RUM 초기화 함수
 * - production 환경에서만 실행됩니다
 */
export function initDatadog() {
  // 서버 사이드 렌더링 체크
  if (typeof window === 'undefined') {
    return;
  }

  // production 환경 체크
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_ENV === 'production' ||
    process.env.NEXT_PUBLIC_ENV === 'prod';

  if (!isProduction) {
    console.log('ℹ️ [Datadog] 개발 환경 - 초기화 건너뜀');
    return;
  }

  // 이미 초기화되었는지 체크
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).__DD_RUM_INITIALIZED__) {
    return;
  }

  try {
    datadogRum.init({
      applicationId: 'a512f2a9-ea8e-4be6-bdd7-fe89f505c6ec',
      clientToken: 'pub8a7d79cb86942ae47893a63f77766e78',
      site: 'datadoghq.com',
      service: 'carsur-pro',
      env: 'prod',
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      defaultPrivacyLevel: 'mask-user-input',
      plugins: [reactPlugin({ router: true })],
    });

    // 세션 리플레이 수동 시작
    datadogRum.startSessionReplayRecording();

    // 현재 페이지 뷰 추적 시작
    datadogRum.startView(window.location.pathname);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__DD_RUM_INITIALIZED__ = true;
    console.log('✅ [Datadog] RUM 초기화 완료');
  } catch (error) {
    console.error('❌ [Datadog] 초기화 실패:', error);
  }
}
