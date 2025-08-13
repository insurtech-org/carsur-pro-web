"use client";

export default function BackHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div className="sticky top-0 z-50 bg-white flex justify-between items-start self-stretch py-2.5 px-5 mb-6 h-[44px]">
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
