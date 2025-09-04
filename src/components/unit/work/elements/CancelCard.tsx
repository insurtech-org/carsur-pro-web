"use client";

import { useMemo } from "react";

const CancelCard = ({ reason }: { reason: string }) => {
  const cancelReason = useMemo(
    () =>
      reason.includes("FACTORY")
        ? "공업사 사정에 의해 포기 되었어요."
        : reason.includes("CUSTOMER")
        ? "고객에 의해 포기 되었어요."
        : "입고 포기 되었어요.",
    [reason]
  );

  return (
    <div
      className="flex flex-col items-start self-stretch bg-bg-normal p-4 mx-5 gap-6 rounded-xl border border-solid border-neutral-100"
      style={{
        boxShadow: "0px 4px 20px #0A0C1112",
      }}
    >
      <div className="w-full">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-start text-neutral-700 text-base font-regular">{cancelReason}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelCard;
