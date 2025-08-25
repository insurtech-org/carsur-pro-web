"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import MainButton from "./MainButton";

const NotFound = () => {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

  const handleGoBack = () => {
    router.replace("/call");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-14">
      <div className="text-center mb-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">페이지를 찾을 수 없어요</h2>

        <p className="text-gray-600 text-sm">
          요청하신 페이지가 존재하지 않거나
          <br /> 이동되었을 수 있습니다.{" "}
        </p>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex flex-col gap-3 w-full max-w-sm ">
        <MainButton text="뒤로가기" onClick={handleGoBack} />
      </div>

      {/* 추가 정보 */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-xs">문제가 지속되면 카슈어 운영팀에 문의해주세요</p>
        <p>운영팀: 1555-4473</p>
      </div>
    </div>
  );
};

export default NotFound;
