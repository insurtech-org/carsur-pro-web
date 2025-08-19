"use client";

import List from "@/components/unit/work/List";
import { Suspense, useEffect, useRef, useState } from "react";
import { workStatus, workStatusCount } from "@/mock/data";
import { useMyWorkStore } from "@/store/mywork";
import { useRouter, useSearchParams } from "next/navigation";

// useSearchParams를 사용하는 컴포넌트를 별도로 분리
function WorkPageContent() {
  const { myWorkData } = useMyWorkStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialStatus = searchParams.get("status") || "입고확정";

  const [activeTab, setActiveTab] = useState(initialStatus);
  const [workTab, setWorkTab] = useState(workStatusCount(myWorkData));
  const filterContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const workStatusData = workStatusCount(myWorkData);
    setWorkTab(workStatusData);

    //params 초기화
    router.replace(`/work?status=${activeTab}`);
  }, [activeTab, myWorkData, router]);

  // 활성 탭이 변경될 때 해당 필터로 스크롤
  useEffect(() => {
    if (filterContainerRef.current) {
      const container = filterContainerRef.current;
      const activeButton = container.querySelector(
        `[data-status="${activeTab}"]`
      ) as HTMLElement;

      if (activeButton) {
        // 활성 버튼이 컨테이너의 중앙에 오도록 스크롤
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;

        const scrollLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    setWorkTab(workStatusCount(myWorkData));
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-col items-center self-stretch bg-white overflow-hidden">
        {/* 헤더 */}
        <div className="h-11 w-full flex flex-row justify-start items-center px-5">
          <span className="text-primary-normal text-xl font-semibold">
            내 작업 일정
          </span>
        </div>

        {/* 필터 */}
        <div
          ref={filterContainerRef}
          className="flex w-full items-start gap-1.5 overflow-x-auto scrollbar-hide py-4 px-5"
        >
          {Object.keys(workTab).map((item, idx) => (
            <button
              data-status={item}
              key={idx}
              className={`flex shrink-0 items-center justify-center min-w-[70px]  text-left py-2 px-2.5 gap-1 rounded-full  ${
                activeTab === item
                  ? "bg-primary-normal border-0"
                  : "bg-bg-normal border border-solid border-line-neutral"
              }`}
              onClick={() => onClickTab(item)}
            >
              <span
                className={`text-sm font-medium  ${
                  activeTab === item
                    ? "text-neutral-50"
                    : "text-primary-neutral"
                }`}
              >
                {item}
              </span>
              <span
                className={`text-sm font-medium ${
                  activeTab === item
                    ? "text-neutral-50"
                    : "text-secondary-normal"
                }`}
              >
                {workTab[item as keyof typeof workTab]}
              </span>
            </button>
          ))}

          <button
            className={`flex shrink-0 items-center justify-center min-w-[70px]  py-2 px-2.5 gap-1 rounded-full ${
              activeTab === "전체"
                ? "bg-primary-normal border-0"
                : "bg-bg-normal border border-solid border-line-neutral"
            }`}
            onClick={() => onClickTab("전체")}
          >
            <span
              className={`text-sm font-medium  ${
                activeTab === "전체"
                  ? "text-neutral-50"
                  : "text-primary-neutral"
              }`}
            >
              전체
            </span>
            <span
              className={`text-sm font-medium ${
                activeTab === "전체"
                  ? "text-neutral-50"
                  : "text-secondary-normal"
              }`}
            >
              {myWorkData.length}
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center self-stretch bg-bg-main flex-1 overflow-y-auto min-h-screen">
        <List currentStatus={activeTab} />
      </div>
    </>
  );
}

// 메인 컴포넌트에서 Suspense로 감싸기
export default function WorkPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <WorkPageContent />
    </Suspense>
  );
}
