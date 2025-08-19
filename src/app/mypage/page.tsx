import MyPageList from "@/components/unit/mypage/List";

export default function MyPage() {
  return (
    <>
      <div className="w-96 px-5 inline-flex justify-between items-center overflow-hidden">
        <div className="h-11 flex justify-center items-center gap-2">
          <div className="justify-start text-primary-normal text-xl font-semibold">
            마이페이지
          </div>
        </div>
      </div>
      <MyPageList />
    </>
  );
}
