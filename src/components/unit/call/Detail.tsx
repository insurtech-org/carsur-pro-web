"use client";

import { deletePropose, getCallDetail, postPropose } from "@/api/call.api";
import ProposeModal from "@/components/modal/ProposeModal";
import { useModalStore } from "@/store/modal";
import { useToastStore } from "@/store/toast";
import { ICallDetail } from "@/type/call.type";
import { formatDate } from "@/utils/util";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail({ id, hash }: { id: number; hash: string }) {
  const router = useRouter();

  const { showSuccess, showError } = useToastStore();
  const { showModal } = useModalStore();

  const isProposal = hash.includes("proposal");

  const [proposeModalOpen, setProposeModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [detailData, setDetailData] = useState<ICallDetail | null>(null);

  useEffect(() => {
    fetchCallDetail();
  }, []);

  const fetchCallDetail = async () => {
    try {
      const res = await getCallDetail(Number(id));
      setDetailData(res);
    } catch (error) {
      console.log(error);
      showError("콜 상세 정보를 불러오는데 실패했어요.");
      router.push("/call");
    }
  };

  const onClickDoPropose = async () => {
    try {
      await postPropose(id);

      setProposeModalOpen(false);
      showSuccess("제안이 완료되었어요.", "예약이 확정되면 바로 알려드릴게요.");
      router.replace("/call/#proposal");
    } catch (error) {
      console.error(error);
      showError("시스템 오류로 제안에 실패했어요", "운영팀에 문의주세요.");
    }
  };

  const cancelPropose = async () => {
    try {
      await deletePropose(id);
      setCancelModalOpen(false);
      showSuccess("제안이 취소되었습니다.");
      router.replace("/call/#proposal");
    } catch (error) {
      console.error(error);
      showError("시스템 오류로 제안 취소에 실패했어요.", "운영팀에 문의주세요.");
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
      router.push("/call#mylocal");
    }
  };

  return (
    <>
      <div className="flex flex-col bg-bg-normal pt-4">
        <div className="self-stretch bg-bg-normal ">
          <div className="flex flex-col self-stretch mb-20 px-5 gap-8">
            <div className="flex flex-col items-start self-stretch gap-4">
              <div className="flex items-center pr-[3px] gap-2">
                <div className="flex flex-col shrink-0 items-start bg-bg-normal text-left py-1 px-2 rounded-md border border-solid border-secondary-normal">
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
                <span className="text-primary-normal text-base font-medium mb-[9px]">보험 정보</span>
                <div className="flex justify-between items-center self-stretch mb-2">
                  <span className="flex-1 text-neutral-700 text-base font-regular  mr-1">사고접수번호</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.insuranceClaimNo || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center self-stretch">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">보험사</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.insuranceCompanyName}
                  </span>
                </div>
              </div>
              <div className="self-stretch bg-neutral-100 h-0.5"></div>
              <div className="flex flex-col items-start self-stretch">
                <span className="text-primary-normal text-base font-medium mb-[9px]">{"예약 기본 정보"}</span>
                <div className="flex justify-between items-center self-stretch mb-2">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"예약지역"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.sido} {detailData?.sigungu}
                  </span>
                </div>
                <div className="flex justify-between items-center self-stretch">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"입고 예약일"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {formatDate(detailData?.reservationDate)}
                  </span>
                </div>
              </div>
              <div className="self-stretch bg-neutral-100 h-0.5"></div>
              <div className="flex flex-col items-start self-stretch">
                <span className="text-primary-normal text-base font-medium mb-[9px]">{"차량 정보"}</span>
                <div className="flex justify-between items-center self-stretch mb-2">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"차량번호"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.carNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center self-stretch mb-2">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"차종"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.carModel}
                  </span>
                </div>
                <div className="flex justify-between items-center self-stretch mb-2">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"배기량"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {detailData?.engineDisplacement}
                  </span>
                </div>
                <div className="flex justify-between items-center self-stretch">
                  <span className="flex-1 text-neutral-700 text-base font-regular mr-1">{"연식"}</span>
                  <span className="flex-1 text-primary-normal text-base font-medium text-right">
                    {`${detailData?.carModelYear}`}
                  </span>
                </div>
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
                    onClick={() => setProposeModalOpen(true)}
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

      {/* 제안 모달 */}
      <ProposeModal
        isOpen={proposeModalOpen}
        onClose={() => setProposeModalOpen(false)}
        onClickPropose={onClickDoPropose}
      />
    </>
  );
}
