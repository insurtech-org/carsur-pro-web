"use client";

import { ReactNode, useRef, useState, TouchEvent } from "react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
  maxPullDistance?: number;
}

export default function PullToRefresh({
  onRefresh,
  children,
  threshold = 80,
  maxPullDistance = 120,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    // 스크롤이 최상단에 있을 때만 pull-to-refresh 시작
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isRefreshing || !containerRef.current || containerRef.current.scrollTop > 0) {
      return;
    }

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    // 아래로 당기는 경우만 처리
    if (distance > 0) {
      // 당기는 거리에 저항 효과 적용 (rubber band effect)
      const adjustedDistance = Math.min(
        distance * 0.5,
        maxPullDistance
      );
      setPullDistance(adjustedDistance);
    }
  };

  const handleTouchEnd = async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
    startY.current = 0;
  };

  const showRefreshIndicator = pullDistance > 0 || isRefreshing;
  const rotation = Math.min((pullDistance / threshold) * 360, 360);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 새로고침 인디케이터 */}
      {showRefreshIndicator && (
        <div
          className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ease-out z-10"
          style={{
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            opacity: pullDistance > 20 || isRefreshing ? 1 : pullDistance / 20,
          }}
        >
          <div
            className={`w-8 h-8 border-3 border-secondary-normal border-t-transparent rounded-full ${
              isRefreshing ? "animate-spin" : ""
            }`}
            style={{
              transform: isRefreshing ? undefined : `rotate(${rotation}deg)`,
              borderWidth: "3px",
            }}
          />
        </div>
      )}

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto"
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? "transform 0.2s ease-out" : "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}
