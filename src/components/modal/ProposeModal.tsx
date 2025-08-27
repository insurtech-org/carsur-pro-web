"use client";

import { useState } from "react";
import SubButton from "../common/SubButton";
import MainButton from "../common/MainButton";

interface ProposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickPropose: () => void;
}

const ProposeModal = ({ isOpen = false, onClose = () => {}, onClickPropose = () => {} }: ProposeModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChangeChecked = (value: boolean) => {
    setIsChecked(value);
  };

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  const onClickClose = () => {
    setIsChecked(false);
    onClose();
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
                  {"제안 전 아래 내용을\n확인 후 제안해 주세요."}
                </span>

                <button onClick={onClickClose}>
                  <img src={"/images/icon/ic_x-line.svg"} />
                </button>
              </div>

              {/* 설명 텍스트 */}
              <div className="flex flex-col gap-1 mb-6">
                <span className="text-neutral-800 text-[15px] font-regular whitespace-pre-line">공임단가 적용기준</span>
                <span
                  className="text-neutral-800 text-[15px] font-medium whitespace-pre-line"
                  style={{
                    textIndent: "-1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  {`• 요청 보험사와 직접 공임 계약(DRP)이 있는 경우:\n → 해당 보험사 공임 단가 적용`}
                </span>
                <span
                  className="text-neutral-800 text-[15px] font-medium whitespace-pre-line"
                  style={{
                    textIndent: "-1rem",
                    paddingLeft: "1rem",
                  }}
                >
                  {`• DRP 계약이 없는 경우: \n → 카슈어 프로 공임단가 적용  \n(국산차: 30,000원 / 수입차: 35,000원, VAT 별도)`}
                </span>
              </div>

              {/* 확인 체크박스 */}

              <div className="flex items-center self-stretch bg-neutral-100 py-4 px-3 gap-2 rounded-lg mb-5">
                {/* 기본 체크박스는 숨김 처리 */}
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={event => onChangeChecked(event.target.checked)}
                  className="sr-only" // 스크린 리더용으로만 보이도록 숨김
                />

                {/* 커스텀 체크박스 디자인 */}
                <div className="w-6 h-6 relative cursor-pointer" onClick={() => onChangeChecked(!isChecked)}>
                  <div
                    className={`w-6 h-6 left-0 top-0 absolute rounded ${
                      isChecked ? "bg-primary-normal" : "bg-neutral-300"
                    }`}
                  />
                  {isChecked ? (
                    <>
                      <div className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={"/images/icon/ic_check-line.svg"} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={"/images/icon/ic_check-line.svg"} />
                      </div>
                    </>
                  )}
                </div>

                {/* 체크박스 라벨 텍스트 */}
                <span className="text-[#131211] text-base font-bold">내용을 확인했습니다</span>
              </div>

              {/* 버튼 영역 */}
              <div className="flex flex-row bg-white pb-8 pt-4 gap-2">
                <SubButton text="닫기" onClick={onClickClose} disabled={!isChecked} />

                <MainButton text="제안하기" onClick={onClickPropose} disabled={!isChecked} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposeModal;
