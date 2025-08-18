"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import MainButton from "../common/MainButton";

interface CalendarSelectModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: (date: string, time: string) => void;
}

// 공휴일 데이터 타입 정의
interface HolidayItem {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
}

interface HolidayResponse {
  result: boolean;
  code: string;
  message: string;
  data: {
    rawXml: string;
  };
}

export default function CalendarSelectModal({
  title,
  isOpen,
  onClose,
  onClickConfirm,
}: CalendarSelectModalProps) {
  // Hook들을 항상 최상위에서 호출
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [holidays, setHolidays] = useState<HolidayItem[]>([]);

  // 공휴일 데이터 가져오기
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = currentMonth.year();
        const response = await fetch(
          `https://api.insurtech.co.kr/common/holidays?solYear=${year}`
        );
        const data: HolidayResponse = await response.json();

        if (data.result && data.data.rawXml) {
          // XML 문자열을 파싱하여 공휴일 데이터 추출
          const xmlData = JSON.parse(data.data.rawXml);
          const holidayItems = xmlData.response.body.items.item;

          if (Array.isArray(holidayItems)) {
            setHolidays(holidayItems);
          }
        }
      } catch (error) {
        console.error("공휴일 데이터를 가져오는데 실패했습니다:", error);
        // 에러 발생 시 기본 공휴일 사용
        setHolidays([]);
      }
    };

    fetchHolidays();
  }, [currentMonth.year()]);

  // 월 변경 함수 - dayjs 사용
  const changeMonth = (direction: number) => {
    const newMonth = currentMonth.add(direction, "month");
    setCurrentMonth(newMonth);
  };

  // 캘린더 날짜 생성 - dayjs 사용 (수정됨)
  const generateCalendarDays = () => {
    const firstDayOfMonth = currentMonth.startOf("month");
    const lastDayOfMonth = currentMonth.endOf("month");

    // 해당 월의 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
    const firstDayWeekday = firstDayOfMonth.day();

    // 이전 달의 마지막 날들 (빈 칸으로 표시)
    const prevMonthDays = [];
    if (firstDayWeekday > 0) {
      const prevMonth = currentMonth.subtract(1, "month");
      const daysInPrevMonth = prevMonth.daysInMonth();
      for (let i = firstDayWeekday - 1; i >= 0; i--) {
        prevMonthDays.push({
          day: daysInPrevMonth - i,
          isCurrentMonth: false,
          isPrevMonth: true,
        });
      }
    }

    // 현재 월의 날들
    const currentMonthDays = [];
    for (let i = 1; i <= lastDayOfMonth.date(); i++) {
      currentMonthDays.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false,
      });
    }

    // 다음 달의 첫 번째 날들 (빈 칸으로 표시)
    const nextMonthDays = [];
    const totalCells = 42; // 6주 x 7일
    const remainingCells =
      totalCells - (prevMonthDays.length + currentMonthDays.length);
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false,
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // 날짜 비활성화 여부 확인 - dayjs 사용 (수정됨)
  const isDateDisabled = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return true;

    const date = currentMonth.date(day);
    const today = dayjs();

    // 오늘 이전 날짜인지 확인
    const isPastDate = date.isBefore(today, "day");

    // 주말인지 확인 (토요일: 6, 일요일: 0)
    const isWeekend = date.day() === 0 || date.day() === 6;

    // 공휴일인지 확인 (API 데이터 사용)
    const dateString = date.format("YYYYMMDD");
    const isPublicHoliday = holidays.some(
      (holiday) => holiday.locdate.toString() === dateString
    );

    return isPastDate || isWeekend || isPublicHoliday;
  };

  // 휴일 여부 확인 - API 데이터 사용 (수정됨)
  const isHoliday = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return false;

    const date = currentMonth.date(day);

    // 주말인지 확인
    const isWeekend = date.day() === 0 || date.day() === 6;

    // API에서 가져온 공휴일인지 확인
    const dateString = date.format("YYYYMMDD");
    const isPublicHoliday = holidays.some(
      (holiday) => holiday.locdate.toString() === dateString
    );

    return isWeekend || isPublicHoliday;
  };

  // 휴일 이름 가져오기 - API 데이터 사용 (수정됨)
  const getHolidayName = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return "";

    const date = currentMonth.date(day);

    // 주말 확인
    if (date.day() === 0) return "일요일";
    if (date.day() === 6) return "토요일";

    // API에서 가져온 공휴일 확인
    const dateString = date.format("YYYYMMDD");
    const holiday = holidays.find((h) => h.locdate.toString() === dateString);

    return holiday ? holiday.dateName : "";
  };

  // 날짜 선택 처리 - dayjs 사용 (수정됨)
  const handleDateSelect = (day: number, isCurrentMonth: boolean) => {
    if (day && isCurrentMonth) {
      setSelectedDate(currentMonth.date(day));
    }
  };

  const handleTimeSelect = (time: string, index: number) => {
    const newTimes = [...selectedTimes];
    newTimes[index] = time;
    setSelectedTimes(newTimes);
  };

  const timeSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
  ];

  const onClickClose = () => {
    //값 모두 초기화
    setSelectedDate(null);
    setSelectedTimes([]);
    setCurrentMonth(dayjs());

    onClose();
  };

  // 조건부 렌더링을 return 문에서 처리
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-end justify-center">
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" />

        <div className="relative w-full max-w-md max-h-[80vh] transform transition-transform duration-300 ease-out translate-y-full animate-slide-up px-2 bg-bg-normal rounded-t-2xl overflow-hidden">
          <div className="w-full left-0 inline-flex flex-col justify-start items-center px-4 max-h-[80vh] overflow-y-auto">
            {/* 헤더 섹션 */}
            <div className="w-full flex flex-col justify-start items-center sticky top-0 bg-bg-normal">
              {/* 핸들바 */}
              <div className="self-stretch h-3 flex flex-col justify-end items-center">
                <div className="w-10 h-[5px] bg-neutral-200 rounded-full" />
              </div>

              {/* 헤더 */}
              <div className="self-stretch py-4 inline-flex justify-center items-start">
                <div className="flex-1 flex justify-between items-start">
                  <div className="flex-1 justify-center text-neutral-800 text-[17px] font-semibold">
                    {title}
                  </div>

                  <button
                    className="w-6 h-6 relative overflow-hidden"
                    onClick={onClickClose}
                  >
                    <img src={"/images/icon/ic_x-line.svg"} />
                  </button>
                </div>
              </div>
            </div>

            {/* 안내 섹션 */}
            <div className="self-stretch px-4 py-2 bg-bg-alternative rounded-lg justify-center items-center">
              <div className="flex-1 justify-start text-secondary-normal text-sm font-regular">
                날짜와 시간은 요청 보험사에 실시간 전달되며, 청구·정산 시
                참고됩니다. 정확히 입력해 주세요.
              </div>
            </div>

            {/* 캘린더 섹션 */}
            <div className="mt-5">
              <div className="">
                {/* 예약일 */}
                <div className="">
                  {/* Calendar */}
                  <div className="mb-4">
                    <div className="flex flex-row items-center justify-center gap-x-16 mb-4 font-semibold">
                      <button onClick={() => changeMonth(-1)} className="">
                        <img
                          src="/images/icon/ic_arrow-left-2.svg"
                          alt="prev"
                          className="w-6 h-6"
                        />
                      </button>

                      <div className="flex items-center justify-center">
                        <span className="font-medium text-neutral-800 text-base text-center">
                          {currentMonth.year()}년 {currentMonth.month() + 1}월
                        </span>
                      </div>

                      <button onClick={() => changeMonth(1)} className="">
                        <img
                          src="/images/icon/ic_arrow-right-2.svg"
                          alt=""
                          className="w-6 h-6"
                        />
                      </button>
                    </div>

                    {/* Calendar header */}
                    <div className="grid grid-cols-7 mb-2 text-center">
                      {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                        <div
                          key={day}
                          className="font-medium text-primary-normal text-base"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 mb-2">
                      {generateCalendarDays().map((dateInfo, index) => {
                        const { day, isCurrentMonth, isPrevMonth } = dateInfo;

                        const isSelectedDay =
                          selectedDate &&
                          selectedDate.date() === day &&
                          selectedDate.month() === currentMonth.month() &&
                          selectedDate.year() === currentMonth.year() &&
                          isCurrentMonth;

                        const isHolidayDay = isHoliday(day, isCurrentMonth);
                        const holidayName = getHolidayName(day, isCurrentMonth);
                        const isDisabled = isDateDisabled(day, isCurrentMonth);

                        return (
                          <button
                            key={index}
                            className={`h-11 flex items-center justify-center rounded-[10px] text-base font-medium ${
                              isSelectedDay
                                ? "bg-secondary-bg text-line-primary border border-line-primary font-semibold"
                                : !isCurrentMonth
                                ? "text-neutral-300 cursor-default"
                                : isDisabled
                                ? "text-neutral-300 cursor-not-allowed"
                                : isHolidayDay
                                ? "bg-secondary-bg"
                                : "hover:bg-neutral-100 text-primary-normal"
                            }`}
                            onClick={() =>
                              handleDateSelect(day, isCurrentMonth)
                            }
                            disabled={!isCurrentMonth || isDisabled}
                            title={
                              isHolidayDay
                                ? holidayName
                                : isDisabled
                                ? "선택할 수 없는 날짜입니다"
                                : ""
                            }
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>

                    {/* 시간 선택 섹션 */}
                    <div>
                      <div className="mb-2 text-primary-normal font-medium text-base">
                        오전
                      </div>
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {timeSlots
                          .filter((time) => parseInt(time) < 12)
                          .map((time) => (
                            <button
                              key={time}
                              className={`p-2 rounded-[10px] border ${
                                selectedTimes[0] === time
                                  ? "bg-secondary-bg text-line-primary border border-line-primary font-semibold"
                                  : "border-line-normal text-primary-neutral"
                              }`}
                              onClick={() => handleTimeSelect(time, 0)}
                            >
                              {time}
                            </button>
                          ))}
                      </div>

                      <div className="mb-2 text-primary-normal font-medium text-base">
                        오후
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {timeSlots
                          .filter((time) => parseInt(time) >= 12)
                          .map((time) => (
                            <button
                              key={time}
                              className={`p-2 rounded-[10px] border ${
                                selectedTimes[0] === time
                                  ? "bg-secondary-bg text-line-primary border border-line-primary font-semibold"
                                  : "border-line-normal text-primary-neutral"
                              }`}
                              onClick={() => handleTimeSelect(time, 0)}
                            >
                              {time}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="py-4 sticky bottom-0 bg-bg-normal w-full">
              <div className="flex justify-center">
                <MainButton
                  text="완료"
                  onClick={() =>
                    onClickConfirm(
                      selectedDate?.format("YYYY-MM-DD") || "",
                      selectedTimes[0] || ""
                    )
                  }
                  disabled={!selectedDate || !selectedTimes[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
