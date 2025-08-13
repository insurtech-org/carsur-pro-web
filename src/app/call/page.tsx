"use client";

import { useEffect, useState } from "react";
import Call from "@/components/unit/call/Call";
import Proposal from "@/components/unit/call/Proposal";

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
    <div className="flex flex-col items-center self-stretch bg-neutral-100">
      {/* 탭 헤더 */}
      <div className="sticky top-0 z-10  flex items-center self-stretch px-5 gap-12 mb-4 bg-bg-main">
        <div className="flex flex-1 items-start gap-4">
          <button
            className={`flex flex-col shrink-0 items-center pt-[12px] pb-[2px] cursor-pointer transition-colors ${
              activeTab === "call"
                ? "text-[#131211] border-b-2 border-[#131211]"
                : "text-[#212121] hover:text-[#131211]"
            }`}
            onClick={() => onClickTab("call")}
          >
            <span className="text-[22px] font-bold">{"내 지역 콜"}</span>
          </button>
          <button
            className={`flex flex-col shrink-0 items-center pt-[12px] pb-[2px] cursor-pointer transition-colors ${
              activeTab === "proposal"
                ? "text-[#131211] border-b-2 border-[#131211]"
                : "text-[#212121] hover:text-[#131211]"
            }`}
            onClick={() => onClickTab("proposal")}
          >
            <span className="text-[22px] font-bold">{"제안 중"}</span>
          </button>
        </div>
        <div className="w-[62px] h-6"></div>
      </div>

      {/* 탭 컨텐츠 */}
      {activeTab === "call" ? <Call /> : <Proposal />}
    </div>
  );
}
