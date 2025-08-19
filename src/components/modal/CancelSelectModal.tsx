"use client";

import { useState } from "react";
import MainButton from "../common/MainButton";
import SubButton from "../common/SubButton";

interface CancelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: () => void;
}

const CancelSelectModal = ({
  isOpen = false,
  onClose = () => {},
  onClickConfirm = () => {},
}: CancelSelectModalProps) => {
  if (!isOpen) return null;

  const [selectedValue, setSelectedValue] = useState("1");

  const onChangeChecked = (value: string) => {
    setSelectedValue(value);
  };

  const onClickClose = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

        <div className="relative w-full max-w-md transform transition-transform duration-300 ease-out translate-y-full animate-slide-up px-2">
          <div className="w-full inline-flex justify-start items-end">
            <div className="flex-1 bg-bg-normal rounded-tl-2xl rounded-tr-2xl inline-flex flex-col justify-start items-end">
              <div className="self-stretch flex flex-col justify-start items-start">
                {/* 핸들바 */}
                <div className="self-stretch h-3 flex flex-col justify-end items-center">
                  <div className="w-10 h-[5px] bg-neutral-200 rounded-full" />
                </div>

                {/* 헤더 */}
                <div className="self-stretch p-5 inline-flex justify-center items-start">
                  <div className="flex-1 flex justify-between items-start">
                    <div className="flex-1 flex justify-start items-start">
                      <div className="flex-1 justify-center text-neutral-800 text-[17px] font-semibold">
                        입고 확정 취소 사유를 알려주세요.
                      </div>
                    </div>

                    <button
                      className="w-6 h-6 relative overflow-hidden"
                      onClick={onClickClose}
                    >
                      <img src={"/images/icon/ic_x-line.svg"} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="self-stretch px-5 flex flex-col justify-start items-start ">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="justify-start text-primary-alternative text-sm font-medium">
                      고객에 의한 취소
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-1"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="1"
                        checked={selectedValue === "1"}
                        onChange={(event) =>
                          onChangeChecked(event.target.value)
                        }
                      />
                      <label
                        htmlFor="cancel-select-1"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        다른 공업사로 수리 예약
                      </label>
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-2"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="2"
                        checked={selectedValue === "2"}
                        onChange={(event) =>
                          onChangeChecked(event.target.value)
                        }
                      />
                      <label
                        htmlFor="cancel-select-2"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        미수선처리
                      </label>
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-3"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="3"
                        checked={selectedValue === "3"}
                        onChange={(event) =>
                          onChangeChecked(event.target.value)
                        }
                      />
                      <label
                        htmlFor="cancel-select-3"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        고객변심
                      </label>
                    </div>
                    <div className="justify-start text-primary-alternative text-sm font-medium">
                      공업사 사정에 의한 취소
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-4"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="4"
                        checked={selectedValue === "4"}
                        onChange={(event) =>
                          onChangeChecked(event.target.value)
                        }
                      />
                      <label
                        htmlFor="cancel-select-4"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        입고 일자를 맞추지 못함
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch bg-bg-normal flex flex-col justify-start items-start">
                <div className="self-stretch px-5 pb-8 pt-4 flex flex-col justify-start items-start">
                  <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <SubButton text="닫기" onClick={onClickClose} />

                    <MainButton
                      text="입고 확정 취소하기"
                      onClick={onClickConfirm}
                      disabled={!selectedValue}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelSelectModal;
