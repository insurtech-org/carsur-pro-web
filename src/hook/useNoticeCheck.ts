"use client";

import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";

/**
 * 공지사항 체크 및 모달 관리 훅
 * - 앱 진입 시 공지사항 표시 여부 자동 체크
 * - 모달 열림/닫힘 상태 관리
 * - body 스크롤 제어
 * - 오늘 하루 숨기기 기능 제공
 * - localStorage를 사용하여 "오늘 하루 보지 않기" 상태 저장
 * @param noticeId - 공지사항 식별자 (기본값: 캐시 제도 공지사항)
 */

// 오늘 자정 시간 계산 (ISO 문자열로 반환)
const getTodayMidnightISO = () => {
  return dayjs().add(1, "day").startOf("day").toISOString();
};

// 공지사항별 스토리지 키 생성
const getStorageKey = (noticeId: string) => `notice_hideUntil_${noticeId}`;

// localStorage에서 숨김 기한 읽기
const getNoticeHideUntil = (noticeId: string) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(getStorageKey(noticeId));
};

// 세션 동안 닫힘 상태는 ref로 관리 (페이지 새로고침 시 초기화)

// 오늘 하루 숨기기 설정 (오늘 자정까지 localStorage에 저장)
const setNoticeHideForToday = (noticeId: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(noticeId), getTodayMidnightISO());
};

// 공지사항을 보여줘야 하는지 확인
// - 저장된 값이 없으면 보여줌 (최초 진입)
// - 저장된 기한이 지났으면 다시 보여줌
const shouldShowNotice = (noticeId: string) => {
  const raw = getNoticeHideUntil(noticeId);
  if (!raw) return true;
  return dayjs().isAfter(dayjs(raw));
};

export const useNoticeCheck = (noticeId: string = "cash-2025-11") => {
  const [isOpen, setIsOpen] = useState(false);
  const isDismissedRef = useRef(false); // 세션 동안 닫힘 상태 관리

  // 앱 진입 시 한 번만 체크 (마운트 시)
  useEffect(() => {
    // ref로 관리되는 닫힘 상태가 아니고, 숨김 기한이 지났으면 표시
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

  // 오늘 하루 숨기고 닫기
  const hideForTodayAndClose = () => {
    setNoticeHideForToday(noticeId);
    setIsOpen(false);
  };

  return {
    isOpen,
    close,
    hideForTodayAndClose,
  };
};
