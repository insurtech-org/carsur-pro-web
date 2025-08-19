"use client";

import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import MainButton from "../common/MainButton";
import SubButton from "../common/SubButton";

interface AccountModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: (totalPrice: number) => void;
}

export default function AccountModal({
  title,
  isOpen,
  onClose,
  onClickConfirm,
}: AccountModalProps) {
  const [inputPrice1, setInputPrice1] = useState("");
  const [inputPrice2, setInputPrice2] = useState("");
  const sumPrice = useMemo(() => {
    return Number(inputPrice1) + Number(inputPrice2);
  }, [inputPrice1, inputPrice2]);

  const vatPrice = useMemo(() => {
    return Math.floor(sumPrice * 0.1);
  }, [sumPrice]);

  const totalPrice = useMemo(() => {
    return sumPrice + vatPrice;
  }, [sumPrice, vatPrice]);

  const [isFocused1, setIsFocused1] = useState<boolean>(false);
  const [isFocused2, setIsFocused2] = useState<boolean>(false);
  const [currentFocusedInput, setCurrentFocusedInput] = useState<
    "input1" | "input2" | null
  >(null);

  // 숫자 입력 함수
  const handleNumberInput = (number: string) => {
    if (currentFocusedInput === "input1") {
      setInputPrice1((prev) => {
        // 첫 입력이 0이면 0을 제거하고 새 숫자로 대체
        if (prev === "0" || prev === "00") {
          return number;
        }
        return prev + number;
      });
    } else if (currentFocusedInput === "input2") {
      setInputPrice2((prev) => {
        // 첫 입력이 0이면 0을 제거하고 새 숫자로 대체
        if (prev === "0" || prev === "00") {
          return number;
        }
        return prev + number;
      });
    }
  };

  // 백스페이스 함수
  const handleBackspace = () => {
    if (currentFocusedInput === "input1") {
      setInputPrice1((prev) => prev.slice(0, -1));
    } else if (currentFocusedInput === "input2") {
      setInputPrice2((prev) => prev.slice(0, -1));
    }
  };

  // input 포커스 함수
  const handleInputFocus = (inputType: "input1" | "input2") => {
    setCurrentFocusedInput(inputType);
    if (inputType === "input1") {
      setIsFocused1(true);
      setIsFocused2(false);
    } else {
      setIsFocused1(false);
      setIsFocused2(true);
    }
  };

  const onClickClose = () => {
    setInputPrice1("");
    setInputPrice2("");

    setIsFocused1(false);
    setIsFocused2(false);
    setCurrentFocusedInput(null);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

        <div className="relative w-full max-w-md max-h-[80vh] transform transition-transform duration-300 ease-out translate-y-full animate-slide-up px-2 bg-bg-normal rounded-t-2xl overflow-hidden">
          <div className="w-full left-0 inline-flex flex-col justify-start items-center px-4 max-h-[80vh] overflow-y-auto">
            {/* 헤더 섹션 */}
            <div className="w-full flex flex-col justify-start items-center sticky top-0 bg-bg-normal">
              {/* 핸들바 */}
              <div className="self-stretch h-3 flex flex-col justify-end items-center">
                <div className="w-10 h-[5px] bg-neutral-200 rounded-full" />
              </div>

              {/* 헤더 */}
              <div className="self-stretch py-4 inline-flex justify-center items-start">
                <div className="flex-1 flex justify-between items-start">
                  <div className="flex-1 justify-center text-neutral-800 text-[17px] font-semibold">
                    {title}
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

            {/* 청구 금액 입력 섹션 */}
            <div className="self-stretch px-1 flex flex-col justify-start items-end gap-4">
              <div className="self-stretch flex flex-col justify-start items-start gap-2">
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-center text-primary-alternative text-sm font-semibold">
                    공임비
                  </div>
                  <div
                    className={`self-stretch h-12 px-4 py-3 bg-bg-normal rounded-lg outline outline-1 inline-flex justify-start items-center gap-3 ${
                      isFocused1
                        ? "outline-primary-normal"
                        : "outline-line-normal"
                    }`}
                  >
                    <input
                      className="flex-1 justify-center text-primary-normal text-base font-regular outline-none"
                      value={inputPrice1.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={(event) => {
                        const value = event.target.value.replace(/,/g, "");
                        setInputPrice1(value);
                      }}
                      placeholder="공임비를 입력해 주세요"
                      onFocus={() => handleInputFocus("input1")}
                      readOnly
                    />

                    <div className="text-right justify-center text-primary-normal text-base font-medium">
                      원
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col justify-start items-start gap-2">
                  <div className="self-stretch justify-center text-primary-alternative text-sm font-semibold">
                    부품비
                  </div>
                  <div
                    className={`self-stretch h-12 px-4 py-3 bg-bg-normal rounded-lg outline outline-1 inline-flex justify-start items-center gap-3 ${
                      isFocused2
                        ? "outline-primary-normal"
                        : "outline-line-normal"
                    }`}
                  >
                    <input
                      className="flex-1 justify-center text-primary-normal text-base font-regular outline-none"
                      value={inputPrice2.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={(event) => {
                        const value = event.target.value.replace(/,/g, "");
                        setInputPrice2(value);
                      }}
                      placeholder="부품비를 입력해 주세요"
                      onFocus={() => handleInputFocus("input2")}
                      readOnly
                    />

                    <div className="text-right justify-center text-primary-normal text-base font-medium">
                      원
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-start items-end gap-2">
                <div className="flex flex-col justify-start items-end">
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="justify-center text-neutral-500 text-sm font-regular">
                      총 수리비
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="justify-center text-neutral-500 text-sm font-regular">
                        {sumPrice.toLocaleString()}
                      </div>
                      <div className="text-right justify-center text-neutral-500 text-sm font-regular">
                        원
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex justify-start items-center gap-2">
                    <div className="justify-center text-neutral-500 text-sm font-regular">
                      VAT
                    </div>
                    <div className="flex justify-start items-center gap-1">
                      <div className="justify-center text-neutral-500 text-sm font-regular">
                        {vatPrice.toLocaleString()}
                      </div>
                      <div className="text-right justify-center text-neutral-500 text-sm font-regular">
                        원
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-4">
                  <div className="justify-center text-primary-normal text-sm font-semibold">
                    총 수리비(VAT포함)
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <div className="justify-center text-primary-strong text-base font-semibold">
                      {totalPrice.toLocaleString()}
                    </div>
                    <div className="text-right justify-center text-primary-neutral text-base font-medium">
                      원
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 청구 금액 입력 섹션 */}
            <div className="self-stretch h-56 px-2 inline-flex flex-col justify-start items-start my-2">
              <div className="self-stretch flex-1 inline-flex justify-start items-center">
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("1")}
                >
                  <div className="w-2.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    1
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("2")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    2
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("3")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    3
                  </div>
                </button>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center">
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("4")}
                >
                  <div className="w-4 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    4
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("5")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    5
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("6")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    6
                  </div>
                </button>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center">
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("7")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    7
                  </div>
                </button>
                <div
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("8")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    8
                  </div>
                </div>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("9")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    9
                  </div>
                </button>
              </div>
              <div className="self-stretch flex-1 inline-flex justify-start items-center">
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("00")}
                >
                  <div className="w-7 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    00
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={() => handleNumberInput("0")}
                >
                  <div className="w-3.5 self-stretch text-center justify-center text-primary-normal text-2xl font-medium leading-loose">
                    0
                  </div>
                </button>
                <button
                  className="flex-1 self-stretch px-2 rounded-lg flex justify-center items-center hover:bg-neutral-50"
                  onClick={handleBackspace}
                >
                  <div className="w-7 h-7 relative overflow-hidden">
                    <img src={"/images/icon/ic_backspace.svg"} />
                  </div>
                </button>
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="py-4 sticky bottom-0 bg-bg-normal w-full">
              <div className="flex justify-center gap-2">
                <SubButton text="취소" onClick={onClickClose} />
                <MainButton
                  text="청구하기"
                  onClick={() => onClickConfirm(totalPrice)}
                  disabled={totalPrice === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
