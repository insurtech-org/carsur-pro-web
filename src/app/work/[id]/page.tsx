"use client";

import BackHeader from "@/components/common/BackHeader";
import WorkDetail from "@/components/unit/work/Detail";
import { useRouter, useSearchParams } from "next/navigation";

export default function WorkDetailPage() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const backButton = () => {
    if (status) {
      router.push(`/work?status=${status}`);
    } else {
      router.back();
    }
  };

  return (
    <>
      <BackHeader
        title={"수리 내역 상세"}
        onBack={backButton}
        bgColor="bg-neutral-100"
      />

      <WorkDetail />
    </>
  );
}
