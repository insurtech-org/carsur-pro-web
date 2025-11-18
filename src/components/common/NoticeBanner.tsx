"use client";

import Image from "next/image";

interface NoticeBannerProps {
  title: string;
  buttonText?: string;
  imageSrc?: string;
  imageAlt?: string;
  badgeText?: string;
}

/**
 * 공지사항 배너 컴포넌트
 * - 재사용 가능한 공지사항 배너 UI
 * - 이미지, 제목, 버튼, 배지 지원
 */
export default function NoticeBanner({
  title,
  buttonText = "확인하기",
  imageSrc = "/images/img/notice/notice_ banner.png",
  imageAlt = "공지사항",
  badgeText = "1 / 1",
}: NoticeBannerProps) {
  const handleButtonClick = () => {
    window.open("https://insurtech-kr.notion.site/2af19a26799880bd94b2e69fcdfa203a", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full px-5 py-2">
      <div className="w-full px-4 py-2 bg-gray-100 rounded-lg flex items-center justify-between">
        {/* 왼쪽 텍스트 영역 */}
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-black text-[17px] font-bold">{title}</div>
          {buttonText && (
            <button
              onClick={handleButtonClick}
              className="text-orange-500 text-[14px] font-medium flex items-center gap-1 hover:text-orange-600 transition-colors"
            >
              {buttonText}
              <span className="text-orange-500">&gt;</span>
            </button>
          )}
        </div>

        {/* 오른쪽 이미지 영역 */}
        <div className="relative flex-shrink-0">
          {/* 메가폰 이미지 */}
          <div className="w-18 h-18 flex items-center justify-center mr-8">
            <Image src={imageSrc} alt={imageAlt} width={75} height={75} />
          </div>

          {/* 배지 */}
          {badgeText && (
            <div className="absolute -bottom-1 -right-1">
              <span
                className="flex items-center justify-center text-[11px] text-white rounded-full bg-gray-400 px-2 py-1 shadow-sm mb-2"
                style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)" }}
              >
                {badgeText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
