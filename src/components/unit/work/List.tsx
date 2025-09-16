"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import WorkCard from "./elements/WorkCard";
import { getWorkScheduleList } from "@/api/work.api";
import { IWorkList } from "@/type/work.type";
import { IPageInfo } from "@/type/etc.type";
import { WORK_STATUS } from "@/utils/enum";

export default function WorkList({
  currentStatus,
  onDataFetched,
}: {
  currentStatus: string;
  onDataFetched: () => void;
}) {
  const [workList, setWorkList] = useState<IWorkList[]>([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalItems: 0,
    totalPage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 상태가 변경될 때 데이터와 페이지 초기화
    setWorkList([]);
    setPage(1);
    setHasMore(true);
    setPageInfo({
      currentPage: 1,
      totalItems: 0,
      totalPage: 0,
    });

    // page 값을 직접 1로 전달하여 fetchWorkList 호출
    fetchWorkListWithPage(1);
    window.scrollTo(0, 0);
  }, [currentStatus]);

  useEffect(() => {
    if (page > 1) {
      fetchWorkList();
    }
  }, [page]);

  // fetchWorkList를 수정하여 페이지 파라미터를 받도록 변경
  const fetchWorkListWithPage = async (pageNum: number) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      let searchStatus = "";

      switch (currentStatus) {
        case "CANCELLED":
          searchStatus = "FACTORY_CANCELLED";
          break;
        case "TOTAL":
          searchStatus = "";
          break;
        default:
          searchStatus = currentStatus;
      }

      const res = await getWorkScheduleList({
        status: searchStatus,
        page: pageNum, // 상태값 대신 파라미터로 받은 페이지 번호 사용
        size: 10,
      });

      // 첫 페이지가 아닌 경우 기존 데이터에 추가
      if (pageNum === 1) {
        setWorkList(res.items);
      } else {
        setWorkList(prev => [...prev, ...res.items]);
      }

      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (res.items.length < 10 || res.currentPage >= res.totalPage) {
        setHasMore(false);
      }

      onDataFetched();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 기존 fetchWorkList는 현재 page 상태를 사용하도록 유지
  const fetchWorkList = () => fetchWorkListWithPage(page);

  // 새로고침을 위한 함수
  const refreshData = useCallback(async () => {
    try {
      let searchStatus = "";
      switch (currentStatus) {
        case "CANCELLED":
          searchStatus = "FACTORY_CANCELLED";
          break;
        case "TOTAL":
          searchStatus = "";
          break;
        default:
          searchStatus = currentStatus;
      }

      const res = await getWorkScheduleList({
        status: searchStatus,
        page: 1,
        size: 10,
      });

      setWorkList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      // 페이지를 1로 리셋하고 hasMore를 다시 true로 설정
      setPage(1);
      setHasMore(true);
      onDataFetched();
    } catch (error) {
      console.log("데이터 새로고침 중 오류:", error);
    }
  }, [currentStatus]);

  // 무한 스크롤을 위한 Intersection Observer 설정
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refreshData();
        return Promise.resolve();
      }}
      resistance={1}
      pullDownThreshold={50}
      maxPullDownDistance={70}
      pullingContent={
        <div className="flex justify-center py-3 text-primary-neutral text-[12px] font-medium">
          아래로 당겨서 새로고침
        </div>
      }
      className="w-full bg-neutral-100 relative"
    >
      <div className="flex flex-col items-start w-full gap-2 bg-bg-main px-5 pt-4 pb-24 min-h-screen">
        <span className="text-primary-neutral text-sm font-medium">날짜순</span>
        {workList.length === 0 ? (
          <EmptyWork status={currentStatus} />
        ) : (
          <>
            {workList.map((data, index) => (
              <div key={index} ref={index === workList.length - 1 ? lastElementRef : undefined} className="w-full">
                <WorkCard data={data} />
              </div>
            ))}

            {/* 로딩 인디케이터 */}
            {isLoading && (
              <div className="flex justify-center py-4 w-full">
                <span className="text-primary-neutral text-[15px] font-medium">로딩 중...</span>
              </div>
            )}
          </>
        )}
      </div>
    </PullToRefresh>
  );
}
//작업 없음 컴포넌트
const EmptyWork = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col items-center justify-center  bg-neutral-100 h-72 w-full">
      <span className="text-primary-assistive text-[15px] font-medium">
        {status === "CANCELLED"
          ? `아직 취소가 없어요.`
          : `아직 ${WORK_STATUS[status as keyof typeof WORK_STATUS]} 작업이 없어요.`}
      </span>
    </div>
  );
};
