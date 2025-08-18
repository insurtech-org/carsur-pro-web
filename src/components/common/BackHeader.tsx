"use client";

export default function BackHeader({
  title,
  bgColor = "bg-white",
  onBack,
}: {
  title: string;
  onBack: () => void;
  bgColor?: string;
}) {
  return (
    <div
      className={`sticky top-0 z-50 flex justify-between items-center self-stretch px-5 h-[44px] ${bgColor}`}
    >
      <button onClick={onBack}>
        <img
          src={"/images/icon/ic_arrow-left-3.svg"}
          className="w-6 h-6 object-fill"
        />
      </button>
      <span className="text-primary-neutral text-base font-bold">{title}</span>
      <div className="w-6 h-6"></div>
    </div>
  );
}
