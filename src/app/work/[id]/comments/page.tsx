"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getComments, postComment, ICommentList } from "@/api/comments.api";
import { getWorkScheduleDetail } from "@/api/work.api";
import type { IWorkDetail } from "@/type/work.type";
import { useToastStore } from "@/store/toast";
import { WORK_STATUS } from "@/utils/enum";
import { statusColor, formatDateTime } from "@/utils/util";
import dayjs from "dayjs";
import PullToRefresh from "@/components/common/PullToRefresh";

export default function WorkComments() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const workId = Number(params.id);

  const { showSuccess, showError } = useToastStore();

  const [comments, setComments] = useState<ICommentList[]>([]);
  const [workDetail, setWorkDetail] = useState<IWorkDetail | null>(null);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const status = searchParams.get("status") || "";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchWorkDetail = useCallback(async () => {
    try {
      const response = await getWorkScheduleDetail(workId);
      setWorkDetail(response);
    } catch (error) {
      console.error(error);
      showError("작업 정보를 불러올 수 없습니다.");
    }
  }, [workId, showError]);

  const fetchComments = useCallback(
    async (showErrorMessage = false) => {
      try {
        const response = await getComments(workId);
        setComments(response || []);
      } catch (error) {
        console.error(error);
        if (showErrorMessage) {
          showError("댓글을 불러올 수 없습니다.");
        }
      }
    },
    [workId, showError]
  );

  useEffect(() => {
    fetchWorkDetail();
    fetchComments(true);

    // 10초마다 댓글 목록 갱신 (실시간 업데이트)
    const intervalId = setInterval(() => {
      fetchComments(false);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchWorkDetail, fetchComments]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const handleSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await postComment(workId, { commentContent: commentText.trim() });
      setCommentText("");
      await fetchComments(true);
      showSuccess("메시지를 전송했습니다.");
    } catch (error) {
      console.error(error);
      showError("메시지 전송에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    router.push(`/work/${workId}?${String(params)}`);
  };

  const handleRefresh = async () => {
    await Promise.all([fetchWorkDetail(), fetchComments(false)]);
  };

  // 날짜별로 댓글 그룹화
  const groupedComments = comments.reduce((groups, comment) => {
    const date = dayjs(comment.createdAt).format("YYYY년 MM월 DD일");
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(comment);
    return groups;
  }, {} as Record<string, ICommentList[]>);

  // 내가 작성한 댓글인지 확인 (공업사가 작성한 댓글)
  const isMyComment = (comment: ICommentList) => {
    return comment.authorType === "FACTORY_MEMBER";
  };

  // 작성자 아바타 렌더링
  const renderAvatar = (comment: ICommentList) => {
    if (comment.authorType === "INSURANCE_COMPANY_MEMBER") {
      // 보험사 직원 아이콘
      return (
        <div className="w-9 h-9 bg-common-white rounded-full border border-line-neutral flex items-center justify-center">
          <img src="/images/img/img-insurance_manager_profile.png" alt="insurance" width={20} height={20} />
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
      // 카슈어 운영팀 - 기본 아바타
      return (
        <div className="w-9 h-9 bg-common-white rounded-full border border-line-neutral flex items-center justify-center">
          <img src="/images/img/img-carsur_manager_profile.png" alt="manager" width={20} height={20} />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-full h-screen bg-bg-main">
      {/* 상단 헤더 */}
      <div className="w-full flex flex-row px-5 py-3 justify-between items-center bg-common-white border-b border-line-neutral">
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
      <div className="flex-1">
        <PullToRefresh onRefresh={handleRefresh}>
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
              <div ref={messagesEndRef} />
            </div>
          </div>
        </PullToRefresh>
      </div>

      {/* 하단 입력창 */}
      <div className="w-full px-5 py-4 bg-common-white border-t border-line-neutral">
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
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubmit}
              disabled={!commentText.trim() || isSubmitting}
              className="w-8 h-8 rounded-full flex items-center justify-center disabled:bg-primary-disabled disabled:opacity-30 bg-secondary-normal"
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
    </div>
  );
}
