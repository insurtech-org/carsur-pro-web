"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useEffect, useState } from "react";
import BottomNavigator from "@/components/common/BottomNavigator";
import { useToastStore } from "@/store/toast";
import Toast from "@/components/common/Toast";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const pretendard = localFont({
  src: [
    {
      path: "./../fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // User Agent로 모바일 기기 감지
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = [
        "android",
        "iphone",
        "ipad",
        "ipod",
        "blackberry",
        "windows phone",
        "mobile",
        "tablet",
      ];

      const isMobileDevice = mobileKeywords.some((keyword) =>
        userAgent.includes(keyword)
      );

      setIsMobile(isMobileDevice);
    };

    checkMobile();
  }, []);

  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable} font-pretendard antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          <div className="hybrid-container">
            <div className="flex-1 w-full">{children}</div>
            <BottomNavigator />
          </div>
        </div>

        {/* 전역 Toast 렌더링 */}
        <GlobalToast />
      </body>
    </html>
  );
}

// 전역 Toast 컴포넌트
function GlobalToast() {
  const { isVisible, type, message, subMessage, hideToast } = useToastStore();

  return (
    <Toast
      type={type}
      message={message}
      subMessage={subMessage}
      isVisible={isVisible}
      onClose={hideToast}
      duration={3000}
    />
  );
}
