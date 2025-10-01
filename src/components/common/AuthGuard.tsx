"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "@/store/user";
import LoadingPage from "./LoadingPage";

// 인증이 필요하지 않은 공개 라우트들
const publicRoutes = ["/login", "/find-id", "/r", "/not-found"];

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { tokens } = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Zustand persist 하이드레이션 완료 체크
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // 하이드레이션이 완료되지 않았으면 인증 체크를 건너뜀
    if (!isHydrated) {
      return;
    }

    // 공개 라우트는 인증 체크를 건너뜀
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // 토큰 존재 여부와 유효성 모두 체크
    if (!tokens?.accessToken) {
      router.replace("/login");
      return;
    }
  }, [pathname, tokens?.accessToken, router, isHydrated]);

  // 하이드레이션이 완료되지 않았거나, 공개 라우트가 아니고 accessToken이 없으면 로딩 페이지 표시
  if (!isHydrated || (!publicRoutes.includes(pathname) && !tokens?.accessToken)) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}
