"use client";

import ArrowButton from "@/components/unit/mypage/elements/ArrowButton";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function MyPageList() {
  const { user } = useUserStore();
  const router = useRouter();

  const roleName = useMemo(() => {
    if (user?.roles.includes("MANAGER")) {
      return "매니저";
    } else if (user?.roles.includes("USER")) {
      return "사용자";
    } else {
      return "미정";
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col justify-between items-start self-stretch gap-2 bg-bg-normal p-6 px-5 flex-1 pb-24">
        <div className="w-full inline-flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-center text-primary-normal text-base font-semibold">{user?.username}</div>
            </div>
            <div className="inline-flex justify-start items-center gap-1">
              <div
                data-property-1="청구완료"
                className="h-5 px-2 py-1 bg-neutral-200 rounded-md flex justify-center items-center gap-2"
              >
                <div className="text-center justify-start text-neutral-900 text-xs font-medium  leading-none ">
                  {roleName}
                </div>
              </div>
              <div className="justify-center text-primary-alternative text-sm font-medium  leading-tight ">
                {user?.factoryName}
              </div>
            </div>
          </div>
          <div className="self-stretch h-24 py-5 bg-neutral-100 rounded-[10px] inline-flex justify-center items-center relative">
            {/* 캐시/포인트 박스 */}
            <div className="flex-1 inline-flex flex-col justify-center items-center gap-2.5">
              <div className="justify-center text-black/20 text-xs font-medium leading-none ">캐시</div>
              <div className="self-stretch inline-flex justify-center items-center gap-2">
                <div className="text-center justify-start text-black/20 text-base font-semibold">0</div>
                <div className="text-center justify-start text-black/20 text-base font-semibold">C</div>
              </div>
            </div>

            <div className="w-px h-full bg-neutral-200" />

            <div className="flex-1 inline-flex flex-col justify-center items-center gap-2.5">
              <div className="justify-center text-black/20 text-xs font-medium leading-none ">포인트</div>
              <div className="self-stretch inline-flex justify-center items-center gap-2">
                <div className="text-center justify-center text-black/20 text-base font-semibold">0</div>
                <div className="text-center justify-center text-black/20 text-base font-semibold">P</div>
              </div>
            </div>

            {/* 오버레이 */}
            <div className="absolute inset-0 bg-[#212121]/40 rounded-[10px] flex justify-center items-center">
              <div className="text-center text-white text-base font-semibold">개발 예정입니다.</div>
            </div>
          </div>

          <div className="w-full inline-flex flex-col justify-start items-start">
            <ArrowButton text="계정관리" onClick={() => router.push("/mypage/account")} />

            <ArrowButton text="이용약관" onClick={() => router.push("/mypage/terms")} isUnderLine={false} />
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="w-full inline-flex flex-col justify-start items-start gap-2">
          <img className="w-[91px] h-[23px]" src="/images/logo_hearder-horizen.png" />
          <div className="self-stretch justify-center text-primary-alternative opacity-60 text-xs font-regular leading-snug">
            (주) 슈어테크 | 대표자 : 곽권일 | 사업자등록번호 : 690-88-03133
            <br />
            통신판매업신고번호 : 제 2025-서울광진-0185호 <br />
            주소 : 서울특별시 광진구 자양로 86 (자양동), 세경빌딩 306호 <br />
            2025 ⓒ 슈어테크 all rights reserved.
          </div>

          <div className="text-primary-neutral text-[12px] font-medium">
            카슈어 운영팀 : 1555-4473 <br />
            (평일 09:00~18:00 / 주말・공휴일 제외)
          </div>
        </div>
      </div>
    </>
  );
}
