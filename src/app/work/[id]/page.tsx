"use client";

import BackHeader from "@/components/common/BackHeader";
import WorkDetail from "@/components/unit/work/Detail";
import { useRouter } from "next/navigation";

export default function WorkDetailPage() {
  const router = useRouter();

  return (
    <>
      <BackHeader
        title={"수리 내역 상세"}
        onBack={() => router.back()}
        bgColor="bg-neutral-100"
      />

      <WorkDetail />
    </>
  );
}
