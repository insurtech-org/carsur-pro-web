"use client";

import { useState, useEffect } from "react";
import SubButton from "../common/SubButton";
import MainButton from "../common/MainButton";
import { useProposeModalStore } from "@/store/proposeModal";

const ProposeModal = () => {
  const { isOpen, onConfirm, hideProposeModal, isAxa, additionalRequest } = useProposeModalStore();
  const [isChecked, setIsChecked] = useState(false);

  const onChangeChecked = (value: boolean) => {
    setIsChecked(value);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsChecked(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onClickClose = () => {
    setIsChecked(false);
    hideProposeModal();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

      <div className="relative w-full max-w-md transform transition-transform duration-300 ease-out translate-y-full animate-slide-up">
        <div className="flex flex-col bg-white rounded-t-2xl">
          <div className="flex flex-col items-center self-stretch mt-2">
            <div className="bg-[#EDEDED] w-10 h-[5px] rounded-[1000px]"></div>
          </div>

          <div className="flex flex-col items-start self-stretch bg-white rounded-t-2xl p-5">
            <div className="flex flex-col self-stretch bg-white rounded-t-2xl">
              <div className="flex items-start self-stretch mb-4">
                <span className="flex-1 text-[#131211] text-xl font-bold whitespace-pre-line">
                  {"제안 전 아래 내용을\n확인 후 제안해 주세요."}
                </span>

                <button onClick={onClickClose}>
                  <img src={"/images/icon/ic_x-line.svg"} alt="close" />
                </button>
              </div>

              <div className="w-full rounded-lg border border-line-neutral mb-6">
                {isAxa ? (
                  <>
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-neutral-900 text-[16px] font-semibold">
                          AXA DRP 계약 상 공임단가 적용
                        </span>
                        <span className="inline-flex items-center px-1.5 py-0.5 bg-[#FFF4ED] rounded">
                          <span className="text-[#FF6B00] text-xs font-medium">VAT별도</span>
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-neutral-100 h-[1px]"></div>

                    <div className="px-4 py-3">
                      <div className="text-neutral-900 text-[16px] font-semibold leading-5 tracking-tight mb-2">
                        추가 요청사항
                      </div>
                      <div
                        className={`self-stretch text-[15px] leading-5 tracking-tight whitespace-pre-wrap break-words ${
                          additionalRequest?.trim()
                            ? "text-primary-normal"
                            : "text-primary-assistive"
                        }`}
                      >
                        {additionalRequest?.trim() || "요청사항이 없습니다."}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-900 text-[16px] font-semibold">
                            카슈어 프로 공임단가 적용
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.5 bg-[#FFF4ED] rounded">
                            <span className="text-[#FF6B00] text-xs font-medium">VAT별도</span>
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-700 text-[15px]">국산차</span>
                            <span className="text-neutral-800 text-[15px] font-semibold">30,000원</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-neutral-700 text-[15px]">수입차</span>
                            <span className="text-neutral-800 text-[15px] font-semibold">35,000원</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-neutral-100 h-[1px]"></div>

                    <div className="px-4 py-3">
                      <div className="text-neutral-900 text-[16px] font-semibold leading-5 tracking-tight mb-2">
                        추가 요청사항
                      </div>
                      <div
                        className={`self-stretch text-[15px] leading-5 tracking-tight whitespace-pre-wrap break-words ${
                          additionalRequest?.trim()
                            ? "text-primary-normal"
                            : "text-primary-assistive"
                        }`}
                      >
                        {additionalRequest?.trim() || "요청사항이 없습니다."}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div
                className="flex items-center self-stretch bg-neutral-100 py-4 px-3 gap-2 rounded-lg mb-5 cursor-pointer"
                onClick={() => onChangeChecked(!isChecked)}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={event => onChangeChecked(event.target.checked)}
                  className="sr-only"
                />

                <div className="w-6 h-6 relative">
                  <div
                    className={`w-6 h-6 left-0 top-0 absolute rounded ${
                      isChecked ? "bg-primary-normal" : "bg-neutral-300"
                    }`}
                  />
                  <div className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={"/images/icon/ic_check-line.svg"} alt="check" />
                  </div>
                </div>

                <span className="text-[#131211] text-base font-bold">내용을 확인했습니다</span>
              </div>

              <div className="flex flex-row bg-white pb-8 pt-4 gap-2">
                <SubButton text="닫기" onClick={onClickClose} />

                <MainButton
                  text="제안하기"
                  onClick={() => {
                    if (onConfirm) {
                      onConfirm();
                    }
                  }}
                  disabled={!isChecked}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposeModal;
