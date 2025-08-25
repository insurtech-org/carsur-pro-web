"use client";

"use client";

import BackHeader from "@/components/common/BackHeader";
import ArrowButton from "@/components/unit/mypage/elements/ArrowButton";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { useUserStore } from "@/store/user";

export default function AccountPage() {
  const router = useRouter();
  const { showModal } = useModalStore();
  const { setTokens, setUser } = useUserStore();

  const onClickLogout = () => {
    showModal({
      title: "로그아웃 하시겠어요?",
      type: "confirm",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
      onConfirm: () => {
        setTokens({
          accessToken: "",
          refreshToken: "",
        });

        setUser({
          id: "",
          username: "",
          userId: "",
          tellNo: "",
          factoryName: "",
          roles: "",
        });

        router.replace("/login");
      },
    });
  };

  //탈퇴 모달
  const onClickModal = (type: "withdrawal" | "company" | "default") => {
    let title = "";

    if (type === "withdrawal") {
      title = "회원탈퇴는 운영팀으로 연락주세요.";
    } else if (type === "company") {
      title = `사업자 정보 변경은\n 운영팀으로 연락해 주세요.`;
    } else {
      title = `기본정보 수정은\n 운영팀으로 연락해 주세요.`;
    }

    showModal({
      title,
      description: "카슈어 운영팀 : 1555-4473",
      type: "alert",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader title="계정관리" onBack={() => router.replace("/mypage")} />
      <div className="flex-1 flex flex-col justify-start items-center p-5">
        <ArrowButton text="기본 정보 수정" onClick={() => onClickModal("default")} />

        <ArrowButton text="비밀번호 변경" onClick={() => router.replace("/mypage/account/change-password")} />

        <ArrowButton text="사업자 정보 수정" onClick={() => onClickModal("company")} isUnderLine={false} />

        <ArrowButton text="로그아웃" onClick={onClickLogout} />

        <ArrowButton text="회원탈퇴" onClick={() => onClickModal("withdrawal")} isUnderLine={false} />
      </div>
    </div>
  );
}
