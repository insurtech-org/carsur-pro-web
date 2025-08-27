import { useCallback, useEffect, useRef, useState } from "react";
import { IPageInfo } from "@/type/etc.type";

interface UseInfiniteScrollProps<T> {
  fetchData: (
    page: number,
    size: number
  ) => Promise<{
    items: T[];
    currentPage: number;
    totalItems: number;
    totalPage: number;
  }>;
  pageSize?: number;
  refreshInterval?: number;
}

interface UseInfiniteScrollReturn<T> {
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  pageInfo: IPageInfo;
  lastElementRef: (node: HTMLDivElement) => void;
}

export function useInfiniteScroll<T>({
  fetchData,
  pageSize = 5,
  refreshInterval = 30000,
}: UseInfiniteScrollProps<T>): UseInfiniteScrollReturn<T> {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: page,
    totalItems: 0,
    totalPage: 0,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 데이터 새로고침 함수
  const refreshData = useCallback(async () => {
    try {
      const res = await fetchData(1, pageSize);

      setData(res.items);
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
  }, [fetchData, pageSize]);

  // 데이터 가져오기 함수
  const loadData = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetchData(page, pageSize);

      // 첫 페이지가 아닌 경우 기존 데이터에 추가
      if (page === 1) {
        setData(res.items);
      } else {
        setData(prev => [...prev, ...res.items]);
      }

      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (res.items.length < pageSize || res.currentPage >= res.totalPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.log("데이터 로딩 중 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경시 데이터 로드
  useEffect(() => {
    loadData();
  }, [page]);

  // 주기적 데이터 새로고침 설정
  useEffect(() => {
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(refreshData, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshData, refreshInterval]);

  // Intersection Observer 설정
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

  return { data, isLoading, hasMore, pageInfo, lastElementRef };
}
