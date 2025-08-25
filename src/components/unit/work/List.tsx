"use client";

import { useLoadingStore } from "@/store/loading";
import { useMyWorkStore } from "@/store/mywork";
import { sleep } from "@/utils/util";
import { useEffect } from "react";
import WorkCard from "./elements/WorkCard";

export default function WorkList({ currentStatus }: { currentStatus: string }) {
  const { myWorkData } = useMyWorkStore();
  const { setIsLoading } = useLoadingStore();

  useEffect(() => {
    const loading = async () => {
      setIsLoading(true);
      await sleep(500);
      setIsLoading(false);
    };
    loading();

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }, []);

  return (
    <>
      <div className="flex flex-col items-start self-stretch gap-2 bg-bg-main pt-4 flex-1 pb-24 min-h-screen">
        <span className="text-primary-neutral text-sm font-medium mx-5">
          날짜순
        </span>
        {currentStatus === "전체"
          ? myWorkData.map((data, idx) => <WorkCard data={data} key={idx} />)
          : myWorkData
              .filter((item) => item.status === currentStatus)
              .map((data, idx) => <WorkCard data={data} key={idx} />)}
      </div>
    </>
  );
}
