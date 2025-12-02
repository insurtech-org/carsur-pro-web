"use client";

import List from "@/components/unit/work/List";
import { useEffect, useRef, useState } from "react";
import { getWorkScheduleTabCount } from "@/api/work.api";
import { FILTER_STATUS } from "@/utils/enum";
import { IWorkStatusCount } from "@/type/work.type";
import { convertSnakeToCamel } from "@/utils/util";
import { useRouter, useSearchParams } from "next/navigation";
import NoticeBanner from "@/components/common/NoticeBanner";

// useSearchParams를 사용하는 컴포넌트를 별도로 분리
export default function WorkPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const rawStatus = searchParams.get("status") || "CONFIRMED";

  // CANCELLED 관련 상태들을 CANCELLED로 통일
  const status = rawStatus.includes("CANCELLED") ? "CANCELLED" : rawStatus;

  const filterContainerRef = useRef<HTMLDivElement>(null);
  const initialStatus = !status || status === "undefined" || status === "" ? "CONFIRMED" : status;
  const [activeTab, setActiveTab] = useState(initialStatus);
  const [workStatusCount, setWorkStatusCount] = useState<IWorkStatusCount>({
    billingCompletedCount: 0,
    cancelledCount: 0,
    confirmedCount: 0,
    releasedCount: 0,
    repairCompletedCount: 0,
    repairStartedCount: 0,
    totalCount: 0,
  });

  useEffect(() => {
    fetchWorkStatus();

    // URL이 기본값과 다른 경우에만 업데이트
    if (!status || status === "undefined" || status === "") {
      router.push(`/work?status=CONFIRMED`);
    }
  }, []);

  // 활성 탭이 변경될 때 해당 필터로 스크롤
  useEffect(() => {
    if (filterContainerRef.current) {
      const container = filterContainerRef.current;
      const activeButton = container.querySelector(`[data-status="${activeTab}"]`) as HTMLElement;

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

    // 현재 URL의 searchParams를 새로 생성
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", tab);

    // URL 업데이트
    router.push(`/work?${String(params)}`);
  };

  const fetchWorkStatus = async () => {
    try {
      const res = await getWorkScheduleTabCount();
      setWorkStatusCount(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex flex-col items-center self-stretch bg-white overflow-hidden">
        {/* 헤더 */}
        <div className="h-11 w-full flex flex-row justify-start items-center px-5">
          <span className="text-primary-normal text-xl font-semibold">내 작업 일정</span>
        </div>

        {/* 공지 배너 */}
        <NoticeBanner
          notices={[
            {
              id: 1,
              title: "메시지 및 푸시 기능 업데이트",
              buttonText: "확인하기",
              imageSrc: "/images/img/notice/notice_ banner.png",
              link: "https://insurtech-kr.notion.site/2af19a26799880bd94b2e69fcdfa203a",
            },
            {
              id: 2,
              title: "담당자 배정/변경 푸시알림 기능",
              buttonText: "확인하기",
              imageSrc: "/images/img/notice/notice_banner_2.png",
              link: "https://insurtech-kr.notion.site/2bd19a2679988005a15dcddc7c7af023",
            },
          ]}
        />

        {/* 필터 */}
        <div
          ref={filterContainerRef}
          className="flex w-full items-start gap-1.5 overflow-x-auto scrollbar-hide py-4 px-5"
        >
          {Object.keys(FILTER_STATUS).map((item, idx) => (
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
                className={`text-sm font-medium  ${activeTab === item ? "text-neutral-50" : "text-primary-neutral"}`}
              >
                {FILTER_STATUS[item as keyof typeof FILTER_STATUS]}
              </span>
              <span
                className={`text-sm font-medium ${
                  activeTab === item
                    ? "text-neutral-50"
                    : workStatusCount[`${convertSnakeToCamel(item)}Count` as keyof IWorkStatusCount] === 0
                    ? "text-primary-asstive"
                    : "text-secondary-normal"
                }`}
              >
                {workStatusCount[`${convertSnakeToCamel(item)}Count` as keyof IWorkStatusCount] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center self-stretch bg-bg-main flex-1 overflow-y-auto min-h-screen">
        <List currentStatus={activeTab} onDataFetched={fetchWorkStatus} />
      </div>
    </>
  );
}
