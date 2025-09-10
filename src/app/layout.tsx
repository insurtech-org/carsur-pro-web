import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Metadata } from "next";

// 메타데이터 설정
export const metadata: Metadata = {
  title: "카슈어프로",
  description: "카슈어프로 웹 애플리케이션",
};

// layout.tsx는 서버 컴포넌트로 유지
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

// TypeScript 타입 선언 추가 (파일 최상단에 추가)
declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (message: string) => void;
    };
  }
}
