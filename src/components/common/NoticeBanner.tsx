"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { openExternalLink } from "@/utils/util";

/** 개별 공지 아이템 타입 */
export interface NoticeItem {
  id: string | number;
  title: string;
  buttonText?: string;
  imageSrc?: string;
  imageAlt?: string;
  link: string;
}

interface NoticeBannerProps {
  notices: NoticeItem[];
  autoSlideInterval?: number; // 기본값 5000ms
}

/**
 * 공지사항 배너 캐러셀 컴포넌트
 * - 여러 공지사항 슬라이드 지원
 * - 5초마다 자동 전환
 * - 좌우 스와이프 지원 (무한 루프)
 * - 오른쪽에서 왼쪽으로 끊김 없는 슬라이드 애니메이션
 * - 배지: 2개 이상일 때만 표시
 */
export default function NoticeBanner({ notices, autoSlideInterval = 5000 }: NoticeBannerProps) {
  const noticesLength = notices?.length || 0;

  // 클론 슬라이드 기법: 2개 이상일 때 앞뒤에 클론 추가
  const extendedNotices = useMemo(() => {
    if (!notices || notices.length <= 1) return notices || [];
    // [마지막] + [원본 배열] + [첫번째]
    return [notices[notices.length - 1], ...notices, notices[0]];
  }, [notices]);

  // 인덱스: 클론이 있으면 1부터 시작 (실제 첫번째 아이템 위치)
  const [currentIndex, setCurrentIndex] = useState(noticesLength > 1 ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 실제 인덱스 계산 (배지 표시용)
  const realIndex = useMemo(() => {
    if (noticesLength <= 1) return 0;
    if (currentIndex === 0) return noticesLength - 1;
    if (currentIndex === extendedNotices.length - 1) return 0;
    return currentIndex - 1;
  }, [currentIndex, noticesLength, extendedNotices.length]);

  // 다음 슬라이드
  const goNext = useCallback(() => {
    if (isAnimating || noticesLength <= 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
  }, [isAnimating, noticesLength]);

  // 이전 슬라이드
  const goPrev = useCallback(() => {
    if (isAnimating || noticesLength <= 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
  }, [isAnimating, noticesLength]);

  // 트랜지션 종료 핸들러 - 클론 위치에서 실제 위치로 순간이동
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);

    if (noticesLength <= 1) return;

    // 마지막 클론(첫번째 복제본) 도달 → 실제 첫번째로 순간이동
    if (currentIndex === extendedNotices.length - 1) {
      setCurrentIndex(1);
    }
    // 첫번째 클론(마지막 복제본) 도달 → 실제 마지막으로 순간이동
    else if (currentIndex === 0) {
      setCurrentIndex(extendedNotices.length - 2);
    }
  }, [currentIndex, extendedNotices.length, noticesLength]);

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    if (noticesLength <= 1) return;

    const timer = setInterval(() => {
      goNext();
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [currentIndex, noticesLength, autoSlideInterval, goNext]);

  // 공지가 없으면 렌더링하지 않음
  if (!notices || notices.length === 0) {
    return null;
  }

  // 터치 시작
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // 터치 이동 (스크롤 방지)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (noticesLength <= 1) return;
    const diff = Math.abs(touchStartX.current - e.touches[0].clientX);
    if (diff > 10) {
      e.preventDefault();
    }
  };

  // 터치 종료 → 스와이프 방향 판단
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    // 50px 이상 스와이프 시 전환
    if (diff > 50) {
      goNext(); // 왼쪽으로 스와이프 → 다음
    } else if (diff < -50) {
      goPrev(); // 오른쪽으로 스와이프 → 이전
    }
  };

  // 클릭 시 해당 공지의 링크로 이동
  const handleClick = (notice: NoticeItem) => {
    if (notice.link) {
      openExternalLink(notice.link);
    }
  };

  // 슬라이드 배열 결정 (1개면 원본, 2개 이상이면 확장 배열)
  const slidesToRender = noticesLength > 1 ? extendedNotices : notices;

  return (
    <div className="w-full px-5 py-2">
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="w-full bg-gray-100 rounded-lg overflow-hidden cursor-pointer active:bg-gray-200 transition-colors relative"
      >
        {/* 슬라이드 트랙 - 모든 슬라이드를 가로로 배치 */}
        <div
          className={`flex ${isAnimating ? "transition-transform duration-300 ease-in-out" : ""}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesToRender.map((notice, idx) => (
            <div
              key={`${notice.id}-${idx}`}
              onClick={() => handleClick(notice)}
              className="w-full flex-shrink-0 px-4 py-2 flex items-center justify-between"
            >
              {/* 왼쪽 텍스트 영역 */}
              <div className="flex flex-col gap-1 flex-1">
                <div className="text-black text-[15px] min-[375px]:text-[17px] font-bold">{notice.title}</div>
                {notice.buttonText && (
                  <div className="text-orange-500 text-[14px] font-medium flex items-center gap-1">
                    {notice.buttonText}
                    <span className="text-orange-500">&gt;</span>
                  </div>
                )}
              </div>

              {/* 오른쪽 이미지 영역 */}
              <div className="relative flex-shrink-0">
                <div className="w-18 h-20 flex mr-2">
                  <Image
                    src={notice.imageSrc || "/images/img/notice/notice_ banner.png"}
                    alt={notice.imageAlt || "공지사항"}
                    width={80}
                    height={80}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 배지 - 2개 이상일 때만 표시 (슬라이드 밖에 고정) */}
        {notices.length > 1 && (
          <div className="absolute bottom-2 right-3">
            <span
              className="flex items-center justify-center text-[11px] text-white rounded-full bg-gray-400 px-2 py-1 shadow-sm"
              style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              {realIndex + 1} / {notices.length}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
