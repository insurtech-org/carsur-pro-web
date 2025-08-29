"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMyWorkStore } from "@/store/mywork";
import { useHideNavigator } from "@/hook/useHideNavigator";

// 네비게이션 아이템 타입 정의
interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

// 네비게이션 아이템 데이터
const navItems: NavItem[] = [
  {
    id: "local-call",
    label: "내 지역 콜",
    path: "/call",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M12 2C14.3869 2 16.6761 2.94821 18.364 4.63604C20.0518 6.32387 21 8.61305 21 11C21 14.074 19.324 16.59 17.558 18.395C16.6757 19.2871 15.7129 20.0958 14.682 20.811L14.256 21.101L14.056 21.234L13.679 21.474L13.343 21.679L12.927 21.921C12.6446 22.0822 12.3251 22.1669 12 22.1669C11.6749 22.1669 11.3554 22.0822 11.073 21.921L10.657 21.679L10.137 21.359L9.945 21.234L9.535 20.961C8.42283 20.2085 7.3869 19.3491 6.442 18.395C4.676 16.589 3 14.074 3 11C3 8.61305 3.94821 6.32387 5.63604 4.63604C7.32387 2.94821 9.61305 2 12 2ZM12 8C11.606 8 11.2159 8.0776 10.8519 8.22836C10.488 8.37913 10.1573 8.6001 9.87868 8.87868C9.6001 9.15726 9.37913 9.48797 9.22836 9.85195C9.0776 10.2159 9 10.606 9 11C9 11.394 9.0776 11.7841 9.22836 12.1481C9.37913 12.512 9.6001 12.8427 9.87868 13.1213C10.1573 13.3999 10.488 13.6209 10.8519 13.7716C11.2159 13.9224 11.606 14 12 14C12.7956 14 13.5587 13.6839 14.1213 13.1213C14.6839 12.5587 15 11.7956 15 11C15 10.2044 14.6839 9.44129 14.1213 8.87868C13.5587 8.31607 12.7956 8 12 8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "my-work",
    label: "내 작업",
    path: "/work",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M9 3C12.3137 3 15 5.68629 15 9C15 9.36474 14.9666 9.72165 14.9037 10.0683C14.8432 10.4019 14.9731 10.7427 15.2129 10.9824L19.8389 15.6084C21.007 16.7766 21.007 18.6707 19.8389 19.8389C18.6707 21.007 16.7766 21.007 15.6084 19.8389L10.9824 15.2119C10.743 14.9725 10.4022 14.8431 10.069 14.9036C9.72216 14.9666 9.365 15 9 15C5.68629 15 3 12.3137 3 9C3 7.99378 3.24744 7.04527 3.68512 6.21236C3.75707 6.07543 3.95119 6.07224 4.06055 6.18164L7.59668 9.71777C8.1825 10.3032 9.13211 10.3034 9.71777 9.71777C10.3034 9.13211 10.3032 8.1825 9.71777 7.59668L6.18164 4.06055C6.07224 3.95119 6.07543 3.75707 6.21236 3.68512C7.04527 3.24744 7.99378 3 9 3Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "my-profile",
    label: "마이페이지",
    path: "/mypage",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M17.0001 7C17.0001 9.76142 14.7615 12 12.0001 12C9.23866 12 7.00008 9.76142 7.00008 7C7.00008 4.23858 9.23866 2 12.0001 2C14.7615 2 17.0001 4.23858 17.0001 7Z"
          fill="currentColor"
        />
        <path
          d="M12.0001 13C17.4544 13 20.2096 17.0844 20.8458 19.7822C21.1548 21.0935 20.0383 22 19.0001 22H5.00008C3.96182 22 2.84541 21.0935 3.15438 19.7822L3.22079 19.5254C3.96583 16.8331 6.71612 13 12.0001 13Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function BottomNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const { myWorkData } = useMyWorkStore();

  const [activeTab, setActiveTab] = useState(pathname);

  // pathname이 변경될 때마다 activeTab을 동기화
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // 네비게이션 클릭 핸들러
  const handleNavClick = (item: NavItem) => {
    setActiveTab(item.path);
    router.push(item.path);
  };

  // BottomNavigator를 숨길 페이지들
  const hiddenPaths = [
    "/login", // 로그인 페이지
    "/call/[id]", // 콜 상세 페이지 (동적 라우트)
    "/work/[id]", // 작업 상세 페이지 (동적 라우트)
    "/find-id", // 아이디 찾기 페이지
    "/find-password", // 비밀번호 찾기 페이지
    "/mypage/terms", // 이용약관 페이지
    "/mypage/terms/service", // 서비스 이용약관 페이지
    "/mypage/terms/personal", // 개인정보 수집 이용 동의 페이지
    "/mypage/account", // 계정관리 페이지
    "/mypage/account/change-password", // 비밀번호 변경 페이지
    "/r", // 앱 열기 페이지
  ];

  // 현재 경로가 숨겨야 할 페이지인지 확인
  const shouldHide = hiddenPaths.some(path => {
    if (path.includes("[") && path.includes("]")) {
      // 동적 라우트 패턴 매칭 (예: /call/[id])
      const pathPattern = path.replace(/\[.*?\]/g, "[^/]+");
      const regex = new RegExp(`^${pathPattern}$`);
      return regex.test(pathname);
    }
    return pathname === path;
  });

  // body 클래스로 네비게이터 숨김 여부 확인
  const isHiddenByHook = typeof document !== "undefined" && document.body.classList.contains("hide-bottom-navigator");

  //숨겨할 페이지에서는 return
  if (shouldHide || isHiddenByHook) return null;

  return (
    <div className="responseNavigator fixed bottom-0 left-0 right-0 w-full bg-white rounded-t-lg z-50 ">
      <div className="flex items-center justify-around pb-6 bg-white shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.04)] rounded-t-lg">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`flex flex-col items-center justify-center gap-1.5 px-2 py-2 rounded-xl transition-all duration-200 ease-in-out w-[100px] ${
              activeTab === item.path ? "text-primary-normal" : "text-neutral-500"
            }`}
          >
            <div className="flex items-center justify-center w-6 h-6 relative">
              {item.id === "my-work" && myWorkData.filter(item => item.status === "입고확정").length > 0 && (
                <div className="w-5 h-4 bg-status-destructive rounded-full flex items-center justify-center absolute top-[0px] right-[-15px]">
                  <span className="text-common-white text-xs font-medium">
                    {myWorkData.filter(item => item.status === "입고확정").length}
                  </span>
                </div>
              )}
              {item.icon}
            </div>
            <span
              className={`text-xs font-medium leading-none tracking-tight ${
                activeTab === item.path ? "text-primary-normal" : "text-neutral-500"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
