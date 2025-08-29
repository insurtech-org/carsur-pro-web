"use client";

import BackHeader from "@/components/common/BackHeader";
import ArrowButton from "@/components/unit/mypage/elements/ArrowButton";
import { useRouter } from "next/navigation";

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">
      <BackHeader title="이용약관" onBack={() => router.replace("/mypage")} />
      <div className="flex-1 flex flex-col justify-start items-center p-5">
        <ArrowButton text="서비스 이용약관" onClick={() => router.replace("/mypage/terms/service")} />

        <ArrowButton
          text="개인정보 수집 이용 동의"
          onClick={() => router.replace("/mypage/terms/personal")}
          isUnderLine={false}
        />
      </div>
    </div>
  );
}
