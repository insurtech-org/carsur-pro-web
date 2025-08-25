import dayjs from "dayjs";
import HistoryCard from "./elements/HistoryCard";
import { useEffect, useState } from "react";
import { getProposalHistory } from "@/api/call.api";
import { IPageInfo } from "@/type/etc.type";
import { IProposalHistory } from "@/type/call.type";

export default function ProposalHistory() {
  const today = dayjs().format("YYYY.MM.DD");
  const before30 = dayjs().subtract(30, "day").format("YYYY.MM.DD");

  const [proposalHistoryList, setProposalHistoryList] = useState<IProposalHistory[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    currentPage: 1,
    totalItems: 0,
    totalPage: 0,
  });
  const [page, setPage] = useState(1);

  const [dateSection, setDateSection] = useState<string[]>([]);

  useEffect(() => {
    fetchProposalHistory();
  }, []);

  const fetchProposalHistory = async () => {
    try {
      const res = await getProposalHistory({ page: page, size: 10 });

      setProposalHistoryList(res.items);
      setPageInfo({
        currentPage: res.currentPage,
        totalItems: res.totalItems,
        totalPage: res.totalPage,
      });

      const uniqueDates = Array.from<string>(
        new Set(res.items.map((data: IProposalHistory) => dayjs(data.proposedAt).format("YYYY-MM-DD")))
      ).sort((a, b) => dayjs(b).diff(dayjs(a)));

      setDateSection(uniqueDates);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <div className="w-full inline-flex flex-col justify-start items-start gap-6">
        {/* 최근 30일 헤더  */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="flex justify-start items-center gap-1">
            <div className="justify-start text-primary-normal text-base font-medium ">최근 30일</div>
            <img src="/images/icon/ic_calendar-line.svg" className="w-5 h-5" />
          </div>
          <div className="flex-1 text-right justify-start text-primary-alternative text-sm font-regular leading-tight">
            {before30} ~ {today}
          </div>
        </div>

        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* 일별 섹션 */}
            {dateSection.length > 0 ? (
              dateSection.map((date, idx) => (
                <div key={`date-${idx}-${date}`} className="self-stretch w-full">
                  <div className="self-stretch w-full p-2 bg-neutral-100 rounded-xl inline-flex justify-start items-center mb-4">
                    <div className="text-right justify-start text-black text-sm font-normal">{date}</div>
                  </div>
                  {/* Card 섹션 */}
                  <div className="self-stretch px-2 flex flex-col justify-start items-start">
                    {proposalHistoryList
                      .filter(data => dayjs(data.proposedAt).format("YYYY-MM-DD") === date)
                      .map((data, idx) => (
                        <div key={`${date}-${data.id}-${idx}`} className="self-stretch w-full">
                          <HistoryCard data={data} />
                          {idx !==
                            proposalHistoryList.filter(data => dayjs(data.proposedAt).format("YYYY-MM-DD") === date)
                              .length -
                              1 && <div className="self-stretch h-0.5 bg-line-alternative my-4" />}
                        </div>
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-72 w-full">
                <span className="text-primary-neutral text-[15px] font-medium">제안 내역이 없어요.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
