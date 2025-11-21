"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getComments, postComment, readComment, ICommentList } from "@/api/comments.api";
import { getWorkScheduleDetail } from "@/api/work.api";
import type { IWorkDetail } from "@/type/work.type";
import { useToastStore } from "@/store/toast";
import { WORK_STATUS } from "@/utils/enum";
import { statusColor, formatDateTime } from "@/utils/util";
import dayjs from "dayjs";

// 상수 정의
const COMMENT_POLLING_INTERVAL = 10000; // 10초 - 폴링 간격
const COMMENT_SUBMIT_COOLDOWN_MS = 1700; // 1.7초 - 댓글 전송 후 입력 비활성화 시간
const BILLING_WINDOW_DAYS = 30; // 청구완료 후 메시지 작성 가능 기간 (일)
const BILLING_WINDOW_MS = BILLING_WINDOW_DAYS * 24 * 60 * 60 * 1000; // 밀리초로 변환
const POLLING_AUTO_STOP_MS = 80000; // 3분 - 폴링 자동 중지 시간

export default function WorkComments() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const workId = Number(params.id);
  const status = searchParams.get("status") || "";

  // 전역 상태 관리
  const { showError } = useToastStore(); // 에러 토스트 메시지 표시

  // 로컬 상태 관리
  const [comments, setComments] = useState<ICommentList[]>([]);
  const [workDetail, setWorkDetail] = useState<IWorkDetail | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [pollingKey, setPollingKey] = useState(0); // 폴링 재시작을 위한 키

  // Ref 관리 (렌더링과 무관한 값 저장)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastReadCommentIdRef = useRef<number | null>(null);
  const isMarkingReadRef = useRef(false);
  const shouldScrollRef = useRef(true);
  const isInitialLoadRef = useRef(true);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollingStartTimeRef = useRef<number | null>(null); // 폴링 시작 시간 추적

  // 유틸리티 함수
  // 댓글 목록 맨 아래로 스크롤
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  // 데이터 조회 함수
  // 작업 상세 정보 조회
  const fetchWorkDetail = useCallback(async () => {
    try {
      const response = await getWorkScheduleDetail(workId);
      setWorkDetail(response);
    } catch (error) {
      console.error(error);
      showError("작업 정보를 불러올 수 없습니다.");
    }
  }, [workId, showError]);

  // 전체 댓글 조회 (unreadOnly=false)
  // - false: 전체 댓글 조회
  // - 초기 로드 시 사용
  // - 기존 댓글 목록을 전체 교체
  const fetchAllComments = useCallback(
    async (showErrorMessage = false) => {
      try {
        const response = await getComments(workId, false);
        const data = response || [];
        setComments(data);
        return data;
      } catch (error) {
        console.error(error);
        if (showErrorMessage) {
          showError("댓글을 불러올 수 없습니다.");
        }
        return [];
      }
    },
    [workId, showError]
  );

  // 마지막 읽음 이후 댓글만 조회 (unreadOnly=true)
  // - unreadOnly=true: 마지막 읽음 이후 댓글만 조회하여 기존 리스트에 추가
  // - skipLoading=true: 폴링 시 로딩바 표시 안 함
  // - 임시 댓글(음수 ID) 필터링: Optimistic Update로 추가된 임시 댓글은 제거하고 실제 댓글만 유지
  // - 중복 체크: 백엔드에서 중복 없이 보내주지만, 댓글 전송과 폴링이 겹치는 경우를 대비해 클라이언트에서도 중복 체크
  const fetchUnreadComments = useCallback(async () => {
    try {
      const response = await getComments(workId, true, true); // unreadOnly=true, skipLoading=true
      if (response && response.length > 0) {
        setComments(prev => {
          // 임시 댓글(음수 ID) 제거하고 실제 댓글만 유지
          const filteredPrev = prev.filter(comment => comment.id > 0);
          // 기존 댓글 ID Set 생성 (중복 체크용)
          const existingIds = new Set(filteredPrev.map(comment => comment.id));
          // 중복되지 않은 새 댓글만 필터링
          const newComments = response.filter((comment: ICommentList) => !existingIds.has(comment.id));
          // 중복되지 않은 새 댓글만 추가
          return newComments.length > 0 ? [...filteredPrev, ...newComments] : filteredPrev;
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, [workId]);

  // useEffect 1: 초기 데이터 로드
  // - 컴포넌트 마운트 시 작업 상세 정보와 전체 댓글 로드 (unreadOnly=false)
  useEffect(() => {
    fetchWorkDetail();
    fetchAllComments(true);
  }, [fetchWorkDetail, fetchAllComments]);

  // useEffect 2: 폴링 설정 (3분 후 자동 중지)
  // - 10초마다 마지막 읽음 이후 댓글만 조회하여 기존 리스트에 추가 (unreadOnly=true)
  // - 3분(180초) 경과 시 자동으로 폴링 중지
  // - pollingKey 변경 시 폴링 재시작 (댓글 작성 후 사용)
  useEffect(() => {
    if (!workId) return;

    // 폴링 시작 시간 기록
    pollingStartTimeRef.current = dayjs().valueOf();

    pollingIntervalRef.current = setInterval(() => {
      // 경과 시간 체크 (3분 = 180,000ms)
      const elapsedTime = dayjs().valueOf() - (pollingStartTimeRef.current ?? 0);

      if (elapsedTime >= POLLING_AUTO_STOP_MS) {
        // 3분 이상 경과 시 폴링 중지
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = null;
          pollingStartTimeRef.current = null;
        }
        return;
      }

      // 폴링 실행
      fetchUnreadComments();
    }, COMMENT_POLLING_INTERVAL);

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
      pollingStartTimeRef.current = null;
    };
  }, [workId, fetchUnreadComments, pollingKey]); // pollingKey 변경 시 재시작

  // 계산된 값 (useMemo)
  // 최신 댓글 ID 계산
  // - 읽음 처리 API 호출 시 사용
  // - 실제 댓글만 계산 (안전성을 위해 양수 ID만 필터링)
  const latestRealCommentId = useMemo(() => {
    // 실제 댓글만 필터링 (양수 ID만 유지)
    const realComments = comments.filter(comment => comment.id > 0);
    if (realComments.length === 0) return null;
    return Math.max(...realComments.map(comment => comment.id));
  }, [comments]);

  // useEffect 3: 댓글 읽음 처리
  // - 최신 댓글 ID가 변경될 때마다 읽음 처리 API 호출
  // - 중복 호출 방지: 이미 읽은 댓글이거나 현재 처리 중이면 스킵
  // - 성공 시 lastReadCommentIdRef에 최신 ID 저장하여 다음 호출 시 중복 방지
  useEffect(() => {
    if (!workId || latestRealCommentId == null) return;
    if (lastReadCommentIdRef.current != null && latestRealCommentId <= lastReadCommentIdRef.current) return;
    if (isMarkingReadRef.current) return;

    isMarkingReadRef.current = true;
    void readComment(workId, { lastReadCommentId: latestRealCommentId })
      .then(() => {
        lastReadCommentIdRef.current = latestRealCommentId;
      })
      .catch(error => {
        console.error("읽음 처리 실패:", error);
      })
      .finally(() => {
        isMarkingReadRef.current = false;
      });
  }, [workId, latestRealCommentId]);

  // useEffect 4: 스크롤 제어
  // - 댓글 목록이 변경될 때 자동 스크롤 처리
  // - 초기 로드: DOM 렌더링 대기 후 스크롤 (100ms 지연)
  // - 댓글 작성 후: 즉시 스크롤
  // - 폴링으로 인한 댓글 추가 시에는 스크롤하지 않음 (shouldScrollRef로 제어)
  useEffect(() => {
    // 초기 로드 시 또는 댓글 작성 시 스크롤
    if (shouldScrollRef.current && comments.length > 0) {
      if (isInitialLoadRef.current) {
        scrollToBottom("auto"); // 최초 진입 시 즉시 맨 아래로 이동
        isInitialLoadRef.current = false;
      } else {
        scrollToBottom();
      }
      shouldScrollRef.current = false;
    }
  }, [comments]);

  // 댓글 입력 제어 로직 (useMemo)
  // 작업 상태에 따라 댓글 입력 가능 여부와 안내 메시지 결정
  // 우선순위:
  // 1. 종결된 건 → 입력 불가
  // 2. 청구완료 + 30일 경과 → 입력 불가
  // 3. 청구완료 + 30일 이내 → 입력 가능 + 안내 메시지
  // 4. 일반 → 입력 가능 + 안내 메시지
  const { isInputDisabled, controlMessage } = useMemo(() => {
    if (!workDetail) {
      return { isInputDisabled: false, controlMessage: "" };
    }

    const billingCompletedDate = workDetail.billingCompletedDate ? new Date(workDetail.billingCompletedDate) : null;
    const billingWindowExpired =
      billingCompletedDate != null ? Date.now() - billingCompletedDate.getTime() >= BILLING_WINDOW_MS : false;

    // 1순위: 종결된 건
    if (workDetail.accidentStatus?.includes("CANCELLED")) {
      return {
        isInputDisabled: true,
        controlMessage: "해당 건은 종결되어 메시지를 보낼 수 없어요",
      };
    }

    // 2순위: 청구완료된 건
    if (billingCompletedDate) {
      if (billingWindowExpired) {
        return {
          isInputDisabled: true,
          controlMessage: "해당 건은 청구완료 후 30일이 지나 메시지를 보낼 수 없어요. 기존 대화는 열람만 가능해요.",
        };
      }

      // 30일 이내 → 입력 가능 + 안내 메시지
      return {
        isInputDisabled: false,
        controlMessage: "청구가 완료된 건이에요. 30일 동안은 메시지 작성이 가능하며, 이후에는 열람만 가능해요.",
      };
    }

    // 4순위: 일반 상태 → 입력 가능 + 안내 메시지
    return {
      isInputDisabled: false,
      controlMessage:
        "보험사와 카슈어 운영팀에 입고 확정/일정/청구 등 주요 사항을 공유해 주세요. (예: 렌터카 업체가 픽업 후 O일 O시에 입고 예정입니다. 등)",
    };
  }, [workDetail]);

  // 댓글 작성 핸들러 (Optimistic Update 패턴)
  // - Optimistic Update: API 응답을 기다리지 않고 즉시 UI에 표시하여 빠른 사용자 경험 제공
  // - 임시 댓글(음수 ID) 생성: 실제 댓글이 오기 전까지 임시로 표시
  // - 폴링에서 실제 댓글이 오면: fetchUnreadComments에서 임시 댓글(음수 ID)을 필터링하여 제거하고 실제 댓글 추가
  const handleSubmit = async () => {
    if (!commentText.trim() || isSubmitting || isInputDisabled) return;

    const textToSubmit = commentText.trim();
    setIsSubmitting(true);

    // Optimistic Update: 임시 댓글 생성 (음수 ID로 실제 댓글과 구분)
    const tempComment: ICommentList = {
      id: -Date.now(), // 임시 ID (음수)
      accidentRequestId: workId,
      commentContent: textToSubmit,
      authorType: "FACTORY_MEMBER",
      authorTypeDisplay: "공업사",
      authorId: 0,
      authorName: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 즉시 UI에 추가
    setComments(prev => [...prev, tempComment]);
    setCommentText("");
    shouldScrollRef.current = true; // 스크롤 플래그 설정

    try {
      await postComment(workId, { commentContent: textToSubmit });
      // 성공 시: 폴링(fetchUnreadComments)에서 실제 댓글이 오면 임시 댓글(음수 ID)은 자동으로 제거되고 실제 댓글로 교체됨

      // 댓글 전송 직후 읽음 처리 API 호출 (추가 fetch 없이 현재 목록 기준)
      if (latestRealCommentId != null) {
        try {
          await readComment(workId, { lastReadCommentId: latestRealCommentId });
          lastReadCommentIdRef.current = latestRealCommentId;
        } catch (readError) {
          console.error("댓글 전송 후 읽음 처리 실패:", readError);
        }
      }

      // 댓글 작성 후 폴링 재시작 (3분 타이머 리셋)
      setPollingKey(prev => prev + 1);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      showError("메시지 전송에 실패했습니다.");
    } finally {
      // 1.7초 후 입력 비활성화 해제 (성급한 재전송 방지)
      setTimeout(() => {
        setIsSubmitting(false);
      }, COMMENT_SUBMIT_COOLDOWN_MS);
    }
  };

  // 뒤로 가기 버튼 클릭 시 작업 상세 페이지로 이동
  const handleBack = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    router.push(`/work/${workId}?${String(params)}`);
  };

  // 데이터 변환 함수들 (useMemo)
  // 날짜별로 댓글 그룹화
  // - 댓글을 생성 날짜 기준으로 그룹화하여 UI에 표시
  // - 날짜 형식: "YYYY년 MM월 DD일"
  const groupedComments = useMemo(() => {
    return comments.reduce((groups, comment) => {
      const date = dayjs(comment.createdAt).format("YYYY년 MM월 DD일");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(comment);
      return groups;
    }, {} as Record<string, ICommentList[]>);
  }, [comments]);

  // UI 헬퍼 함수들
  // 내가 작성한 댓글인지 확인 (공업사가 작성한 댓글)
  const isMyComment = (comment: ICommentList) => {
    return comment.authorType === "FACTORY_MEMBER";
  };

  // 작성자 아바타 렌더링
  const renderAvatar = (comment: ICommentList) => {
    if (comment.authorType === "ADMIN") {
      // 어드민 아이콘
      return (
        <div className="w-9 h-9 bg-common-white rounded-full border border-line-neutral flex items-center justify-center">
          <img src="/images/img/img-carsur_manager_profile.png" alt="manager" />
        </div>
      );
    } else if (comment.authorType === "FACTORY_MEMBER") {
      // 공업사 아이콘
      return (
        <div className="w-9 h-9 bg-common-white rounded-full border border-line-neutral flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"
              fill="#FF9800"
            />
            <path
              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
              fill="#FF9800"
            />
          </svg>
        </div>
      );
    } else {
      // 보험사 직원 아이콘
      return (
        <div className="w-9 h-9 bg-common-white rounded-full border border-line-neutral flex items-center justify-center">
          <img src="/images/img/img-insurance_manager_profile.png" alt="insurance" />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-svh bg-bg-main">
      {/* 상단 헤더 */}
      <div className="sticky top-0 z-10 w-full flex flex-row px-5 py-3 justify-between items-center bg-common-white border-b border-line-neutral">
        {/* 뒤로 가기 버튼 */}
        <button onClick={handleBack} className="w-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.1241 2.29289C16.7336 1.90237 16.1006 1.90237 15.71 2.29289L6.85164 11.1513C6.38301 11.6199 6.38301 12.3799 6.85164 12.8486L15.71 21.707C16.1006 22.0975 16.7336 22.0975 17.1241 21.707C17.5146 21.3164 17.5146 20.6834 17.1241 20.2929L8.83113 11.9999L17.1241 3.70696C17.5146 3.31643 17.5146 2.68342 17.1241 2.29289Z"
              fill="black"
            />
          </svg>
        </button>

        {/* 차량 정보 */}
        <div className="flex flex-col items-center">
          <div className="text-primary-normal text-base font-semibold">{workDetail?.carModel || ""}</div>
          <div className="text-primary-alternative text-xs">{workDetail?.carNumber || ""}</div>
        </div>

        {/* 작업 상태 */}
        <div className="mt-2 flex justify-center">
          <div
            className="flex flex-col shrink-0 items-start text-left py-1 px-2 rounded-md border-0"
            style={{
              backgroundColor: statusColor(workDetail?.accidentStatus as string)?.bg,
              color: statusColor(workDetail?.accidentStatus as string)?.text,
            }}
          >
            <span className="text-xs font-medium">
              {WORK_STATUS[workDetail?.accidentStatus as keyof typeof WORK_STATUS] || ""}
            </span>
          </div>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-6">
          <div className="flex flex-col gap-6">
            {Object.entries(groupedComments).map(([date, dateComments]) => (
              <div key={date} className="flex flex-col items-center gap-6">
                <div className="text-center text-neutral-600 text-xs">{date}</div>

                <div className="w-full flex flex-col gap-4">
                  {dateComments.map(comment =>
                    isMyComment(comment) ? (
                      // 내 댓글 - 오른쪽 정렬
                      <div key={comment.id} className="w-full flex justify-end items-end gap-1">
                        <div className="text-primary-assistive text-xs">
                          {formatDateTime(comment.createdAt, "A h:mm")}
                        </div>
                        <div className="max-w-[240px] px-3 py-2 bg-secondary-normal rounded-tl-xl rounded-bl-xl rounded-br-xl">
                          <div className="text-common-white text-sm leading-tight whitespace-pre-wrap break-words">
                            {comment.commentContent}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // 다른 사람 댓글 - 왼쪽 정렬
                      <div key={comment.id} className="w-full flex justify-start items-start gap-2">
                        {renderAvatar(comment)}

                        <div className="flex flex-col gap-2">
                          <div className="text-primary-normal text-xs">{comment.authorName}</div>

                          <div className="flex items-end gap-1">
                            <div className="max-w-[240px] px-3 py-2 bg-bg-normal rounded-tr-xl rounded-bl-xl rounded-br-xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.08)] border border-line-alternative">
                              <div className="text-primary-neutral text-sm leading-tight whitespace-pre-wrap break-words">
                                {comment.commentContent}
                              </div>
                            </div>
                            <div className="text-primary-assistive text-xs">
                              {formatDateTime(comment.createdAt, "A h:mm")}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
            {/* 스크롤 위치 참조용 div (맨 아래) */}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* 하단 입력창 */}
      <div className="sticky bottom-0 z-10 w-full border-line-neutral relative">
        {/* 안내 메시지 - absolute로 입력창 위에 고정 */}
        {controlMessage && isMessageVisible && (
          <div className="absolute bottom-full left-0 right-0 px-5 mb-[10px] pointer-events-none">
            <div
              onClick={() => setIsMessageVisible(false)}
              className="flex items-start gap-2 px-4 py-3 rounded-xl bg-[#E6E7EC]/80 backdrop-blur-sm pointer-events-auto cursor-pointer transition-all duration-200 hover:bg-[#E6E7EC]/60"
            >
              <span className="text-[13px] leading-[18px] font-semibold text-gray-500">안내</span>
              <span className="text-[13px] leading-[18px] font-normal flex-1 text-gray-500">{controlMessage}</span>
              <div className="flex-shrink-0 w-3 h-3 flex items-center justify-center text-gray-400">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 1L1 11M1 1L11 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* 입력창 - 입력 불가능할 때는 완전히 숨김 */}
        {!isInputDisabled && (
          <div className="px-5 p-4 bg-common-white">
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-bg-main rounded-full border border-line-neutral flex items-center gap-2">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요"
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary-assistive text-primary-alternative"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!commentText.trim() || isSubmitting}
                  className="w-8 h-8 rounded-full flex items-center justify-center disabled:bg-primary-disabled disabled:opacity-30 bg-secondary-normal transition-all duration-200 hover:opacity-90 active:scale-95"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="rotate-90"
                  >
                    <path
                      d="M12 4L12 20M12 4L6 10M12 4L18 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
