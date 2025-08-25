"use client";

import { useModalStore } from "@/store/modal";
import SubButton from "../common/SubButton";
import MainButton from "../common/MainButton";

const CommonModal = () => {
  const { isOpen, config, hideModal } = useModalStore();

  // 모달이 열려있지 않거나 설정이 없으면 렌더링하지 않음
  if (!isOpen || !config) return null;

  const {
    title,
    description = "",
    type = "confirm", // 기본값은 confirm, alert일 수도 있음
    cancelButtonText = "닫기",
    confirmButtonText = "확인",
    onConfirm,
    onCancel,
  } = config;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    hideModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    hideModal();
  };

  const handleClose = () => {
    hideModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* 검은색 배경 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      {/* 모달 컨텐츠 - 아래에서 위로 올라오는 애니메이션 */}
      <div className="relative w-full max-w-md transform transition-transform duration-300 ease-out translate-y-full animate-slide-up">
        <div className="flex flex-col bg-white rounded-t-2xl">
          {/* 모달 상단 핸들바 */}
          <div className="flex flex-col items-center self-stretch mt-2">
            <div className="bg-[#EDEDED] w-10 h-[5px] rounded-[1000px]"></div>
          </div>

          <div className="flex flex-col items-start self-stretch bg-white rounded-t-2xl p-5">
            <div className="flex flex-col self-stretch bg-white rounded-t-2xl">
              {/* 제목과 아이콘 */}
              <div className="flex items-start self-stretch mb-4">
                <span className="flex-1 text-[#131211] text-xl font-bold whitespace-pre-line">
                  {title}
                </span>

                <button onClick={handleClose}>
                  <img src={"/images/icon/ic_x-line.svg"} />
                </button>
              </div>

              {/* 설명 텍스트 */}
              <div
                className={`flex flex-col gap-1 ${
                  description ? "mb-6" : "mb-0"
                } `}
              >
                <span className="text-neutral-800 text-base font-regular whitespace-pre-line">
                  {description}
                </span>
              </div>

              {/* 버튼 영역 - alert 타입일 때는 확인 버튼만 표시 */}
              <div className="flex flex-row bg-white py-4 gap-2">
                {type === "confirm" && (
                  <SubButton text={cancelButtonText} onClick={handleCancel} />
                )}

                <MainButton text={confirmButtonText} onClick={handleConfirm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
