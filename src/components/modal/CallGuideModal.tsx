"use client";

import { useEffect } from "react";
import MainButton from "../common/MainButton";
import SubButton from "../common/SubButton";

interface CallGuideModalProps {
  title: string;
  isOpen: boolean;
  insuranceCompanyName: string;
  onClose: () => void;
  onClickConfirm: () => void;
}

export default function CallGuideModal({
  title,
  isOpen,
  insuranceCompanyName,
  onClose,
  onClickConfirm,
}: CallGuideModalProps) {
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

  const onClickClose = () => {
    //값 모두 초기화
    onClose();
  };

  // 조건부 렌더링을 return 문에서 처리
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

        <div className="relative w-full max-w-md max-h-[88vh] transform transition-transform duration-300 ease-out translate-y-full animate-slide-up px-2 bg-bg-normal rounded-t-2xl overflow-hidden">
          <div className="w-full left-0 inline-flex flex-col justify-start items-center px-4 max-h-[88vh] overflow-y-auto">
            {/* 헤더 섹션 */}
            <div className="w-full flex flex-col justify-start items-center sticky top-0 bg-bg-normal">
              {/* 핸들바 */}
              <div className="self-stretch h-3 flex flex-col justify-end items-center">
                <div className="w-10 h-[5px] bg-neutral-200 rounded-full" />
              </div>

              {/* 헤더 */}
              <div className="self-stretch py-4 inline-flex justify-center items-start">
                <div className="flex-1 flex justify-between items-start">
                  <div className="flex-1 justify-center text-neutral-800 text-[17px] font-semibold">{title}</div>

                  <button className="w-6 h-6 relative overflow-hidden" onClick={onClickClose}>
                    <img src={"/images/icon/ic_x-line.svg"} />
                  </button>
                </div>
              </div>
            </div>

            {/* 안내 섹션 */}
            <div className="self-stretch px-4 py-2 bg-bg-alternative rounded-lg justify-center items-center">
              <div className="flex-1 justify-start text-secondary-normal text-base font-medium">
                안녕하세요 고객님, <span className="font-bold">{insuranceCompanyName}</span> 우수협력업체 OO공업사
                입니다. 접수하신 차량 수리 건이 저희 공업사로 배정되어 연락드렸습니다.
                <br />
                차량은 고객님이 원하시는 장소에서 저희가 직접 픽업해 공업사로 옮겨드립니다. 편하신 장소와 시간 말씀해
                주세요.
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="pb-8 pt-4 sticky bottom-0 bg-bg-normal w-full">
              <div className="flex justify-center gap-2">
                <SubButton text="닫기" onClick={onClickClose} />

                <MainButton text="통화하기" onClick={onClickConfirm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
