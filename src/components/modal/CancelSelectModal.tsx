"use client";

import { useEffect, useState } from "react";
import MainButton from "../common/MainButton";
import SubButton from "../common/SubButton";

/**
 * abandonReason: 포기 사유
 * etcReason: 기타 사유
 * selectedValue: 사유 번호
 */
interface CancelSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: (abandonReason: string, etcReason: string, selectedValue: string) => void;
}

const CancelSelectModal = ({
  isOpen = false,
  onClose = () => {},
  onClickConfirm = () => {},
}: CancelSelectModalProps) => {
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

  const cancelReasons = {
    "1": "다른 공업사로 수리 예약",
    "2": "미수선처리",
    "3": "고객변심",
    "4": "입고 일자를 맞추지 못함",
    "5": "기타 사유",
  };

  const [selectedValue, setSelectedValue] = useState("1");

  const [abandonReason, setAbandonReason] = useState(cancelReasons["1"]);
  const [etcReason, setEtcReason] = useState("");

  const [isEtcReasonNull, setIsEtcReasonNull] = useState(false);

  //기타 사유 입력 시 isEtcReasonNull 상태 변경
  useEffect(() => {
    if (etcReason.length > 0) {
      setIsEtcReasonNull(false);
    } else {
      setIsEtcReasonNull(true);
    }
  }, [etcReason]);

  const onChangeChecked = (value: string) => {
    setIsEtcReasonNull(false);
    setEtcReason("");

    setSelectedValue(value);
    setAbandonReason(cancelReasons[value as keyof typeof cancelReasons]);
  };

  const onClickClose = () => {
    setSelectedValue("1");
    setEtcReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

        <div className="relative w-full max-w-md transform transition-transform duration-300 ease-out translate-y-full animate-slide-up">
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
                        입고 확정 포기 사유를 알려주세요.
                      </div>
                    </div>

                    <button className="w-6 h-6 relative overflow-hidden" onClick={onClickClose}>
                      <img src={"/images/icon/ic_x-line.svg"} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="self-stretch px-5 flex flex-col justify-start items-start ">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="self-stretch flex flex-col justify-start items-start gap-4">
                    <div className="justify-start text-primary-alternative text-sm font-medium">고객에 의한 사유</div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-1"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="1"
                        checked={selectedValue === "1"}
                        onChange={event => onChangeChecked(event.target.value)}
                      />
                      <label
                        htmlFor="cancel-select-1"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        {cancelReasons["1"]}
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
                        onChange={event => onChangeChecked(event.target.value)}
                      />
                      <label
                        htmlFor="cancel-select-2"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        {cancelReasons["2"]}
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
                        onChange={event => onChangeChecked(event.target.value)}
                      />
                      <label
                        htmlFor="cancel-select-3"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        {cancelReasons["3"]}
                      </label>
                    </div>
                    <div className="justify-start text-primary-alternative text-sm font-medium">
                      공업사 사정에 의한 사유
                    </div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-4"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="4"
                        checked={selectedValue === "4"}
                        onChange={event => onChangeChecked(event.target.value)}
                      />
                      <label
                        htmlFor="cancel-select-4"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        {cancelReasons["4"]}
                      </label>
                    </div>

                    <div className="justify-start text-primary-alternative text-sm font-medium">기타 사유</div>
                    <div className="inline-flex justify-start items-center gap-2">
                      <input
                        id="cancel-select-5"
                        type="radio"
                        name="cancel-select"
                        className="customRadio"
                        value="5"
                        checked={selectedValue === "5"}
                        onChange={event => onChangeChecked(event.target.value)}
                      />
                      <label
                        htmlFor="cancel-select-5"
                        className="justify-start text-primary-normal text-base font-regular"
                      >
                        {cancelReasons["5"]}
                      </label>
                    </div>

                    {selectedValue === "5" && (
                      <div className="flex flex-col items-end self-stretch gap-2">
                        <textarea
                          className={`w-full h-20 border rounded-lg p-3 text-primary-normal text-base font-regular resize-none border-line-normal ${
                            isEtcReasonNull ? "border-status-destructive" : "border-line-normal"
                          }`}
                          id="cancel-select-5"
                          name="cancel-select"
                          value={etcReason}
                          onChange={event => setEtcReason(event.target.value)}
                          placeholder="상세 사유를 입력해 주세요."
                          maxLength={100}
                        />

                        <div
                          className={`flex flex-row self-stretch ${
                            isEtcReasonNull ? "justify-between" : "justify-end"
                          }`}
                        >
                          {isEtcReasonNull && (
                            <span className="text-status-destructive text-xs font-regular">
                              상세 사유를 입력해 주세요
                            </span>
                          )}
                          <span className="text-primary-alternative text-xs font-regular">{etcReason.length}/100</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="self-stretch bg-bg-normal flex flex-col justify-start items-start">
                <div className="self-stretch px-5 pb-8 pt-4 flex flex-col justify-start items-start">
                  <div className="self-stretch inline-flex justify-start items-start gap-2">
                    <SubButton text="닫기" onClick={onClickClose} />

                    <MainButton
                      text="입고 확정 포기하기"
                      onClick={() => {
                        if (selectedValue === "5" && etcReason.trim() === "") {
                          setIsEtcReasonNull(true);
                        } else {
                          setIsEtcReasonNull(false);
                          onClickConfirm(abandonReason, etcReason, selectedValue);
                        }
                      }}
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
