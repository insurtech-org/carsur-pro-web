"use client";
import BackHeader from "@/components/common/BackHeader";
import Detail from "@/components/unit/call/Detail";
import { useParams, useRouter } from "next/navigation";

export default function CallDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
  const hash = window.location.hash;
  const isProposal = hash.includes("proposal");

  const title = hash === "#call" ? "내 지역 콜 상세보기" : "제안 상세보기";

  const onClickGoBack = () => {
    if (isProposal) {
      router.push("/call#proposal");
    } else {
      router.push("/call#mylocal");
    }
  };

  return (
    <div>
      <BackHeader title={title} onBack={onClickGoBack} />
      <Detail id={id} hash={hash} />
    </div>
  );
}
