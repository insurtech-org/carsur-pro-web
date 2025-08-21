"use client";

import { useCallDataStore } from "@/store/callData";
import { useEffect, useState } from "react";
import CallCard from "./elements/CallCard";
import { getCallList } from "@/api/call.api";
import { ICallList } from "@/type/call.type";
import { IPageInfo } from "@/type/etc.type";

export default function Call() {
  const { callData: data } = useCallDataStore();

  const callData = data.filter((data) => data.status === "입고예정");

  const [callList, setCallList] = useState<ICallList[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalItems: 0,
    totalPage: 0,
  });

  useEffect(() => {
    fetchCallList();
  }, []);

  const fetchCallList = async () => {
    try {
      const res = await getCallList();

      setCallList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center self-stretch bg-neutral-100 h-screen p-4 gap-3">
      {callList.length > 0 ? (
        callList.map((data) => <CallCard callData={data} key={data.id} />)
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
