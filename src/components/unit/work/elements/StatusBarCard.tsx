"use client";

import { workDetailStatus, workSteps, workStatus } from "@/mock/data";
import { useEffect, useState } from "react";

const StatusBarCard = ({ data }: { data: any }) => {
  const [workStatus, setWorkStatus] = useState(data?.status);

  useEffect(() => {
    setWorkStatus(data?.status);
  }, [data]);

  return (
    <div
      className="flex flex-col items-start self-stretch bg-white py-4 mx-5 gap-6 rounded-xl border border-solid border-neutral-100"
      style={{
        boxShadow: "0px 4px 20px #0A0C1112",
      }}
    >
      <span className="text-neutral-800 text-lg font-semibold ml-[22px] mr-4">
        {workDetailStatus[workStatus as keyof typeof workDetailStatus] ||
          "고객과 입고 일정을 확정해 주세요"}
      </span>

      <div className="flex items-start self-stretch mx-4 h-11 relative">
        {Object.keys(workDetailStatus).map((item, idx) => {
          const isCompleted =
            workSteps.indexOf(item) <= workSteps.indexOf(workStatus as string);
          const currentStepIndex = workSteps.indexOf(workStatus as string);

          return (
            <div
              className="flex flex-1 flex-col items-center relative"
              key={idx}
            >
              {/* 연결선 - 첫 번째가 아닌 경우에만 표시 */}
              {idx > 0 && (
                <div
                  className="absolute top-[11px] right-1/2 w-full h-0.5 z-0"
                  style={{
                    backgroundColor:
                      idx <= currentStepIndex ? "#262626" : "#e5e5e5",
                  }}
                ></div>
              )}

              {/* 아이콘 */}
              <div className="relative z-10">
                {isCompleted ? (
                  <img
                    src={"/images/icon/ic_check-fil-2.svg"}
                    className="w-[22px] h-[22px] object-fill bg-bg-normal rounded-full"
                  />
                ) : (
                  <div className="flex w-[22px] h-[22px] items-center border border-solid border-neutral-300 rounded-full justify-center bg-bg-normal">
                    <span className="text-neutral-500 text-[13px] font-medium">
                      {idx + 1}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center mt-2">
                <span className="text-neutral-700 text-xs font-semibold text-center">
                  {item}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusBarCard;
