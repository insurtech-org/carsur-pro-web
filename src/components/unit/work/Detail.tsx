"use client";

import { workData, workDetailStatus, workStatus, workSteps } from "@/mock/data";
import { getWorkUnderStatus, statusColor } from "@/utils/util";
import { useParams } from "next/navigation";

export default function WorkDetail() {
  const params = useParams();
  const id = Number(params.id);
  const detailData = workData.find((data) => data.id === id);

  return (
    <>
      <div className="flex flex-col self-stretch bg-bg-main">
        <div className="flex flex-col items-start self-stretch bg-neutral-100 py-4 gap-4">
          {/* 지역, 상태 배찌 */}
          <div className="flex items-start ml-5 gap-2">
            <div className="flex flex-col shrink-0 items-start bg-white text-left py-1 px-2 rounded-md border border-solid border-secondary-normal">
              <span className="text-secondary-normal text-xs font-medium">
                {detailData?.location}
              </span>
            </div>
            <div
              className="flex flex-col shrink-0 items-start text-left py-1 px-2 rounded-md border-0"
              style={{
                backgroundColor: statusColor(detailData?.status as string)?.bg,
                color: statusColor(detailData?.status as string)?.text,
              }}
            >
              <span className="text-xs font-medium">
                {detailData?.status as keyof typeof workStatus}
              </span>
            </div>
          </div>

          {/* 보험사, 차량명 */}
          <div className="flex flex-col items-start self-stretch mx-5">
            <span className="text-secondary-normal text-[15px] font-semibold">
              {detailData?.company}
            </span>
            <span className="text-primary-normal text-[22px] font-semibold">
              {detailData?.carName}
            </span>
          </div>

          {/* 상태 바*/}
          <div
            className="flex flex-col items-start self-stretch bg-white py-4 mx-5 gap-6 rounded-xl border border-solid border-neutral-100"
            style={{
              boxShadow: "0px 4px 20px #0A0C1112",
            }}
          >
            <span className="text-neutral-800 text-lg font-semibold ml-[22px] mr-4">
              {workDetailStatus[
                detailData?.status as keyof typeof workDetailStatus
              ] || "고객과 입고 일정을 확정해 주세요"}
            </span>

            <div className="flex items-start self-stretch mx-4 h-11 relative">
              {Object.keys(workDetailStatus).map((item, idx) => {
                const isCompleted =
                  workSteps.indexOf(item) <=
                  workSteps.indexOf(detailData?.status as string);
                const currentStepIndex = workSteps.indexOf(
                  detailData?.status as string
                );

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
                          src={"/images/icon/ic_check-circle-fill.svg"}
                          className="w-[22px] h-[22px] object-fill bg-bg-normal border border-solid border-neutral-800 rounded-full"
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
        </div>
      </div>

      <div className="flex flex-col self-stretch bg-bg-normal py-4 gap-8">
        <div className="flex flex-col items-start self-stretch bg-neutral-50 py-4 mx-5 gap-4 rounded-xl p-4">
          <span className="text-primary-normal text-[17px] font-semibold">
            고객 정보
          </span>
          <div className="flex w-full items-center justify-between">
            <span className="text-neutral-600 text-base font-regular">
              고객전화번호
            </span>
            <div className="flex items-center gap-1">
              <img
                src={
                  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/bU8Au7d4Df/rjw13z2p_expires_30_days.png"
                }
                className="w-6 h-6 object-fill"
              />
              <span className="text-primary-normal text-base font-medium">
                {detailData?.customerPhone}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-[#131211] text-lg font-bold ml-1">
            예약 정보
          </span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            <div className="flex flex-col items-start self-stretch">
              <span className="text-[#131211] text-base font-bold mb-[9px]">
                보험 정보
              </span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  사고접수번호
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.accidentNumber}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  보험사
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.company}
                </span>
              </div>
            </div>
            <div className="self-stretch bg-neutral-100 h-0.5"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-[#131211] text-base font-bold mb-[9px]">
                예약 기본 정보
              </span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  예약지역
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.location}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  입고 예약일
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.reservationDate}
                </span>
              </div>
            </div>
            <div className="self-stretch bg-neutral-100 h-0.5"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-[#131211] text-base font-bold mb-[9px]">
                차량 정보
              </span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  차량번호
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.carNumber}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  차종
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.carType}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  배기량
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {detailData?.carDisplacement}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-[#616161] text-base mr-1">
                  {"연식"}
                </span>
                <span className="flex-1 text-[#131211] text-base font-bold text-right">
                  {`${detailData?.carYear}년`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-[#131211] text-lg font-bold ml-1">
            히스토리
          </span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            {detailData?.reservationDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">
                    예약확정
                  </span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {detailData?.reservationDate}
                  </span>
                </div>
              </div>
            )}

            {detailData?.inDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">
                    차량입고
                  </span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-1">
                    {detailData?.inDate}
                  </span>
                </div>
              </div>
            )}

            {detailData?.startDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">
                    수리시작
                  </span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-0.5">
                    {detailData?.startDate}
                  </span>
                </div>
              </div>
            )}

            {detailData?.endDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">
                    수리완료
                  </span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {detailData?.endDate}
                  </span>
                </div>
              </div>
            )}

            {detailData?.outDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">
                    차량출고
                  </span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {detailData?.outDate}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 청구 완료 버튼 */}
      <button
        className="flex flex-col items-center self-stretch bg-[#131211] text-left py-3 my-4 mx-5 rounded-lg border-0"
        onClick={() => alert("Pressed!")}
      >
        <div className="flex flex-col items-center pb-[1px]">
          <span className="text-white text-base font-bold">{"청구 완료"}</span>
        </div>
      </button>
    </>
  );
}
