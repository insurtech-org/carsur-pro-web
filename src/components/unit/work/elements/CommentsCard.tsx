"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ICommentList } from "@/api/comments.api";
import { formatDateTime } from "@/utils/util";

export const CommentsCard = ({
  workId,
  comments,
  unreadCommentCount,
}: {
  workId: number;
  comments: ICommentList[];
  unreadCommentCount: number;
}) => {
  const router = useRouter();

  const latestComment = comments[comments.length - 1];

  const handleClick = () => {
    router.push(`/work/${workId}/comments`);
  };

  return (
    <div
      onClick={handleClick}
      className="self-stretch w-full p-4 bg-bg-normal rounded-xl outline outline-1 outline-offset-[-1px] outline-line-neutral inline-flex flex-col justify-start items-start gap-2 cursor-pointer"
    >
      <div className="w-full h-6 inline-flex justify-between items-center">
        <div className="flex-1 flex justify-start items-center gap-1">
          <div className="w-5 h-5 relative overflow-hidden">
            <Image src="/images/icon/ic_chat.png" alt="comment" width={20} height={20} />
          </div>
          <div className="justify-start text-primary-normal text-base font-semibold leading-6">메시지</div>
        </div>

        <div className="self-stretch flex justify-start items-center">
          <div className="w-14 text-center justify-start text-primary-assistive text-xs font-normal leading-4 tracking-tight">
            {comments.length > 0 && latestComment ? formatDateTime(latestComment.createdAt, "MM.DD HH:mm") : ""}
          </div>
          <div className="w-6 h-6 relative overflow-hidden text-line-normal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.45209 6.23432C9.77687 5.92189 10.3033 5.92189 10.6281 6.23432L15.9162 11.3211C16.3059 11.696 16.3059 12.304 15.9162 12.6789L10.6281 17.7657C10.3033 18.0781 9.77687 18.0781 9.45209 17.7657C9.1273 17.4533 9.1273 16.9468 9.45209 16.6344L14.2699 12L9.45209 7.36558C9.1273 7.05316 9.1273 6.54674 9.45209 6.23432Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="self-stretch h-6 inline-flex justify-start items-start gap-8">
        <div className="flex-1 self-stretch justify-center text-neutral-700 text-sm font-normal leading-5 tracking-tight">
          {comments.length > 0 && latestComment ? latestComment.commentContent : "메세지를 입력해보세요!"}
        </div>
        {unreadCommentCount > 0 && (
          <div className="px-1.5 py-0.5 bg-orange-400 rounded-full inline-flex flex-col justify-center items-center">
            <div className="min-w-2 text-center justify-start text-common-white text-xs font-normal leading-4 tracking-tight">
              {unreadCommentCount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
