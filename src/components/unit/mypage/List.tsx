export default function MyPageList() {
  return (
    <>
      <div className="flex flex-col justify-between items-start self-stretch gap-2 bg-bg-alternative p-6 flex-1 px-5 min-h-screen pb-24">
        <div className="w-full inline-flex flex-col justify-start items-start gap-5">
          <div className="flex flex-col justify-center items-start gap-1">
            <div className="inline-flex justify-center items-center gap-2">
              <div className="justify-center text-primary-normal text-base font-semibold">
                김카슈 대표
              </div>
            </div>
            <div className="inline-flex justify-start items-center gap-1">
              <div
                data-property-1="청구완료"
                className="h-5 px-2 py-1 bg-neutral-200 rounded-md flex justify-center items-center gap-2"
              >
                <div className="text-center justify-start text-neutral-900 text-xs font-medium  leading-none ">
                  회사 대표 계정
                </div>
              </div>
              <div className="justify-center text-primary-alternative text-sm font-medium  leading-tight ">
                카슈어 카센터
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="self-stretch h-24 py-5 bg-neutral-100 rounded-[10px] inline-flex justify-center items-center relative">
              <div className="flex-1 inline-flex flex-col justify-center items-center gap-2.5">
                <div className="justify-center text-black/20 text-xs font-medium leading-none ">
                  캐시
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2">
                  <div className="text-center justify-start text-black/20 text-base font-semibold">
                    0
                  </div>
                  <div className="text-center justify-start text-black/20 text-base font-semibold">
                    C
                  </div>
                </div>
              </div>

              <div className="w-px h-full bg-neutral-200" />

              <div className="flex-1 inline-flex flex-col justify-center items-center gap-2.5">
                <div className="justify-center text-black/20 text-xs font-medium leading-none ">
                  포인트
                </div>
                <div className="self-stretch inline-flex justify-center items-center gap-2">
                  <div className="text-center justify-center text-black/20 text-base font-semibold">
                    0
                  </div>
                  <div className="text-center justify-center text-black/20 text-base font-semibold">
                    P
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-0 right-0 px-4">
              <div className="self-stretch h-24 bg-[#212121]/40 rounded-[10px] inline-flex justify-center items-center w-full">
                <div className="text-center justify-start text-white text-base font-semibold">
                  개발 예정입니다.
                </div>
              </div>
            </div>
          </div>

          <div className="w-full inline-flex flex-col justify-start items-start">
            <div className="self-stretch py-3 border-b border-line-neutral inline-flex justify-between items-center">
              <div className="justify-start text-black text-base font-normal">
                계정관리
              </div>
              <img src="/images/icon/ic_arrow-right-2.svg" />
            </div>
            <div className="self-stretch py-3 inline-flex justify-between items-center">
              <div className="justify-start text-black text-base font-normal">
                이용약관
              </div>
              <div
                data-name="Chevron Right"
                data-size="sm"
                className="w-6 h-6 relative overflow-hidden"
              >
                <img src="/images/icon/ic_arrow-right-2.svg" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full inline-flex flex-col justify-start items-start gap-2">
          <img
            className="w-[91px] h-[23px]"
            src="/images/logo_hearder-horizen.png"
          />
          <div className="self-stretch justify-center text-primary-alternative opacity-60 text-xs font-regular leading-snug">
            (주) 슈어테크 | 대표자 : 곽권일 | 사업자등록번호 : 690-88-03133
            <br />
            통신판매업신고번호 : 제 2025-서울광진-0185호 <br />
            주소 : 서울특별시 광진구 자양로 86 (자양동), 세경빌딩 306호 <br />
            2025 ⓒ 슈어테크 all rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
