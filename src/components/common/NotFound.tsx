"use client";

import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="text-primary-neutral text-[15px] font-medium">
        페이지를 찾을 수 없어요.
      </span>

      <button
        onClick={() => router.push("/")}
        className="w-full h-10 bg-primary-normal text-white text-[15px] font-medium rounded-full"
      >
        홈으로 이동
      </button>
    </div>
  );
};

export default NotFound;
