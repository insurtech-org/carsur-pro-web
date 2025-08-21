"use client";

import { useEffect, useState } from "react";
import ProposalList from "@/components/unit/call/ProposalList";
import CallList from "@/components/unit/call/CallList";

export default function CallPage() {
  const [activeTab, setActiveTab] = useState<"call" | "proposal">("call");

  // 페이지 로드 시 URL 해시에 따라 탭 설정
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("proposal")) {
      setActiveTab("proposal");
    } else {
      setActiveTab("call");
    }
  }, []);

  // 해시 변경 감지
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes("proposal")) {
        setActiveTab("proposal");
      } else {
        setActiveTab("call");
      }
    };

    // 해시 변경 이벤트 리스너 등록
    window.addEventListener("hashchange", handleHashChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // 탭 변경 시 URL 해시 업데이트
  const handleTabChange = (tab: "call" | "proposal") => {
    setActiveTab(tab);
    if (tab === "proposal") {
      window.location.hash = "#proposal";
    } else {
      window.location.hash = "#call";
    }
  };

  const onClickTab = (tab: "call" | "proposal") => {
    handleTabChange(tab);
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col items-center self-stretch">
      <div className="sticky top-0 z-10 flex flex-col items-center self-stretch bg-white">
        {/* 헤더 */}
        <div className="h-11 w-full flex flex-row justify-start items-center px-5">
          <img
            className="w-[91] h-[23px]"
            src="/images/logo_hearder-horizen.png"
            alt="header"
          />
        </div>

        {/* 탭 */}
        <div className="flex w-full items-start gap-4 border-b-[1px] border-neutral-200">
          <button
            className={`flex flex-col shrink-0 flex-1 items-center pt-[12px] pb-[2px] cursor-pointer transition-colors ${
              activeTab === "call"
                ? "text-[#131211] border-b-2 border-[#131211]"
                : "text-[#212121] hover:text-[#131211]"
            }`}
            onClick={() => onClickTab("call")}
          >
            <span
              className={`text-base font-semibold ${
                activeTab === "call"
                  ? "text-primary-normal"
                  : "text-primary-assistive"
              }`}
            >
              {"내 지역 콜"}
            </span>
          </button>
          <button
            className={`flex flex-col shrink-0 flex-1 items-center pt-[12px] pb-[2px] cursor-pointer transition-colors ${
              activeTab === "proposal"
                ? "text-[#131211] border-b-2 border-[#131211]"
                : "text-[#212121] hover:text-[#131211]"
            }`}
            onClick={() => onClickTab("proposal")}
          >
            <span
              className={`text-base font-semibold ${
                activeTab === "proposal"
                  ? "text-primary-normal"
                  : "text-primary-assistive"
              }`}
            >
              {"제안 중"}
            </span>
          </button>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "call" ? <CallList /> : <ProposalList />}
    </div>
  );
}
