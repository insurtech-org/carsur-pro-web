import { useCallback, useEffect, useRef, useState } from "react";

// 페이지 정보 인터페이스
export interface PageInfo {
  currentPage: number;
  totalItems: number;
  totalPage: number;
}

// API 응답 인터페이스 (items 배열을 포함하는 모든 응답에 대응)
export interface ApiResponse<T> {
  items: T[];
  currentPage: number;
  totalItems: number;
  totalPage: number;
}

// 무한스크롤 hook의 반환 타입
export interface UseInfiniteScrollReturn<T> {
  // 데이터 관련
  data: T[];
  pageInfo: PageInfo;

  // 상태 관련
  isLoading: boolean;
  hasMore: boolean;

  // 함수들
  fetchData: () => Promise<void>;
  resetData: () => void;
  lastElementRef: (node: HTMLDivElement | null) => void;

  // 페이지 관련
  page: number;
  setPage: (page: number) => void;
}

// 무한스크롤 hook 설정 옵션
export interface UseInfiniteScrollOptions<T> {
  // API 호출 함수
  fetchFunction: (page: number, size: number) => Promise<ApiResponse<T>>;

  // 페이지 크기 (기본값: 10)
  pageSize?: number;

  // 초기 페이지 (기본값: 1)
  initialPage?: number;

  // 데이터 초기화 여부 (기본값: true)
  autoFetch?: boolean;

  // 에러 처리 함수 (선택사항)
  onError?: (error: any) => void;
}

/**
 * 무한스크롤 기능을 제공하는 커스텀 hook
 *
 * @param options - hook 설정 옵션
 * @returns 무한스크롤 관련 상태와 함수들
 *
 * @example
 * ```tsx
 * const {
 *   data: callList,
 *   isLoading,
 *   hasMore,
 *   lastElementRef,
 *   fetchData
 * } = useInfiniteScroll({
 *   fetchFunction: getCallList,
 *   pageSize: 10
 * });
 *
 * // JSX에서 사용
 * {callList.map((item, index) => (
 *   <div key={item.id} ref={index === callList.length - 1 ? lastElementRef : undefined}>
 *     <ItemCard item={item} />
 *   </div>
 * ))}
 * ```
 */
export function useInfiniteScroll<T>({
  fetchFunction,
  pageSize = 10,
  initialPage = 1,
  autoFetch = true,
  onError,
}: UseInfiniteScrollOptions<T>): UseInfiniteScrollReturn<T> {
  // 상태 관리
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: initialPage,
    totalItems: 0,
    totalPage: 0,
  });

  // Intersection Observer 참조
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 데이터 가져오기 함수
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetchFunction(page, pageSize);

      // 첫 페이지가 아닌 경우 기존 데이터에 추가
      if (page === initialPage) {
        setData(response.items);
      } else {
        setData(prev => [...prev, ...response.items]);
      }

      // 페이지 정보 업데이트
      setPageInfo({
        currentPage: response.currentPage,
        totalItems: response.totalItems,
        totalPage: response.totalPage,
      });

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (response.items.length < pageSize || response.currentPage >= response.totalPage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("무한스크롤 데이터 가져오기 실패:", error);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, page, pageSize, initialPage, isLoading, onError]);

  // 데이터 초기화 함수
  const resetData = useCallback(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    setPageInfo({
      currentPage: initialPage,
      totalItems: 0,
      totalPage: 0,
    });
  }, [initialPage]);

  // 페이지 변경 시 데이터 가져오기
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [page, autoFetch, fetchData]);

  // 마지막 요소 참조 함수 (Intersection Observer 설정)
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  // 컴포넌트 언마운트 시 Observer 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    data,
    pageInfo,
    isLoading,
    hasMore,
    fetchData,
    resetData,
    lastElementRef,
    page,
    setPage,
  };
}
