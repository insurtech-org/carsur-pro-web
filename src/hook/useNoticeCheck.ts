"use client";

import { useEffect, useState, useRef } from "react";

/**
 * 공지사항 체크 및 모달 관리 훅
 * - 앱 진입 시 공지사항 표시 여부 자동 체크
 * - 모달 열림/닫힘 상태 관리
 * - body 스크롤 제어
 * - 다시 보지 않기 기능 제공 (localStorage에 날짜 저장)
 * @param noticeId - 공지사항 식별자 (기본값: notice-2025-11-18)
 */

// 공지사항별 스토리지 키 생성
const getStorageKey = (noticeId: string) => `notice_dismissed_${noticeId}`;

// 오늘 날짜 문자열 반환 (YYYY-MM-DD 형식)
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

// localStorage에서 날짜 읽기
const getDismissedDate = (noticeId: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(getStorageKey(noticeId));
};

// 다시 보지 않기 설정 (localStorage에 오늘 날짜 저장)
const setNoticeDismissed = (noticeId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(noticeId), getTodayDateString());
};

// 공지사항을 보여줘야 하는지 확인 (날짜가 있으면 숨김, 없으면 표시)
const shouldShowNotice = (noticeId: string): boolean => {
  const dismissedDate = getDismissedDate(noticeId);
  return dismissedDate === null; // 날짜가 없으면 표시
};

export const useNoticeCheck = (noticeId: string = "notice-2025-11-18") => {
  const [isOpen, setIsOpen] = useState(false);
  const isDismissedRef = useRef(false); // 세션 동안 닫힘 상태 관리

  // 앱 진입 시 한 번만 체크 (마운트 시)
  useEffect(() => {
    // 세션 동안 닫힌 상태가 아니고, localStorage에 날짜가 없으면 표시
    if (!isDismissedRef.current && shouldShowNotice(noticeId)) {
      setIsOpen(true);
    }
  }, [noticeId]);

  // 모달이 열릴 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 body 스크롤 복구
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트될 때 스크롤 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 팝업 닫기 - ref로 세션 동안 다시 표시하지 않음
  const close = () => {
    isDismissedRef.current = true;
    setIsOpen(false);
  };

  // 다시 보지 않기 설정하고 닫기 (localStorage에 영구 저장)
  const hideForTodayAndClose = () => {
    setNoticeDismissed(noticeId);
    setIsOpen(false);
  };

  return {
    isOpen,
    close,
    hideForTodayAndClose,
  };
};
