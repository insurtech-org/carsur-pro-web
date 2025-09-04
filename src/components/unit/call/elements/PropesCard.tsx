"use client";

import { deletePropose } from "@/api/call.api";
import { useModalStore } from "@/store/modal";
import { useToastStore } from "@/store/toast";
import { IProposeList } from "@/type/call.type";
import { formatDate } from "@/utils/util";
import { useRouter } from "next/navigation";

export const ProposeCard = ({ proposeData, refetch }: { proposeData: IProposeList; refetch: () => void }) => {
  const router = useRouter();

  const { showSuccess } = useToastStore();
  const { showModal } = useModalStore();

  const handleProposeCancel = (id: string) => {
    showModal({
      title: "제안을 취소하시겠어요?",
      description: "제안을 취소하시면 이 예약은 다른 공업사에 배정될 수 있어요.",
      cancelButtonText: "아니요",
      confirmButtonText: "제안 취소하기",
      onConfirm: () => onClickProposeCancel(Number(id)),
    });
  };

  const onClickProposeCancel = async (id: number) => {
    try {
      await deletePropose(id);
      showSuccess("제안이 취소되었어요.");
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  const onClickDetail = (id: string) => {
    router.push(`/call/${id}#proposal`);
  };

  return (
    <>
      <div
        className="flex flex-col self-stretch bg-white p-4 gap-2 rounded-xl"
        style={{
          boxShadow: "0px 4px 20px #0A0C1112",
        }}
      >
        <div className="flex flex-col items-start self-stretch gap-2">
          {/* 보험사 태그 */}
          <div className="flex flex-col items-start bg-secondary-bg text-left py-1 px-2 rounded-md">
            <span className="text-secondary-normal text-xs font-medium">{proposeData.insuranceCompanyName || ""}</span>
          </div>

          {/* 메인 정보 영역 */}
          <div className="flex flex-col self-stretch gap-1">
            {/* 입고 예약일 */}
            <div className="flex items-center self-stretch gap-1 text-neutral-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 20V22H6V20H18ZM19 19V7C19 6.44772 18.5523 6 18 6H6C5.44772 6 5 6.44772 5 7V19C5 19.5523 5.44772 20 6 20V22C4.39489 22 3.08421 20.7394 3.00391 19.1543L3 19V7C3 5.34315 4.34315 4 6 4H18L18.1543 4.00391C19.7394 4.08421 21 5.39489 21 7V19L20.9961 19.1543C20.9184 20.6883 19.6883 21.9184 18.1543 21.9961L18 22V20C18.5523 20 19 19.5523 19 19Z"
                  fill="currentColor"
                />
                <path d="M4 10H20V12H4V10Z" fill="currentColor" />
                <path
                  d="M7 3C7 2.44772 7.44772 2 8 2C8.55228 2 9 2.44772 9 3V7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7V3Z"
                  fill="currentColor"
                />
                <path
                  d="M15 3C15 2.44772 15.4477 2 16 2C16.5523 2 17 2.44772 17 3V7C17 7.55228 16.5523 8 16 8C15.4477 8 15 7.55228 15 7V3Z"
                  fill="currentColor"
                />
              </svg>

              <span className="text-primary-normal text-base font-semibold">입고 예약일</span>

              <span className="text-primary-normal text-base font-semibold">
                {formatDate(proposeData.reservationDate)}
              </span>
            </div>

            {/* 위치 및 차량 정보 */}
            <div className="flex items-center self-stretch">
              <span className="text-primary-alternative text-sm font-medium mr-0.5">{proposeData.address || ""}</span>
              <span className="text-primary-alternative text-sm font-medium mr-0.5">{"・"}</span>
              <span className="text-primary-alternative text-sm font-medium">{proposeData.carModel || ""}</span>
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-start self-stretch gap-2">
          {/* 제안 취소 버튼 */}
          <button
            className="flex flex-1 flex-col items-center bg-neutral-100 py-3 rounded-lg hover:bg-neutral-200 transition-colors"
            onClick={() => handleProposeCancel(String(proposeData.id))}
          >
            <span className="text-primary-neutral text-base font-medium">제안 취소</span>
          </button>

          {/* 상세보기 버튼 */}
          <button
            className="flex flex-1 flex-col items-center bg-white py-3 rounded-lg border border-solid border-[#D6D6D6] hover:bg-neutral-50 transition-colors"
            onClick={() => onClickDetail(String(proposeData.id))}
          >
            <span className="text-primary-neutral text-base font-medium">상세보기</span>
          </button>
        </div>
      </div>
    </>
  );
};
