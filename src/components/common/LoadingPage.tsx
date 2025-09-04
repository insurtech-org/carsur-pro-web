"use client";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-0">
      <div className="relative">
        {/* 메인 스피너 */}
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary-normal rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LoadingPage;
