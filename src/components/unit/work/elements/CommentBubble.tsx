//중복사용시 컴포넌트 분리 필요
type CommentBubbleProps = {
  count: number | string;
};

const CommentBubble = ({ count }: CommentBubbleProps) => {
  const numericCount = typeof count === "number" ? count : Number(String(count).trim());

  if (!Number.isFinite(numericCount) || numericCount <= 0) return null;

  return (
    <div className="flex items-center" role="status">
      <img src="/images/icon/message_count.png" alt="" className="h-[20px] w-auto object-contain z-4" />
      <div className="z-[5] -ml-[8px] flex min-w-[26px] items-center justify-center rounded-full bg-gradient-to-r from-[#FFA94D] to-[#FF6B00] px-2 py-[3px] text-white text-xs font-semibold leading-none border-2 border-white">
        {numericCount}
      </div>
    </div>
  );
};

export default CommentBubble;
