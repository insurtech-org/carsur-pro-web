"use client";

import Image from "next/image";

/**
 * 공지사항 모달 컨텐츠 컴포넌트
 * - 확장 가능한 구조로 컨텐츠 영역만 분리
 * - props를 통해 외부에서 제어 가능
 */
interface NoticeContentProps {
  onClose: () => void;
  onHideForToday: () => void;
}

export default function NoticeContent({ onClose, onHideForToday }: NoticeContentProps) {
  // 상세보기 버튼 클릭 시 외부 링크로 이동
  const handleDetailClick = () => {
    window.open("https://insurtech-kr.notion.site/2af19a26799880bd94b2e69fcdfa203a", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-[433px] rounded-t-2xl overflow-hidden">
      {/* 헤더 - absolute로 이미지 위에 배치 */}
      <div className="absolute top-2 left-0 right-0 z-10 flex justify-end items-center px-[32px] pt-4 ">
        {/* <span
          className="flex items-center justify-center text-[11px] text-white rounded-full bg-gray-500 px-2 py-1 shadow-sm"
          style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
        >
          1 / 1
        </span> */}
      </div>

      {/* 이미지 컨텐츠 - 375x375 사이즈, aspect ratio 유지 */}
      <div className="relative w-full aspect-square group cursor-pointer" onClick={handleDetailClick}>
        <Image
          src="/images/img/notice/notice_popup_1.png"
          alt="공지사항"
          width={375}
          height={375}
          className="w-full h-full object-contain "
          priority
        />

        {/* 상세보기 버튼 클릭 영역 - 이미지 위에 투명한 버튼 */}
        <button
          onClick={handleDetailClick}
          className="absolute bottom-[58px] left-0 right-0 h-11 mx-auto max-w-[calc(100%-32px)]  transition-colors rounded"
          aria-label="상세보기"
        />
      </div>

      {/* 하단 액션 영역 */}
      <div className="w-full h-[58px] flex justify-between items-center bg-white text-[16px] text-semibold">
        <button onClick={onHideForToday} className="w-[50%] h-full hover:bg-gray-100 transition-colors text-gray-400">
          오늘 하루 보지 않기
        </button>
        <button onClick={onClose} className="w-[50%] h-full text-[16px] hover:bg-gray-100 transition-colors text-black">
          닫기
        </button>
      </div>
    </div>
  );
}
