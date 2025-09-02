"use client";

import { useEffect, useState } from "react";
import WorkCard from "./elements/WorkCard";
import { getWorkScheduleList } from "@/api/work.api";
import { IWorkList } from "@/type/work.type";
import { IPageInfo } from "@/type/etc.type";
import { useSearchParams } from "next/navigation";
import { WORK_STATUS } from "@/utils/enum";

export default function WorkList({
  currentStatus,
  onDataFetched,
}: {
  currentStatus: string;
  onDataFetched: () => void;
}) {
  const [workList, setWorkList] = useState<IWorkList[]>([]);
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalItems: 0,
    totalPage: 0,
  });

  useEffect(() => {
    fetchWorkList();
    //스크롤 가장 위로
    window.scrollTo(0, 0);
  }, [currentStatus]);

  const fetchWorkList = async () => {
    try {
      let searchStatus = "";

      switch (currentStatus) {
        case "CANCELLED":
          searchStatus = "FACTORY_CANCELLED";
          break;
        case "TOTAL":
          searchStatus = "";
          break;
        default:
          searchStatus = currentStatus;
      }

      const res = await getWorkScheduleList({
        status: searchStatus,
        page: page,
        size: 10,
      });

      setWorkList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      onDataFetched();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-2 bg-bg-main pt-4 flex-1 pb-24 min-h-screen">
        <span className="text-primary-neutral text-sm font-medium mx-5">날짜순</span>
        {currentStatus === "TOTAL" ? (
          workList.length === 0 ? (
            <EmptyWork status={currentStatus} />
          ) : (
            workList.map((data, idx) => <WorkCard data={data} key={idx} />)
          )
        ) : (
          (() => {
            return workList.length === 0 ? (
              <EmptyWork status={currentStatus} />
            ) : (
              workList.map((data, idx) => <WorkCard data={data} key={idx} />)
            );
          })()
        )}
      </div>
    </>
  );
}

//작업 없음 컴포넌트
const EmptyWork = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col items-center justify-center  bg-neutral-100 h-72 w-full">
      <span className="text-primary-assistive text-[15px] font-medium">
        {status === "CANCELLED"
          ? `아직 취소가 없어요.`
          : `아직 ${WORK_STATUS[status as keyof typeof WORK_STATUS]} 작업이 없어요.`}
      </span>
    </div>
  );
};
