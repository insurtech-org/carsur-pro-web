"use client";

import ProposeModal from "@/components/modal/ProposeModal";
import { callData } from "@/mock/data";
import { usePropoesStore } from "@/store/propoes";
import { useToastStore } from "@/store/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Call() {
  return (
    <div className="flex flex-col items-center self-stretch bg-neutral-100 h-screen p-4 gap-3">
      {callData.length > 0 ? (
        callData.map((data) => <CallCard callData={data} key={data.id} />)
      ) : (
        <div className="flex flex-col items-center justify-center  bg-neutral-100 h-1/2">
          <span className="text-primary-neutral text-[15px] font-medium">
            내 지역 콜 요청 내역이 없어요.
          </span>
        </div>
      )}
    </div>
  );
}

const CallCard = ({ callData }: { callData: any }) => {
  const router = useRouter();
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const { addProposeData } = usePropoesStore();
  const { showSuccess } = useToastStore();

  const onClickDetail = (id: number) => {
    router.push(`/call/${id}#mylocal`);
  };

  const onClickDoPropose = async () => {
    setIsProposeModalOpen(false); // 모달닫기
    addProposeData(callData); // 제안 데이터 넣기
    showSuccess("제안이 완료되었어요.", "예약이 확정되면 바로 알려드릴게요."); // 토스트 알럿
    window.location.hash = "#proposal"; //이동
  };

  return (
    <>
      <div
        className="flex flex-col self-stretch bg-white p-4 gap-4 rounded-xl"
        style={{
          boxShadow: "0px 4px 20px #0A0C1112",
        }}
      >
        <div className="flex flex-col items-start self-stretch gap-2">
          <div className="flex flex-col items-start bg-secondary-bg text-left py-1 px-2 rounded-md">
            <span className="text-secondary-normal text-xs font-medium">
              {callData.company}
            </span>
          </div>

          <div className="flex flex-col self-stretch gap-1">
            <div className="flex items-center self-stretch gap-1 text-neutral-300">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
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
              <span className="text-primary-normal text-lg font-semibold">
                입고 예약일
              </span>

              <span className="text-primary-normal text-lg font-semibold">
                {callData.reservationDate}
              </span>
            </div>

            <div className="flex items-center self-stretch">
              <span className="text-primary-alternative text-sm font-medium mr-0.5">
                {callData.location}
              </span>
              <span className="text-primary-alternative text-sm font-medium mr-0.5">
                {"・"}
              </span>
              <span className="text-primary-alternative text-sm font-medium">
                {callData.carName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start self-stretch gap-2">
          <button
            className="flex flex-col flex-1 items-center bg-neutral-100 py-3 rounded-lg hover:bg-neutral-200 transition-colors"
            onClick={() => onClickDetail(callData.id)}
          >
            <span className="text-primary-neutral text-base font-semibold ">
              상세보기
            </span>
          </button>
          <button
            className="flex flex-col flex-1 items-center bg-primary-normal text-left py-3 rounded-lg border-0 hover:bg-primary-dark transition-colors"
            onClick={() => setIsProposeModalOpen(true)}
          >
            <span className="text-white text-base font-semibold">제안하기</span>
          </button>
        </div>
      </div>

      <ProposeModal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        onClickPropose={onClickDoPropose}
      />
    </>
  );
};
