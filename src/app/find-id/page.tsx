"use client";

import BackHeader from "@/components/common/BackHeader";
import SubButton from "@/components/common/SubButton";
import { useRouter } from "next/navigation";

export default function FindIdPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col h-screen">
        <BackHeader
          title="아이디/비밀번호 찾기"
          onBack={() => router.replace("/login")}
        />
        <div className="flex-1 flex flex-col justify-between items-center p-5">
          <div className="flex h-2/3 flex-col justify-center items-center gap-2">
            <div className="text-center justify-center text-black text-xl font-semibold">
              아이디 및 비밀번호 찾기는
              <br />
              카슈어 운영팀으로 연락주세요.
            </div>
            <div className="self-stretch text-center justify-center text-black text-xl font-semibold">
              운영팀: 1555-4473
            </div>
          </div>

          <div className="w-full flex justify-center">
            <SubButton text="나가기" onClick={() => router.replace("/login")} />
          </div>
        </div>
      </div>
    </>
  );
}
