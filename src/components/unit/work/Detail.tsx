"use client";

import MainButton from "@/components/common/MainButton";
import TextButton from "@/components/common/TextButton";
import AccountModal from "@/components/modal/AccountModal";
import CalendarSelectModal from "@/components/modal/CalendarSelectModal";
import CancelSelectModal from "@/components/modal/CancelSelectModal";
import { useToastStore } from "@/store/toast";
import { formatDateTime, formatFaxNumber, formatPhoneNumber, getCarTypeText, statusColor } from "@/utils/util";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import StatusBarCard from "./elements/StatusBarCard";
import ComplatedCard from "./elements/ComplatedCard";
import {
  cancelWorkSchedule,
  completeBilling,
  completeCall,
  getWorkScheduleDetail,
  updateWorkScheduleStatus,
} from "@/api/work.api";
import { IWorkDetail, StatusChangeType } from "@/type/work.type";
import { WORK_STATUS } from "@/utils/enum";
import DetailInfoRow from "./elements/DetailInfoRow";
import { convertStatusToType, getStatusToastMessage, workSteps } from "@/utils/workStatus";
import CancelCard from "./elements/CancelCard";
import dayjs from "dayjs";
import CallGuideModal from "@/components/modal/CallGuideModal";
import { getComments, ICommentList } from "@/api/comments.api";
import { CommentsCard } from "./elements/CommentsCard";

