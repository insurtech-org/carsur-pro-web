"use client";

import Image from "next/image";
import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { openExternalLink } from "@/utils/util";

/** 공지 팝업 아이템 타입 */
export interface NoticePopupItem {
  id: string | number;
  imageSrc: string;
  link: string;
}

/**
 * ============================================
 * 임시 데이터 - 여기서 공지 팝업 데이터를 관리합니다
 * 실제 데이터가 들어오면 이 부분만 교체하면 됩니다
 * ============================================
 */
export const NOTICE_POPUPS: NoticePopupItem[] = [
  {
    id: 1,
    imageSrc: "/images/img/notice/notice_popup_2.png",
    link: "https://insurtech-kr.notion.site/2bd19a2679988005a15dcddc7c7af023",
  },
  {
    id: 2,
    imageSrc: "/images/img/notice/notice_popup_1.png",
    link: "https://insurtech-kr.notion.site/2af19a26799880bd94b2e69fcdfa203a",
  },
];

/**
 * 공지사항 모달 컨텐츠 컴포넌트
 * - 무한 루프 캐러셀 지원
 * - 5초마다 자동 전환
 * - 좌우 스와이프 지원
 * - 배지: 2개 이상일 때만 표시
 */
interface NoticeContentProps {
  onClose: () => void;
  onHideForToday: () => void;
  notices?: NoticePopupItem[];
  autoSlideInterval?: number;
}

export default function NoticeContent({
  onClose,
  onHideForToday,
  notices = NOTICE_POPUPS,
  autoSlideInterval = 3000,
}: NoticeContentProps) {
  const noticesLength = notices?.length || 0;

  // 클론 슬라이드 기법: 2개 이상일 때 앞뒤에 클론 추가
  const extendedNotices = useMemo(() => {
    if (!notices || notices.length <= 1) return notices || [];
    return [notices[notices.length - 1], ...notices, notices[0]];
  }, [notices]);

  // 인덱스: 클론이 있으면 1부터 시작
  const [currentIndex, setCurrentIndex] = useState(noticesLength > 1 ? 1 : 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 실제 인덱스 계산 (배지 표시용)
  const realIndex = useMemo(() => {
    if (noticesLength <= 1) return 0;
    if (currentIndex === 0) return noticesLength - 1;
    if (currentIndex === extendedNotices.length - 1) return 0;
    return currentIndex - 1;
  }, [currentIndex, noticesLength, extendedNotices.length]);

  // 현재 공지 (링크용)
  const currentNotice = useMemo(() => {
    if (noticesLength <= 1) return notices[0];
    return notices[realIndex];
  }, [notices, noticesLength, realIndex]);

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

    if (currentIndex === extendedNotices.length - 1) {
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
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

    if (diff > 50) {
      goNext();
    } else if (diff < -50) {
      goPrev();
    }
  };

  // 상세보기 클릭 시 해당 공지의 링크를 외부 브라우저로 열기
  const handleDetailClick = () => {
    if (currentNotice?.link) {
      openExternalLink(currentNotice.link);
    }
  };

  // 슬라이드 배열 결정
  const slidesToRender = noticesLength > 1 ? extendedNotices : notices;

  return (
    <div className="relative w-full max-w-[433px] rounded-t-2xl overflow-hidden">
      {/* 헤더 - 배지 (2개 이상일 때만 표시) */}
      <div className="absolute top-2 left-0 right-0 z-10 flex justify-end items-center px-[32px] pt-4">
        {notices.length > 1 && (
          <span
            className="flex items-center justify-center text-[11px] text-white rounded-full bg-gray-500 px-2 py-1 shadow-sm"
            style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
          >
            {realIndex + 1} / {notices.length}
          </span>
        )}
      </div>

      {/* 이미지 캐러셀 컨텐츠 */}
      <div
        className="relative w-full aspect-square overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flex ${isAnimating ? "transition-transform duration-300 ease-out" : ""}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesToRender.map((notice, idx) => (
            <div
              key={`${notice.id}-${idx}`}
              className="w-full flex-shrink-0 cursor-pointer"
              onClick={handleDetailClick}
            >
              <Image
                src={notice.imageSrc}
                alt={`공지사항 ${notice.id}`}
                width={375}
                height={375}
                className="w-full h-full object-contain"
                priority={idx <= 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 하단 액션 영역 */}
      <div className="w-full h-[58px] flex justify-between items-center bg-white text-[16px] text-semibold">
        <button onClick={onHideForToday} className="w-[50%] h-full hover:bg-gray-100 transition-colors text-gray-400">
          다시 보지 않기
        </button>
        <button onClick={onClose} className="w-[50%] h-full text-[16px] hover:bg-gray-100 transition-colors text-black">
          닫기
        </button>
      </div>
    </div>
  );
}
