import { IProposalHistory } from "@/type/call.type";
import { formatDate } from "@/utils/util";
import { useEffect, useState } from "react";

export default function HistoryCard({ data }: { data: IProposalHistory }) {
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (data.proposalStatus === "입고확정") {
      setIsCorrect(true);
    }
  }, []);

  return (
    <div className="self-stretch w-full">
      <div className="self-stretch flex flex-row justify-start items-center gap-2 mb-2">
        {/* 상태 배지 */}
        <div
          className={`px-2 py-1 rounded-md flex justify-center items-center gap-2`}
          style={{
            backgroundColor: isCorrect ? "#D5E7F299" : "#E5E4E199",
          }}
        >
          <div className="text-center text-primary-normal text-xs font-medium">{data.proposalStatus}</div>
        </div>

        {/* 보험사 */}
        <div className="text-neutral-700 text-[15px] font-regular">{data.insuranceCompanyName}</div>
      </div>

      <div className="self-stretch flex flex-col justify-start items-start gap-1">
        <div className="self-stretch inline-flex justify-start items-center">
          {/* 예약지역 */}
          <div className="justify-start text-neutral-700 text-[15px] font-regular">{data.formattedAddress}</div>
          <div className="text-center justify-start text-neutral-700 text-[15px] font-regular">{"・"}</div>
          {/* 차량 정보 */}
          <div className="flex-1 justify-start text-neutral-700 text-[15px] font-regular">{data.carModel}</div>
        </div>
        {/* 입고 예약일 */}
        <div className="self-stretch inline-flex justify-start items-center gap-1">
          <div className="justify-start text-neutral-700 text-[15px] font-regular">입고 예약일:</div>
          <div className="justify-start text-neutral-700 text-[15px] font-regular">
            {formatDate(data.reservationDate)}
          </div>
        </div>
      </div>
    </div>
  );
}
