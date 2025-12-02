"use client";

import { useNoticeCheck } from "@/hook/useNoticeCheck";
import NoticeContent, { NOTICE_POPUPS, NoticePopupItem } from "./NoticeContent";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

/**
 * 공지사항 팝업 모달
 * - 앱 진입 시 자동으로 표시 여부 체크
 * - 하단에서 올라오는 모달 형태, 다크 테마 디자인
 * - 모달 래퍼와 컨텐츠를 분리하여 확장성 확보
 * - 공지사항 배열 변경 시 자동으로 다시 표시
 * @param notices - 공지사항 배열 (기본값: NOTICE_POPUPS)
 */
interface NoticeModalProps {
  notices?: NoticePopupItem[];
}

export default function NoticeModal({ notices = NOTICE_POPUPS }: NoticeModalProps = {}) {
  // 공지사항 배열을 기반으로 동적으로 noticeId 생성
  // 마지막 공지 ID가 바뀌면 새로운 noticeId가 생성되어 모달이 다시 표시됨
  const noticeId = useMemo(() => {
    if (!notices || notices.length === 0) return "notice-empty";
    const lastNoticeId = notices[notices.length - 1].id;
    return `notice-lastId-${lastNoticeId}`;
  }, [notices]);

  const { isOpen, close, hideForTodayAndClose } = useNoticeCheck(noticeId);

  const pathname = usePathname();

  // login, find-id 페이지에서는 모달 표시하지 않음
  const blockedPaths = ["/login", "/find-id"];
  if (blockedPaths.includes(pathname)) return null;

  // isOpen이 false이면 모달을 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* 어두운 뒷배경 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />
      {/* 모달 컨텐츠 - 아래에서 위로 올라오는 애니메이션 */}
      <div className="relative w-full max-w-[433px] transform transition-transform duration-300 ease-out translate-y-full animate-slide-up">
        <NoticeContent onClose={close} onHideForToday={hideForTodayAndClose} notices={notices} />
      </div>
    </div>
  );
}
