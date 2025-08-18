"use client";

import { workData } from "@/mock/data";
import { statusColor } from "@/utils/util";
import { useRouter } from "next/navigation";

export default function WorkList({ currentStatus }: { currentStatus: string }) {
  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-2 bg-bg-main pt-4 flex-1 pb-24">
        <span className="text-[#212121] text-sm font-bold mx-5">
          {"날짜순"}
        </span>
        {currentStatus === "전체"
          ? workData.map((data, idx) => <WorkCard data={data} key={idx} />)
          : workData
              .filter((item) => item.status === currentStatus)
              .map((data, idx) => <WorkCard data={data} key={idx} />)}
      </div>
    </>
  );
}

const WorkCard = ({ data }: { data: any }) => {
  const router = useRouter();
  const onClickDetail = (id: number) => {
    router.push(`/work/${id}`);
  };

  return (
    <button
      className="flex flex-col self-stretch mx-5 gap-3"
      onClick={() => onClickDetail(data.id)}
    >
      <div
        className="flex flex-col self-stretch bg-white py-4 gap-2.5 rounded-xl border border-solid border-neutral-100"
        style={{
          boxShadow: "0px 4px 20px #0A0C1112",
        }}
      >
        <div className="flex flex-col items-start self-stretch mx-4 gap-2.5">
          <div className="flex items-center self-stretch gap-2">
            <div className="flex flex-col shrink-0 items-center relative">
              <div
                className={`flex flex-col items-start text-left py-1 px-2 rounded-md border-0`}
                style={{
                  backgroundColor: statusColor(String(data.status))?.bg,
                }}
              >
                <span
                  className={`text-xs font-medium`}
                  style={{
                    color: statusColor(String(data.status))?.text,
                  }}
                >
                  {data.status}
                </span>
              </div>
              {data.status === "입고확정" && (
                <div className="w-2 h-2 absolute top-0 right-[-2px] rounded-xl object-fill bg-status-destructive"></div>
              )}
            </div>
          </div>
          <span className="text-[#131211] text-lg font-bold">
            {data.carName}
          </span>
        </div>

        <div className="flex items-start self-stretch mx-4">
          <div className="flex flex-1 flex-col items-start gap-0.5">
            <span className="text-[#616161] text-sm">{data.location}</span>
            <span className="text-[#616161] text-sm">{data.customerPhone}</span>
          </div>
          <span className="text-[#616161] text-sm mt-[22px]">
            {data.company}
          </span>
        </div>
      </div>
    </button>
  );
};
