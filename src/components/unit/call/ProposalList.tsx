"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { ProposeCard } from "./elements/PropesCard";
import { getProposalList } from "@/api/call.api";
import { IPageInfo } from "@/type/etc.type";
import { IProposeList } from "@/type/call.type";
import SpinnerTailwind from "@/components/common/SpinnerTailwind";

export default function Proposal() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [proposeList, setProposeList] = useState<IProposeList[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: page,
    totalItems: 0,
    totalPage: 0,
  });

  // 새로고침 함수
  const refreshData = useCallback(async () => {
    try {
      const res = await getProposalList({
        page: 1,
        size: 10,
      });

      setProposeList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      setPage(1);
      setHasMore(true);
    } catch (error) {
      console.log("데이터 새로고침 중 오류:", error);
    }
  }, []);

  useEffect(() => {
    fetchProposalList();
    window.scrollTo(0, 0);
  }, [page]);

  const fetchProposalList = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await getProposalList({
        page: page,
        size: 10,
      });

      if (page === 1) {
        setProposeList(res.items);
      } else {
        setProposeList(prev => [...prev, ...res.items]);
      }

      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

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
        console.log("새로고침");
        await refreshData();
      }}
      resistance={1}
      pullDownThreshold={50}
      maxPullDownDistance={70}
      // refreshingContent={
      //   <div className="flex justify-center py-3 text-primary-neutral text-[15px] font-medium">
      //     <SpinnerTailwind size="small" />
      //   </div>
      // }
      pullingContent={
        <div className="flex justify-center py-3 text-primary-neutral text-[12px] font-medium">
          아래로 당겨서 새로고침
        </div>
      }
      className="w-full bg-neutral-100"
    >
      <div className="flex flex-col items-start self-stretch bg-neutral-100 p-4 gap-3 flex-1 pb-24 min-h-screen">
        {proposeList.length > 0 ? (
          <>
            {proposeList.map((data, index) => (
              <div key={data.id} ref={index === proposeList.length - 1 ? lastElementRef : undefined} className="w-full">
                <ProposeCard proposeData={data} refetch={fetchProposalList} />
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
          <div className="flex flex-col items-center justify-center bg-neutral-100 h-72 w-full">
            <span className="text-primary-assistive text-[15px] font-medium">제안 중인 내역이 없어요.</span>
          </div>
        )}
      </div>
    </PullToRefresh>
  );
}
