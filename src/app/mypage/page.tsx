import MyPageList from "@/components/unit/mypage/List";

export default function MyPage() {
  return (
    <>
      <div className="sticky top-0 z-10 flex flex-col items-center self-stretch bg-white overflow-hidden">
        {/* 헤더 */}
        <div className="h-11 w-full flex flex-row justify-start items-center px-5">
          <span className="text-primary-normal text-2xl font-semibold">
            마이페이지
          </span>
        </div>
      </div>

      <MyPageList />
    </>
  );
}
