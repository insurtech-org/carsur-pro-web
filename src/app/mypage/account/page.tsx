"use client";

import BackHeader from "@/components/common/BackHeader";
import ArrowButton from "@/components/unit/mypage/elements/ArrowButton";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { useUserStore } from "@/store/user";
import { logout } from "@/api/auth.api";
import { deleteTokenApi } from "@/api/push.api";

export default function AccountPage() {
  const router = useRouter();
  const { showModal } = useModalStore();
  const { user } = useUserStore();

  const onClickLogout = () => {
    showModal({
      title: "로그아웃 하시겠어요?",
      type: "confirm",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
      onConfirm: async () => {
        // 1. 먼저 FCM 토큰 삭제 (토큰이 유효할 때)
        if (user?.id) {
          try {
            const deviceId = localStorage.getItem(`device_id_${user.id}`);
            if (deviceId) {
              await deleteTokenApi({
                userType: "FACTORY_MEMBER",
                userId: user.id,
                deviceId: deviceId,
              });
              console.log("✅ FCM 토큰 삭제 성공");
            }
          } catch (error) {
            console.log("❌ FCM 토큰 삭제 실패:", error);
            // 실패해도 로그아웃은 계속 진행
          }
        }

        // 2. 로그아웃 API 호출
        try {
          await logout();
        } catch (error) {
          console.log("로그아웃 API 실패:", error);
          // 실패해도 클라이언트 상태는 초기화
        }

        // 3. localStorage 정리
        if (user?.id) {
          try {
            localStorage.removeItem(`fcm_token_${user.id}`);
            localStorage.removeItem(`device_id_${user.id}`);
          } catch (error) {
            console.log("localStorage 삭제 실패:", error);
          }
        }

        // 4. 사용자 정보 초기화 및 로그인 페이지로 이동
        const { clearUserStore } = useUserStore.getState();
        clearUserStore();

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
      description: "카슈어 운영팀 : 1555-4473 \n (평일 09:00~18:00 / 주말・공휴일 제외)",
      type: "alert",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <BackHeader title="계정관리" onBack={() => router.replace("/mypage")} />
      <div className="flex-1 flex flex-col justify-start items-center p-5">
        <ArrowButton text="기본 정보 수정" onClick={() => onClickModal("default")} />

        <ArrowButton text="비밀번호 변경" onClick={() => router.replace("/mypage/account/change-password")} />

        <ArrowButton text="사업자 정보 수정" onClick={() => onClickModal("company")} />

        <ArrowButton text="로그아웃" onClick={onClickLogout} />

        <ArrowButton text="회원탈퇴" onClick={() => onClickModal("withdrawal")} isUnderLine={false} />
      </div>
    </div>
  );
}
