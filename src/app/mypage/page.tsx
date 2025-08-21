import MyPageList from "@/components/unit/mypage/List";

export default function MyPage() {
  return (
    <>
      <div className="flex flex-col h-screen">
        {/* 헤더 */}
        <div className="sticky top-0 z-10 h-11 w-full flex flex-row justify-start items-center px-5">
          <span className="text-primary-normal text-2xl font-semibold">
            마이페이지
          </span>
        </div>

        <MyPageList />
      </div>
    </>
  );
}
