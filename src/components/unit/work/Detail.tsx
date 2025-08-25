"use client";

import MainButton from "@/components/common/MainButton";
import TextButton from "@/components/common/TextButton";
import AccountModal from "@/components/modal/AccountModal";
import CalendarSelectModal from "@/components/modal/CalendarSelectModal";
import CancelSelectModal from "@/components/modal/CancelSelectModal";
import { useLoadingStore } from "@/store/loading";
import { useMyWorkStore } from "@/store/mywork";
import { useToastStore } from "@/store/toast";
import { sleep, statusColor } from "@/utils/util";
import dayjs from "dayjs";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StatusBarCard from "./elements/StatusBarCard";
import ComplatedCard from "./elements/ComplatedCard";

export default function WorkDetail() {
  const { myWorkData, updateMyWorkData, deleteMyWorkData, getMyWorkData } = useMyWorkStore();

  const params = useParams();
  const searchParams = useSearchParams();
  const id = Number(params.id);
  const detailData = myWorkData.find(data => data.id === id);
  const router = useRouter();

  const { showSuccess } = useToastStore();
  const { setIsLoading } = useLoadingStore();

  const [cancelSelectModalOpen, setCancelSelectModalOpen] = useState(false);
  const [calendarSelectModalOpen, setCalendarSelectModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const [mainButtonText, setMainButtonText] = useState("입고 완료");
  const [calendarText, setCalendarText] = useState("입고가 완료된");

  const [workData, setWorkData] = useState(detailData);
  const [workStatus, setWorkStatus] = useState(detailData?.status);

  useEffect(() => {
    const loading = async () => {
      setIsLoading(true);
      await sleep(300);
      setIsLoading(false);
    };
    loading();

    //prarams 수정

    router.replace(`/work/${id}?status=${workData?.status}`);
  }, [workData]);

  useEffect(() => {
    switch (workStatus) {
      case "입고확정":
        setMainButtonText("입고 완료");
        break;
      case "차량입고":
        setMainButtonText("수리 시작");
        break;
      case "수리중":
        setMainButtonText("수리 완료");
        break;
      case "수리완료":
        setMainButtonText("차량 출고 완료");
        break;
      case "차량출고":
        setMainButtonText("청구 완료");
        break;
      case "청구완료":
        setMainButtonText("청구 완료");
        break;
    }
  }, [workStatus]);

  useEffect(() => {
    switch (workStatus) {
      case "입고확정":
        setCalendarText("입고가 완료된");
        break;
      case "차량입고":
        setCalendarText("수리가 시작된");
        break;
      case "수리중":
        setCalendarText("수리가 완료된");
        break;
      case "수리완료":
        setCalendarText("출고가 완료된");
        break;
    }
  }, [workStatus]);

  //메인 버튼 클릭 이벤트
  const onClickMainButton = () => {
    if (workStatus === "차량출고") {
      setAccountModalOpen(true);
    } else {
      setCalendarSelectModalOpen(true);
    }
  };

  //입고 확정 취소 이벤트
  const onClickCancelConfirm = () => {
    setCancelSelectModalOpen(false);
    deleteMyWorkData(id);

    showSuccess("입고 확정이 취소되었어요.");
    router.back();
  };

  //달력 확정 이벤트
  const onClickCalendarConfirm = (date: string, time: string) => {
    const status = workStatus;

    if (status === "입고확정") {
      updateMyWorkData(id, {
        inDate: date,
        inTime: time,
        status: "차량입고",
      });
      showSuccess("차량 입고가 완료되었어요.");
    } else if (status === "차량입고") {
      updateMyWorkData(id, {
        startDate: date,
        startTime: time,
        status: "수리중",
      });
      showSuccess("차량 수리가 시작되었어요.");
    } else if (status === "수리중") {
      updateMyWorkData(id, {
        endDate: date,
        endTime: time,
        status: "수리완료",
      });
      showSuccess("차량 수리가 완료되었어요.");
    } else if (status === "수리완료") {
      updateMyWorkData(id, {
        outDate: date,
        outTime: time,
        status: "차량출고",
      });
      showSuccess("차량 출고가 완료되었어요.");
    }

    const data = getMyWorkData(id);
    setWorkData(data);
    setWorkStatus(data?.status);
    setCalendarSelectModalOpen(false);
  };

  //청구 금액 이벤트
  const onClickAccountConfirm = (price: number, laborPrice: number, partsPrice: number) => {
    updateMyWorkData(id, {
      status: "청구완료",
      claimDate: dayjs().format("YYYY.MM.DD"),
      price: price,
      laborPrice: laborPrice,
      partsPrice: partsPrice,
    });

    showSuccess("청구가 처리가 완료되었어요.");
    setAccountModalOpen(false);
    setWorkData(getMyWorkData(id));
    setWorkStatus(getMyWorkData(id)?.status);
  };

  return (
    <>
      <div className="flex flex-col self-stretch bg-bg-main">
        <div className="flex flex-col items-start self-stretch bg-neutral-100 py-4 gap-4">
          {/* 지역, 상태 배찌 */}
          <div className="flex items-start ml-5 gap-2">
            <div className="flex flex-col shrink-0 items-start bg-bg-normal text-left py-1 px-2 rounded-md border border-solid border-secondary-normal">
              <span className="text-secondary-normal text-xs font-medium">{workData?.location}</span>
            </div>
            <div
              className="flex flex-col shrink-0 items-start text-left py-1 px-2 rounded-md border-0"
              style={{
                backgroundColor: statusColor(workStatus as string)?.bg,
                color: statusColor(workStatus as string)?.text,
              }}
            >
              <span className="text-xs font-medium">{workStatus as keyof typeof workStatus}</span>
            </div>
          </div>

          {/* 보험사, 차량명 */}
          <div className="flex flex-col items-start self-stretch mx-5">
            <span className="text-secondary-normal text-[15px] font-semibold">{workData?.company}</span>
            <span className="text-primary-normal text-[22px] font-semibold">{workData?.carName}</span>
          </div>

          {/*상태바 카드*/}
          {workStatus === "청구완료" ? <ComplatedCard data={workData} /> : <StatusBarCard data={workData} />}
        </div>
      </div>

      <div className="flex flex-col self-stretch bg-bg-normal py-4 gap-8">
        {/* 고객 정보 */}
        {workStatus !== "청구완료" && (
          <div className="flex flex-col items-start self-stretch bg-neutral-50 py-4 mx-5 gap-4 rounded-xl p-4">
            <span className="text-primary-normal text-[17px] font-semibold">고객 정보</span>
            <div className="flex w-full items-center justify-between">
              <span className="text-neutral-600 text-base font-regular">고객전화번호</span>
              <div className="flex items-center gap-1">
                <img src={"/images/img/img_call-orange.png"} className="w-6 h-6 object-fill" />
                <span className="text-primary-normal text-base font-medium">{workData?.customerPhone}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-primary-normal text-lg font-semibold ml-1">예약 정보</span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            <div className="flex flex-col items-start self-stretch">
              <span className="text-primary-normal text-base font-medium mb-[9px]">보험 정보</span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">사고접수번호</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {workData?.accidentNumber}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">보험사</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">{workData?.company}</span>
              </div>
            </div>
            <div className="self-stretch bg-neutral-100 h-0.5"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-[#131211] text-base font-bold mb-[9px]">예약 기본 정보</span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">예약지역</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {workData?.location}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">입고 예약일</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {workData?.reservationDate}
                </span>
              </div>
            </div>
            <div className="self-stretch bg-neutral-100 h-0.5"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-[#131211] text-base font-bold mb-[9px]">차량 정보</span>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">차량번호</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {workData?.carNumber}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">차종</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">{workData?.carType}</span>
              </div>
              <div className="flex justify-between items-center self-stretch mb-2">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">배기량</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {workData?.carDisplacement}
                </span>
              </div>
              <div className="flex justify-between items-center self-stretch">
                <span className="flex-1 text-neutral-700 text-base mr-1 font-regular">{"연식"}</span>
                <span className="flex-1 text-primary-normal text-base font-medium text-right">
                  {`${workData?.carYear}년`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-primary-normal text-lg font-semibold ml-1">히스토리</span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            {workData?.reservationDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">예약확정</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {workData?.reservationDate}
                  </span>
                </div>
              </div>
            )}

            {workData?.inDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">차량입고</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-1">
                    {workData?.inDate.replaceAll("-", ".")} {workData?.inTime}
                  </span>
                </div>
              </div>
            )}

            {workData?.startDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">수리시작</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-0.5">
                    {workData?.startDate.replaceAll("-", ".")} {workData?.startTime}
                  </span>
                </div>
              </div>
            )}

            {workData?.endDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">수리완료</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {workData?.endDate.replaceAll("-", ".")} {workData?.endTime}
                  </span>
                </div>
              </div>
            )}

            {workData?.outDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">차량출고</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {workData?.outDate.replaceAll("-", ".")} {workData?.outTime}
                  </span>
                </div>
              </div>
            )}

            {workData?.claimDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">청구완료</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {workData?.claimDate.replaceAll("-", ".")} {workData?.outTime}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 청구 완료 버튼 */}
      <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center self-stretch mx-5 gap-1 rounded-xl bg-bg-normal pb-8 pt-4 ">
        <MainButton text={mainButtonText} onClick={onClickMainButton} disabled={workStatus === "청구완료"} />
        {workStatus === "입고확정" && (
          <TextButton text="입고 확정 취소" onClick={() => setCancelSelectModalOpen(true)} />
        )}
      </div>

      <CancelSelectModal
        isOpen={cancelSelectModalOpen}
        onClose={() => setCancelSelectModalOpen(false)}
        onClickConfirm={() => onClickCancelConfirm()}
      />

      <CalendarSelectModal
        title={`${calendarText} 날짜를 입력해 주세요.`}
        isOpen={calendarSelectModalOpen}
        onClose={() => setCalendarSelectModalOpen(false)}
        onClickConfirm={(date, time) => onClickCalendarConfirm(date, time)}
      />

      <AccountModal
        title="청구한 금액을 입력해 주세요."
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onClickConfirm={(price, laborPrice, partsPrice) => onClickAccountConfirm(price, laborPrice, partsPrice)}
      />
    </>
  );
}
