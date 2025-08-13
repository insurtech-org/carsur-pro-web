"use client";

import ProposeModal from "@/components/modal/ProposeModal";
import { callData } from "@/mock/data";
import { usePropoesStore } from "@/store/propoes";
import { useToastStore } from "@/store/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Call() {
  return (
    <div className="flex flex-col items-center self-stretch bg-neutral-100 h-screen">
      {callData.length > 0 ? (
        callData.map((data) => <CallCard callData={data} key={data.id} />)
      ) : (
        <span className="text-[#212121] text-[15px] font-bold mb-[443px]">
          {"내 지역 콜 요청 내역이 없어요."}
        </span>
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
        className="flex flex-col self-stretch bg-white py-4 mb-3 mx-5 gap-4 rounded-xl"
        style={{
          boxShadow: "0px 4px 20px #0A0C1112",
        }}
      >
        <div className="flex flex-col items-start self-stretch mx-4 gap-2">
          <div className="flex flex-col items-start bg-white text-left py-1 px-2 rounded-md border border-solid border-line-primary">
            <span className="text-line-primary text-xs font-bold">
              {callData.company}
            </span>
          </div>
          <div className="flex flex-col self-stretch gap-1">
            <div className="flex items-center self-stretch gap-1">
              <img
                src={
                  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/bU8Au7d4Df/xmocjggd_expires_30_days.png"
                }
                className="w-5 h-5 object-fill"
              />
              <span className="text-primary-normal text-lg font-semibold">
                입고 예약일
              </span>
              <span className="text-primary-normal text-lg font-semibold">
                {callData.reservationDate}
              </span>
            </div>
            <div className="flex items-center self-stretch">
              <span className="text-primary-alternative text-sm font-semibold mr-1.5">
                {callData.location}
              </span>
              <span className="text-primary-alternative text-sm font-semibold mr-2.5">
                {"・"}
              </span>
              <span className="text-primary-alternative text-sm font-semibold">
                {callData.carName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-start self-stretch mx-4 gap-2">
          <button
            className="flex flex-col shrink-0 items-center bg-neutral-100 py-3 px-5 rounded-lg"
            onClick={() => onClickDetail(callData.id)}
          >
            <span className="text-primary-neutral text-base font-bold ">
              상세보기
            </span>
          </button>
          <button
            className="flex flex-1 flex-col items-center bg-primary-normal text-left py-3 px-16 rounded-lg border-0"
            onClick={() => setIsProposeModalOpen(true)}
          >
            <span className="text-white text-base font-bold">제안하기</span>
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
