"use client";

import { useNoticeCheck } from "@/hook/useNoticeCheck";
import NoticeContent from "./NoticeContent";
import { usePathname } from "next/navigation";

/**
 * 공지사항 팝업 모달
 * - 앱 진입 시 자동으로 표시 여부 체크
 * - 하단에서 올라오는 모달 형태, 다크 테마 디자인
 * - 모달 래퍼와 컨텐츠를 분리하여 확장성 확보
 * @param noticeId - 공지사항 식별자 (기본값: 캐시 제도 공지사항)
 */
interface NoticeModalProps {
  noticeId?: string;
}

export default function NoticeModal({ noticeId = "notice-2025-11-18" }: NoticeModalProps = {}) {
  const { isOpen, close, hideForTodayAndClose } = useNoticeCheck(noticeId);

  const pathname = usePathname();

  // login, find-id 페이지에서는 모달 표시하지 않음
  const blockedPaths = ["/login", "/find-id"];
  if (blockedPaths.includes(pathname)) return null;

  // 상세보기 버튼 클릭 시 상세 페이지로 이동
  const handleDetailClick = () => {
    router.push(`/notice/${noticeId}`);
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* 어두운 뒷배경 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />
      {/* 모달 컨텐츠 - 아래에서 위로 올라오는 애니메이션 */}
      <div className="relative w-full max-w-[433px] transform transition-transform duration-300 ease-out translate-y-full animate-slide-up">
        <NoticeContent onClose={close} onHideForToday={hideForTodayAndClose} noticeId={noticeId} />
      </div>
    </div>
  );
}
