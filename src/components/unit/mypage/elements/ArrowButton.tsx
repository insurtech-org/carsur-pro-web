"use client";

const ArrowButton = ({
  text,
  isUnderLine = true,
  onClick,
}: {
  text: string;
  isUnderLine?: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`self-stretch py-3 ${
        isUnderLine ? "border-b border-line-neutral" : ""
      } inline-flex justify-between items-center`}
    >
      <div className="justify-start text-black text-base font-normal">
        {text}
      </div>

      <button onClick={onClick}>
        <img src="/images/icon/ic_arrow-right-2.svg" />
      </button>
    </div>
  );
};

export default ArrowButton;
