"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import CallCard from "./elements/CallCard";
import { getCallList } from "@/api/call.api";
import { ICallList } from "@/type/call.type";
import { IPageInfo } from "@/type/etc.type";
import SpinnerTailwind from "@/components/common/SpinnerTailwind";

export default function CallList() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 30초마다 실행할 인터벌을 위한 ref

  const [callList, setCallList] = useState<ICallList[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: page,
    totalItems: 0,
    totalPage: 0,
  });

  // 30초마다 첫 페이지 데이터를 새로 가져오는 함수
  const refreshData = useCallback(async () => {
    try {
      const res = await getCallList({
        page: 1,
        size: 10,
      });

      setCallList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      // 페이지를 1로 리셋하고 hasMore를 다시 true로 설정
      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.log("데이터 새로고침 중 오류:", error);
    }
  }, []);

  useEffect(() => {
    fetchCallList();
  }, [page]);

  const fetchCallList = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await getCallList({
        page: page,
        size: 10,
      });

      // 첫 페이지가 아닌 경우 기존 데이터에 추가
      if (page === 1) {
        setCallList(res.items);
      } else {
        setCallList(prev => [...prev, ...res.items]);
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
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        // 당겨서 새로고침: 첫 페이지 데이터를 다시 불러오고 상태 초기화
        await refreshData();
      }}
      resistance={1}
      pullDownThreshold={50}
      maxPullDownDistance={70}
      refreshingContent={
        <div className="flex justify-center py-3 text-primary-neutral text-[15px] font-medium">
          <SpinnerTailwind size="small" />
        </div>
      }
      pullingContent={
        <div className="flex justify-center py-3 text-primary-neutral text-[15px] font-medium">
          아래로 당겨서 새로고침
        </div>
      }
      className="w-full bg-neutral-100"
    >
      <div className="flex flex-col items-start self-stretch bg-neutral-100 p-4 gap-3 pt-4 flex-1 pb-24 min-h-screen">
        {callList.length > 0 ? (
          <>
            {callList.map((data, index) => (
              <div key={data.id} ref={index === callList.length - 1 ? lastElementRef : undefined} className="w-full">
                <CallCard callData={data} />
              </div>
            ))}

            {/* 로딩 인디케이터 */}
            {isLoading && (
              <div className="flex justify-center py-4 w-full">
                <span className="text-primary-neutral text-[15px] font-medium">로딩 중...</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center  bg-neutral-100 h-72 w-full">
            <span className="text-primary-assistive text-[15px] font-medium">내 지역 콜 요청 내역이 없어요.</span>
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}
