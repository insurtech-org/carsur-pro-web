"use client";

import List from "@/components/unit/work/List";
import { useEffect, useState } from "react";
import { workStatus } from "@/mock/data";
import { useMyWorkStore } from "@/store/mywork";

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("전체");
  const [workTab, setWorkTab] = useState(workStatus);
  const { myWorkData } = useMyWorkStore();

  useEffect(() => {
    setWorkTab(workStatus);
  }, [activeTab]);

  const onClickTab = (tab: string) => {
    setActiveTab(tab);
    setWorkTab(workStatus);
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-col items-center self-stretch bg-white overflow-hidden">
        {/* 헤더 */}
        <div className="h-11 w-full flex flex-row justify-start items-center px-5">
          <span className="text-primary-normal text-2xl font-semibold">
            내 작업 일정
          </span>
        </div>

        {/* 필터 */}
        <div className="flex w-full items-start gap-1.5 overflow-x-auto scrollbar-hide py-4 px-5">
          <button
            className={`flex shrink-0 items-start  text-left py-2 px-2.5 gap-1 rounded-full ${
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

          {Object.keys(workTab).map((item, idx) => (
            <button
              key={idx}
              className={`flex shrink-0 items-start  text-left py-2 px-2.5 gap-1 rounded-full  ${
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
                {workStatus[item as keyof typeof workStatus]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center self-stretch bg-bg-main flex-1 overflow-y-auto min-h-screen">
        <List currentStatus={activeTab} />
      </div>
    </>
  );
}
