"use client";

import { useEffect, useState } from "react";
import { ProposeCard } from "./elements/PropesCard";
import { getProposalList } from "@/api/call.api";
import { IPageInfo } from "@/type/etc.type";
import { IProposeList } from "@/type/call.type";

export default function Proposal() {
  const [proposeList, setProposeList] = useState<IProposeList[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalItems: 0,
    totalPage: 0,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProposalList();
  }, []);

  const fetchProposalList = async () => {
    try {
      const res = await getProposalList({ page: page, size: 10 });

      setProposeList(res.items);
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
    <div className="flex flex-col items-start self-stretch bg-neutral-100 p-4 gap-3 flex-1 pb-24 min-h-screen">
      {proposeList.length > 0 ? (
        proposeList.map((data, idx) => <ProposeCard proposeData={data} refetch={fetchProposalList} key={idx} />)
      ) : (
        <div className="flex flex-col items-center justify-center  bg-neutral-100 h-72 w-full">
          <span className="text-primary-assistive text-[15px] font-medium">제안 중인 내역이 없어요.</span>
        </div>
      )}
    </div>
  );
}