export default function WorkDetail() {
  const params = useParams();
  const searchParams = useSearchParams();
  const detailStatus = searchParams.get("status") || "";
  const detailId = Number(params.id);
  const router = useRouter();

  const { showSuccess, showError } = useToastStore();

  const [cancelSelectModalOpen, setCancelSelectModalOpen] = useState(false);
  const [calendarSelectModalOpen, setCalendarSelectModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [callGuideModalOpen, setCallGuideModalOpen] = useState(false);

  const [mainButtonText, setMainButtonText] = useState("입고 완료");
  const [calendarText, setCalendarText] = useState("입고가 완료된");

  const [workData, setWorkData] = useState<IWorkDetail>();
  const [workStatus, setWorkStatus] = useState<string>(detailStatus);
  const [comments, setComments] = useState<ICommentList[]>([]);

  const isCancelled = useMemo(() => workStatus?.includes("CANCELLED"), [workStatus]);

  // 추가요청사항 로직
  const requestText = (workData?.customerAddReq || workData?.insuranceAddReq || "").trim();
  const hasRequest = Boolean(requestText.length > 0);

  useEffect(() => {
    fetchData();
    fetchComments();
    //스크롤 가장 위로
    window.scrollTo(0, 0);
  }, []);

  const fetchData = async () => {
    try {
      const newStatus = await fetchWorkData();
      setWorkStatus(newStatus);

      // URL 업데이트가 필요한 경우에만 수행
      if (newStatus !== detailStatus) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("status", newStatus);
        router.replace(`/work/${detailId}?${String(params)}`);
      }
      return newStatus;
    } catch (error) {
      console.error(error);
      showError("데이터를 불러오는데 실패했어요.");
      router.push(`/work?status=${detailStatus}`);
    }
  };

  const fetchWorkData = async () => {
    try {
      const res = await getWorkScheduleDetail(detailId);
      setWorkData(res);
      //새로 받은 상태 반환
      if (!res.accidentStatus) return "";
      return res.accidentStatus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComments(detailId);
      setComments(res || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    switch (workStatus) {
      case "CONFIRMED":
        setMainButtonText("입고 완료");
        break;
      case "ARRIVED":
        setMainButtonText("수리 시작");
        break;
      case "REPAIR_STARTED":
        setMainButtonText("수리 완료");
        break;
      case "REPAIR_COMPLETED":
        setMainButtonText("차량 출고 완료");
        break;
      case "RELEASED":
        setMainButtonText("청구 완료");
        break;
      case "BILLING_COMPLETED":
        setMainButtonText("청구 완료");
        break;
    }
  }, [workStatus]);

  useEffect(() => {
    switch (workStatus) {
      case "CONFIRMED":
        setCalendarText("입고가 완료된");
        break;
      case "ARRIVED":
        setCalendarText("수리가 시작된");
        break;
      case "REPAIR_STARTED":
        setCalendarText("수리가 완료된");
        break;
      case "REPAIR_COMPLETED":
        setCalendarText("출고가 완료된");
        break;
    }
  }, [workStatus]);

  //메인 버튼 클릭 이벤트
  const onClickMainButton = () => {
    if (workStatus === "RELEASED") {
      setAccountModalOpen(true);
    } else {
      setCalendarSelectModalOpen(true);
    }
  };

  //입고 확정 취소 이벤트
  const onClickCancelConfirm = async (abandonReason: string, etcReason: string, selectedValue: string) => {
    try {
      //기타 사유 입력 시 기타 사유 사용
      const cancelReason = selectedValue === "5" ? etcReason : abandonReason;
      await cancelWorkSchedule(detailId, { abandonReason: cancelReason });

      showSuccess("입고 확정이 포기되었어요.");
      goBack();
    } catch (error) {
      console.log(error);
      showError("이미 처리된 상태입니다.");
      await fetchData();
    }
  };

  //달력 확정 이벤트
  const onClickCalendarConfirm = async (date: string, time: string) => {
    const completedDate = `${date} ${time}:00`;

    //다음 상태 계산하기
    const currentIndex = workSteps.indexOf(workStatus);
    const nextStatus = workSteps[currentIndex + 1];
    const convertStatus = convertStatusToType(nextStatus);

    try {
      await updateWorkScheduleStatus(detailId, convertStatus as StatusChangeType, { completedDate });
      const newStatus = await fetchData();

      //상태 변경 후 toast 메세지 표시
      const toastMessage = getStatusToastMessage(newStatus);

      showSuccess(toastMessage || "상태 변경이 완료되었어요.");
    } catch (error) {
      console.log(error);
      showError("이미 처리된 상태입니다.");
      await fetchData();
    }

    setCalendarSelectModalOpen(false);
  };

  //청구 금액 이벤트
  const onClickAccountConfirm = async (price: number, laborPrice: number, partsPrice: number) => {
    try {
      await completeBilling(detailId, { laborPrice, partsPrice });
      setAccountModalOpen(false);
      await fetchData();

      showSuccess("청구 금액 입력이 완료되었어요.");
    } catch (error) {
      console.log(error);
      showError("이미 처리된 상태입니다.");
      await fetchData();
      setAccountModalOpen(false);
    }
  };

  //뒤로가기 이벤트
  const goBack = () => {
    router.push(`/work?status=${workStatus}`);
  };

  const onClickPhoneNumber = () => {
    setCallGuideModalOpen(true);
  };

  const onClickCallGuideConfirm = () => {
    setCallGuideModalOpen(false);
    if (workData?.tellNo) {
      // API 호출은 별도로 처리
      completeCall(detailId).catch(error => {
        console.log("통화 완료 처리 실패:", error);
      });

      // 전화 앱으로 이동
      window.location.href = `tel:${workData.tellNo}`;
    }
  };

  return (
    <>
      <div className="flex flex-col self-stretch bg-bg-main">
        <div className="flex flex-col items-start self-stretch bg-neutral-100 py-4 gap-4">
          {/* 지역, 상태 배찌 */}
          <div className="flex items-start ml-5 gap-2">
            <div className="flex flex-col shrink-0 items-start bg-bg-normal text-left py-1 px-2 rounded-md border border-solid border-line-primary">
              <span className="text-line-primary text-xs font-medium">{workData?.sigungu}</span>
            </div>
            <div
              className="flex flex-col shrink-0 items-start text-left py-1 px-2 rounded-md border-0"
              style={{
                backgroundColor: statusColor(workStatus as string)?.bg,
                color: statusColor(workStatus as string)?.text,
              }}
            >
              <span className="text-xs font-medium">{WORK_STATUS[workStatus as keyof typeof WORK_STATUS]}</span>
            </div>
          </div>

          {/* 보험사, 차량명 */}
          <div className="flex flex-col items-start self-stretch mx-5">
            <span className="text-secondary-normal text-[15px] font-semibold">{workData?.insuranceCompanyName}</span>
            <div className="flex items-center gap-2">
              <span className="text-primary-normal text-[22px] font-semibold">{workData?.carModel}</span>
              <span className="border border-solid border-neutral-neutral h-4"></span>
              <span className="text-primary-normal text-[22px] font-semibold"> {workData?.carNumber}</span>
            </div>
          </div>

          {/*상태바 카드*/}
          {workStatus === "BILLING_COMPLETED" ? (
            <ComplatedCard data={workData || ({} as IWorkDetail)} />
          ) : isCancelled ? (
            <CancelCard reason={workData?.accidentStatus || ""} />
          ) : (
            <StatusBarCard data={workData || ({} as IWorkDetail)} />
          )}
        </div>
      </div>

      <div className="flex flex-col self-stretch bg-bg-normal py-4 gap-8">
        {/* 고객 정보 */}
        {workStatus !== "BILLING_COMPLETED" && !isCancelled && (
          <div className="flex flex-col items-start self-stretch bg-neutral-50 py-4 mx-5 gap-4 rounded-xl p-4">
            <span className="text-primary-normal text-[17px] font-semibold">
              {workData?.accidentStatus === "CONFIRMED" ? "고객과 통화해 입고 일정을 확정하세요" : "고객 정보"}
            </span>
            <div className="flex w-full items-center justify-between">
              <div>
                <span className="text-neutral-600 text-base font-regular mr-2">전화번호</span>
                <span className="text-neutral-600 text-base font-regular">
                  {formatPhoneNumber(String(workData?.tellNo))}
                </span>
              </div>
              <button
                onClick={onClickPhoneNumber}
                className="flex items-center gap-1 bg-white px-3 py-2 rounded-full transition-colors cursor-pointer border border-solid border-[#FF934D]"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 object-fill"
                >
                  <path
                    d="M7.84987 2.70292L9.78687 2.11892C10.4261 1.92648 11.1136 1.97317 11.721 2.25028C12.3284 2.52738 12.8142 3.01597 13.0879 3.62492L14.4459 6.64492C14.6816 7.16884 14.7473 7.75342 14.6337 8.31659C14.5202 8.87976 14.2331 9.39323 13.8129 9.78492L11.7459 11.7109C11.4689 11.9739 11.6789 12.9989 12.6909 14.7529C13.7039 16.5079 14.4869 17.2019 14.8479 17.0939L17.5559 16.2659C18.1048 16.098 18.6925 16.1061 19.2366 16.289C19.7807 16.4719 20.2539 16.8205 20.5899 17.2859L22.5199 19.9609C22.9097 20.5011 23.0902 21.1644 23.0278 21.8276C22.9655 22.4908 22.6645 23.1089 22.1809 23.5669L20.6889 24.9799C20.2072 25.436 19.6132 25.7562 18.9674 25.9078C18.3216 26.0595 17.6472 26.0371 17.0129 25.8429C13.8869 24.8859 10.9919 22.0459 8.28887 17.3629C5.57987 12.6729 4.55687 8.71692 5.26987 5.48492C5.41367 4.83367 5.72856 4.23256 6.18206 3.74354C6.63557 3.25453 7.21129 2.89531 7.84987 2.70292Z"
                    fill="#ED6C00"
                  />
                </svg>
                <span className="text-[#ED6C00] text-sm font-medium">통화</span>
              </button>
            </div>
          </div>
        )}

        {/* 댓글 섹션 */}
        <div className="flex flex-col items-start self-stretch mx-5">
          <CommentsCard workId={detailId} comments={comments} />
        </div>

        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-primary-normal text-lg font-semibold ml-1">예약 정보</span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            <div className="flex flex-col items-start self-stretch">
              <span className="text-primary-normal text-base font-medium mb-2">보험 정보</span>
              <DetailInfoRow label="사고접수번호" value={workData?.insuranceClaimNo || "-"} />
              <DetailInfoRow label="보험사" value={workData?.insuranceCompanyName || "-"} />
              <DetailInfoRow label="사고구분" value={getCarTypeText(workData?.coverageType || "-")} />
              <DetailInfoRow label="예상과실율" value={`${workData?.faultRate ? `${workData?.faultRate}%` : "-"}`} />
              {!isCancelled && <DetailInfoRow label="보험담당자" value={workData?.contactManagerName || "-"} />}
              {!isCancelled && (
                <DetailInfoRow
                  label="보험담당자 연락처"
                  value={formatPhoneNumber(String(workData?.contactManagerPhone || "")) || "-"}
                />
              )}
              {!isCancelled && (
                <DetailInfoRow
                  label="보험사 팩스번호"
                  value={formatFaxNumber(String(workData?.contactManagerFax || "")) || "-"}
                />
              )}
            </div>
            <div className="self-stretch bg-neutral-100 h-0.5 mb-[16px]"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-primary-normal text-base font-medium mb-2">예약 기본 정보</span>
              <DetailInfoRow label="예약지역" value={workData?.sigungu || "-"} />
              <DetailInfoRow label="입고 예약일" value={workData?.reservationDate || "-"} />
            </div>
              <div className="flex flex-col items-start self-stretch">
                <div className="w-full px-3 py-2 bg-bg-alternative rounded-lg outline outline-1 outline-offset-[-1px] outline-line-neutral inline-flex flex-col items-start gap-1">
                  <div className="text-neutral-700 text-sm leading-5 tracking-tight">추가 요청사항</div>
                  <div
                    className={`self-stretch text-sm leading-5 tracking-tight whitespace-pre-wrap break-words ${hasRequest ? "text-primary-normal" : "text-primary-assistive"}`}
                  >
                    {hasRequest ? requestText : "요청사항이 없습니다."}
                  </div>
                </div>
              </div>
            <div className="self-stretch bg-neutral-100 h-0.5 mt-[12px] mb-[16px]"></div>
            <div className="flex flex-col items-start self-stretch">
              <span className="text-primary-normal text-base font-medium mb-2">차량 정보</span>
              <DetailInfoRow label="차량번호" value={workData?.carNumber || "-"} />
              <DetailInfoRow label="차종" value={workData?.carModel || ""} />
              <DetailInfoRow label="배기량" value={workData?.engineDisplacement || ""} />
              <DetailInfoRow label="연식" value={workData?.carModelYear || ""} />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start self-stretch mx-5 gap-4">
          <span className="text-primary-normal text-lg font-semibold ml-1">히스토리</span>
          <div className="flex flex-col self-stretch mx-1 gap-2">
            {workData?.confirmedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">예약확정</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {formatDateTime(workData.confirmedDate)}
                  </span>
                </div>
              </div>
            )}

            {workData?.arrivedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">차량입고</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-1">
                    {formatDateTime(workData.arrivedDate)}
                  </span>
                </div>
              </div>
            )}

            {workData?.repairStartedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">수리시작</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-0.5">
                    {formatDateTime(workData.repairStartedDate)}
                  </span>
                </div>
              </div>
            )}

            {workData?.repairCompletedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">수리완료</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {formatDateTime(workData.repairCompletedDate)}
                  </span>
                </div>
              </div>
            )}

            {workData?.releasedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">차량출고</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {formatDateTime(workData.releasedDate)}
                  </span>
                </div>
              </div>
            )}

            {workData?.billingCompletedDate && (
              <div className="flex items-center self-stretch gap-2.5">
                <div className="w-1 h-1 object-fill bg-neutral-300 rounded-full" />
                <div className="flex flex-1 justify-between items-center">
                  <span className="flex-1 text-neutral-800 text-base mr-1 font-regular">종결</span>
                  <span className="flex-1 text-neutral-700 text-[15px] text-right font-regular mr-[3px]">
                    {formatDateTime(workData.billingCompletedDate)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 청구 완료 버튼 */}
      <div className="sticky bottom-0 left-0 right-0 flex flex-col items-center self-stretch mx-5 gap-1 rounded-xl bg-bg-normal pb-4 pt-4 ">
        {!isCancelled && (
          <MainButton text={mainButtonText} onClick={onClickMainButton} disabled={workStatus === "BILLING_COMPLETED"} />
        )}
        {workStatus === "CONFIRMED" && (
          <TextButton text="입고 확정 포기" onClick={() => setCancelSelectModalOpen(true)} />
        )}
      </div>

      <CancelSelectModal
        isOpen={cancelSelectModalOpen}
        onClose={() => setCancelSelectModalOpen(false)}
        onClickConfirm={(abandonReason, etcReason, selectedValue) =>
          onClickCancelConfirm(abandonReason, etcReason, selectedValue)
        }
      />

      <CalendarSelectModal
        title={`${calendarText} 날짜를 입력해 주세요`}
        isOpen={calendarSelectModalOpen}
        onClose={() => setCalendarSelectModalOpen(false)}
        onClickConfirm={(date, time) => onClickCalendarConfirm(date, time)}
        minTime={(() => {
          // 상태별 참조해야 할 날짜 매핑
          const statusTimeMap = {
            ARRIVED: workData?.arrivedDate,
            REPAIR_STARTED: workData?.repairStartedDate,
            REPAIR_COMPLETED: workData?.repairCompletedDate,
            RELEASED: workData?.releasedDate,
          };

          const targetTime = statusTimeMap[workStatus as keyof typeof statusTimeMap];

          return targetTime ? formatDateTime(targetTime, "HH:mm") : "";
        })()}
        minDate={(() => {
          // CONFIRMED 상태일 때 특별한 로직 적용
          if (workStatus === "CONFIRMED" && workData?.confirmedDate) {
            const confirmedDate = dayjs(workData.confirmedDate);
            const today = dayjs();
            const diffDays = today.diff(confirmedDate, "day");

            // confirmedDate와 today 간격이 5일 초과 시, 최근 5일만 선택 가능
            if (diffDays > 5) {
              return today.subtract(4, "day").format("YYYY-MM-DD");
            }

            // 5일 이하면 confirmedDate부터 선택 가능
            return confirmedDate.format("YYYY-MM-DD");
          }

          // 다른 상태들의 기존 로직
          const statusDateMap = {
            ARRIVED: workData?.arrivedDate,
            REPAIR_STARTED: workData?.repairStartedDate,
            REPAIR_COMPLETED: workData?.repairCompletedDate,
            RELEASED: workData?.releasedDate,
          };

          const targetDate = statusDateMap[workStatus as keyof typeof statusDateMap];
          return targetDate ? formatDateTime(targetDate, "YYYYMMDD") : "";
        })()}
      />

      <AccountModal
        title="청구한 금액을 입력해 주세요"
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onClickConfirm={(price, laborPrice, partsPrice) => onClickAccountConfirm(price, laborPrice, partsPrice)}
      />

      <CallGuideModal
        title="고객 통화 예시 가이드"
        insuranceCompanyName={workData?.insuranceCompanyName || ""}
        isOpen={callGuideModalOpen}
        onClose={() => setCallGuideModalOpen(false)}
        onClickConfirm={onClickCallGuideConfirm}
      />
    </>
  );
}
