"use client";

import MainButton from "../common/MainButton";

interface ForceUpdateModalProps {
  isOpen: boolean;
  platform?: "ios" | "android";
  onClose?: () => void;
}

const ForceUpdateModal = ({ isOpen, platform, onClose }: ForceUpdateModalProps) => {
  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const handleUpdate = () => {
    // iOS와 Android 앱스토어 링크
    const storeLinks = {
      ios: "https://apps.apple.com/kr/app/%EC%B9%B4%EC%8A%88%EC%96%B4%ED%94%84%EB%A1%9C-%EA%B3%B5%EC%97%85%EC%82%AC/id6751558142",
      android: "https://play.google.com/store/apps/details?id=com.suretech.carsurpromobile",
    };

    const link = platform === "ios" ? storeLinks.ios : storeLinks.android;

    // 앱스토어로 이동
    window.location.href = link;
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center">
      {/* 배경 오버레이 - 불투명 */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* 모달 및 닫기 버튼 컨테이너 */}
      <div className="relative w-full max-w-md transform transition-transform duration-300 ease-out flex flex-col items-center gap-4 pb-8">
        {/* 모달 컨텐츠 - 아래에서 위로 올라오는 애니메이션 */}
        <div className="relative w-full">
          <div className="flex flex-col bg-white rounded-t-2xl">
            {/* 모달 상단 핸들바 */}
            <div className="flex flex-col items-center self-stretch mt-2">
              <div className="bg-[#EDEDED] w-10 h-[5px] rounded-[1000px]"></div>
            </div>

            <div className="flex flex-col items-start self-stretch bg-white rounded-t-2xl p-5">
              <div className="flex flex-col self-stretch bg-white rounded-t-2xl">
                {/* 제목 */}
                <div className="flex items-start self-stretch mb-4">
                  <span className="flex-1 text-[#131211] text-xl font-bold">업데이트 필요</span>
                </div>

                {/* 설명 텍스트 */}
                <div className="flex flex-col gap-1 mb-6">
                  <span className="text-neutral-800 text-base font-regular whitespace-pre-line">
                    {"최신 버전으로 업데이트가 필요합니다.\n더 나은 서비스 이용을 위해 앱을 업데이트해 주세요."}
                  </span>
                </div>

                {/* 버튼 영역 - 업데이트 버튼만 */}
                <div className="flex flex-row bg-white py-4">
                  <MainButton text="업데이트" onClick={handleUpdate} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="flex flex-row justify-center items-center gap-2 text-white cursor-pointer">
          <div className="w-[24px] h-[24px]">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="text-white"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7929 4.79289C18.1834 4.40237 18.8164 4.40237 19.207 4.79289C19.5975 5.18342 19.5975 5.81643 19.207 6.20696L13.414 11.9999L19.207 17.7929C19.5975 18.1834 19.5975 18.8164 19.207 19.207C18.8164 19.5975 18.1834 19.5975 17.7929 19.207L11.9999 13.414L6.20696 19.207C5.81643 19.5975 5.18342 19.5975 4.79289 19.207C4.40237 18.8164 4.40237 18.1834 4.79289 17.7929L10.5859 11.9999L4.79289 6.20696C4.40237 5.81643 4.40237 5.18342 4.79289 4.79289C5.18342 4.40237 5.81643 4.40237 6.20696 4.79289L11.9999 10.5859L17.7929 4.79289Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div>닫기</div>
        </button>
      </div>
    </div>
  );
};

export default ForceUpdateModal;
