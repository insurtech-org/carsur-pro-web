"use client";

import BackHeader from "@/components/common/BackHeader";
import ProposalHistory from "@/components/unit/call/ProposalHistory";
import { useRouter } from "next/navigation";

export default function ProposalHistoryPage() {
  const router = useRouter();

  return (
    <>
      <BackHeader title="제안내역" onBack={() => router.push("/call#mycall")} />
      <ProposalHistory />
    </>
  );
}
