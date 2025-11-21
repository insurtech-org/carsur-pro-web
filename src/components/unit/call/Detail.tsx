"use client";

import { deletePropose, getCallDetail, postPropose } from "@/api/call.api";
import { useModalStore } from "@/store/modal";
import { useProposeModalStore } from "@/store/proposeModal";
import { useToastStore } from "@/store/toast";
import { ICallDetail } from "@/type/call.type";
import { formatDate } from "@/utils/util";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DetailInfoRow from "../work/elements/DetailInfoRow";
import { COVERAGE_TYPE } from "@/utils/enum";

export default function Detail({ id, hash }: { id: number; hash: string }) {
  const router = useRouter();

  const { showSuccess, showWarning, showError } = useToastStore();
  const { showModal } = useModalStore();
  const { showProposeModal, hideProposeModal } = useProposeModalStore();

  const isProposal = hash.includes("proposal");

  const [detailData, setDetailData] = useState<ICallDetail | null>(null);
  const isAxa = useMemo(() => {
    return detailData?.insuranceCompanyName?.toLowerCase() === "axa";
  }, [detailData]);

  const requestText = (detailData?.customerAddReq || detailData?.insuranceAddReq || "").trim();
  const hasRequest = Boolean(requestText.length > 0);

  useEffect(() => {
    fetchCallDetail();
  }, []);

  const fetchCallDetail = async () => {
    try {
      const res = await getCallDetail(Number(id));
      setDetailData(res);
    } catch (error) {
      console.log(error);
      if (isProposal) {
        showWarning("이미 입고확정 또는 취소된 건이에요.", "현재 상태는 제안내역에서 확인할 수 있어요.");
        router.push("/call#proposal");
      } else {
        showModal({
          type: "alert",
          title: "이미 다른 업체로 확정되었어요",
          description: "해당 콜은 이미 마감되어 제안할 수 없어요.",
          cancelButtonText: "확인",
          onConfirm: () => {
            router.push("/call#mycall");
          },
          isSolidBg: true,
        });

        router.push("/call#mycall");
      }
    }
  };

  const handlePropose = () => {
    showProposeModal(
      id,
      async () => {
        try {
          await postPropose(id);
          showSuccess("제안이 완료되었어요.", "예약이 확정되면 바로 알려드릴게요.");
          hideProposeModal();
          router.replace("/call/#proposal");
        } catch (error) {
          console.error(error);
          showWarning("이미 완료된 콜입니다.");
          hideProposeModal();
          router.push("/call");
        }
      },
      isAxa,
      requestText
    );
  };

  const cancelPropose = async () => {
    try {
      await deletePropose(id);
      showSuccess("제안이 취소되었어요.");

      router.replace("/call/#proposal");
    } catch (error) {
      console.error(error);
      showError("이미 입고확정 또는 취소된 건이에요.", "현재 상태는 제안내역에서 확인할 수 있어요.");
      router.replace("/call/#proposal");
    }
  };

  const onClickCancelPropose = () => {
    showModal({
      title: "제안을 취소하시겠어요?",
      description: "제안을 취소하시면 이 예약은 다른 공업사에 배정될 수 있어요.",
      cancelButtonText: "아니요",
      confirmButtonText: "제안 취소하기",
      onConfirm: () => cancelPropose(),
    });
  };

  const onClickGoBack = () => {
    if (isProposal) {
      router.push("/call#proposal");
    } else {
      router.push("/call#mycall");
    }
  };

  return (
    <>
      <div className="flex flex-col bg-bg-normal pt-4">
        <div className="self-stretch bg-bg-normal ">
          <div className="flex flex-col self-stretch mb-20 px-5 gap-8">
            <div className="flex flex-col items-start self-stretch gap-4">
              <div className="flex items-center pr-[3px] gap-2">
                <div className="flex flex-col shrink-0 items-start bg-bg-normal text-left py-1 px-2 rounded-md border border-solid border-line-primary">
                  <span className="text-secondary-normal text-sm font-semibold">
                    {detailData?.sido} {detailData?.sigungu}
                  </span>
                </div>
                <span className="text-secondary-normal text-[15px] font-semibold">
                  {detailData?.insuranceCompanyName}
                </span>
              </div>
              <span className="text-primary-normal text-[22px] font-semibold">{detailData?.carModel}</span>
            </div>

            <div className="flex flex-col self-stretch gap-2">
              <div className="flex flex-col items-start self-stretch">
                <span className="text-primary-normal text-base font-medium mb-2">보험 정보</span>

                <DetailInfoRow label="사고접수번호" value={detailData?.insuranceClaimNo || "-"} />
                <DetailInfoRow label="보험사" value={detailData?.insuranceCompanyName || "-"} />
                <DetailInfoRow
                  label="사고구분"
                  value={
                    detailData?.coverageType
                      ? COVERAGE_TYPE[detailData?.coverageType as keyof typeof COVERAGE_TYPE]
                      : "-"
                  }
                />
              </div>

              <div className="self-stretch bg-neutral-100 h-0.5 mb-[16px]"></div>

              <div className="flex flex-col items-start self-stretch">
                <span className="text-primary-normal text-base font-medium mb-2">예약 기본 정보</span>
                <DetailInfoRow
                  label="예약지역"
                  value={detailData?.sido || detailData?.sigungu ? detailData?.sido + " " + detailData?.sigungu : "-"}
                />
                <DetailInfoRow label="입고 예약일" value={formatDate(detailData?.reservationDate) || "-"} />
              </div>

              <div className="flex flex-col items-start self-stretch">
                <div className="w-full px-3 py-2 bg-bg-alternative rounded-lg outline outline-1 outline-offset-[-1px] outline-line-neutral inline-flex flex-col items-start gap-1">
                  <div className="text-neutral-700 text-sm leading-5 tracking-tight">추가 요청사항</div>
                  <div
                    className={`self-stretch text-sm leading-5 tracking-tight whitespace-pre-wrap break-words ${
                      hasRequest ? "text-primary-normal" : "text-primary-assistive"
                    }`}
                  >
                    {hasRequest ? requestText : "요청사항이 없습니다."}
                  </div>
                </div>
              </div>
              <div className="self-stretch bg-neutral-100 h-0.5 mt-[12px] mb-[16px]"></div>

              <div className="flex flex-col items-start self-stretch">
                <span className="text-primary-normal text-base font-medium mb-2">차량 정보</span>

                <DetailInfoRow label="차량번호" value={detailData?.carNumber || "-"} />
                <DetailInfoRow label="차종" value={detailData?.carModel || "-"} />
                <DetailInfoRow label="배기량" value={detailData?.engineDisplacement || "-"} />
                <DetailInfoRow label="연식" value={detailData?.carModelYear || "-"} />
              </div>
            </div>

            <div className="flex flex-col items-start self-stretch bg-bg-normal py-5 gap-4 rounded-xl border border-solid border-neutral-200">
              <div className="flex items-center pr-0.5 ml-5 gap-2">
                <svg
                  className="w-6 h-6 text-secondary-normal fill-current"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.09991 12.0001C2.09991 17.4678 6.53228 21.9001 11.9999 21.9001C17.4675 21.9001 21.8998 17.4678 21.8998 12.0001C21.8998 6.53253 17.4675 2.10015 11.9999 2.10015C6.53228 2.10015 2.09991 6.53253 2.09991 12.0001ZM12 16.9002C12.497 16.9002 12.9 16.4973 12.9 16.0002V11.5002C12.9 11.0032 12.497 10.6002 12 10.6002C11.5029 10.6002 11.1 11.0032 11.1 11.5002V16.0002C11.1 16.4973 11.5029 16.9002 12 16.9002ZM12.9998 8.00024C12.9998 7.44796 12.5521 7.00024 11.9998 7.00024C11.4476 7.00024 10.9999 7.44796 10.9999 8.00024C10.9999 8.55253 11.4476 9.00024 11.9998 9.00024C12.5521 9.00024 12.9998 8.55253 12.9998 8.00024Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-secondary-normal text-sm font-semibold">잠깐, 중요한 정보가 있어요.</span>
              </div>
              <span className="text-neutral-700 text-sm font-medium px-5">
                제안하기는 여러 공업사가 제안할 수 있으며, 해당 제안 중 한 곳이 최종 배정됩니다.
              </span>
            </div>
          </div>

          <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center self-stretch pb-8 pt-4 gap-1 rounded-xl bg-bg-normal">
            <div className="flex items-start self-stretch px-5 gap-2">
              {isProposal ? (
                <button
                  className="flex flex-1 flex-col items-center bg-neutral-100 text-left py-3 rounded-lg border-0"
                  onClick={onClickCancelPropose}
                >
                  <div className="flex flex-col items-center pb-[1px]">
                    <span className="text-primary-neutral text-base font-medium">제안 취소</span>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    className="flex flex-col shrink-0 items-center bg-neutral-100 py-3 px-8 rounded-lg"
                    onClick={onClickGoBack}
                  >
                    <span className="text-[#212121] text-base font-bold">나가기</span>
                  </button>

                  <button
                    className="flex flex-1 flex-col items-center bg-[#131211] text-left py-3 rounded-lg border-0"
                    onClick={handlePropose}
                  >
                    <div className="flex flex-col items-center pb-[1px]">
                      <span className="text-white text-base font-bold">제안하기</span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
