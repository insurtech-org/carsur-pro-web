import "./globals.css";
import ClientLayout from "./ClientLayout";

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
