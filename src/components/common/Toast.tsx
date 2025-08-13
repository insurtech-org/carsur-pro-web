"use client";

import { ToastProps } from "@/type/etc.type";
import React, { useState, useEffect } from "react";

// Toast 컴포넌트
const Toast: React.FC<ToastProps> = ({
  type = "success",
  message,
  subMessage,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Toast가 나타날 때 애니메이션 시작
  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  // 자동으로 닫히도록 설정
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  // Toast 닫기 처리
  const handleClose = () => {
    setIsAnimating(false);
    // 애니메이션이 끝난 후 실제로 닫기
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 지속 시간과 동일
  };

  // Toast가 보이지 않으면 렌더링하지 않음
  if (!isVisible) return null;

  // Toast 타입에 따른 아이콘과 스타일 설정
  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          icon: (
            <div className="w-6 h-6 relative overflow-hidden">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-status-positive"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM17.5996 7.2002C17.1578 6.86896 16.5315 6.95862 16.2002 7.40039L10.8916 14.4775L7.70703 11.293C7.31651 10.9024 6.68349 10.9024 6.29297 11.293C5.90246 11.6835 5.90245 12.3165 6.29297 12.707L10.293 16.707C10.498 16.912 10.7821 17.0176 11.0713 16.9971C11.3603 16.9764 11.626 16.8314 11.7998 16.5996L17.7998 8.59961C18.131 8.15779 18.0414 7.53153 17.5996 7.2002Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          bgColor: "bg-primary-neutral",
        };
      case "error":
        return {
          icon: (
            <div className="w-6 h-6 relative overflow-hidden">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM17.5996 7.2002C17.1578 6.86896 16.5315 6.95862 16.2002 7.40039L10.8916 14.4775L7.70703 11.293C7.31651 10.9024 6.68349 10.9024 6.29297 11.293C5.90246 11.6835 5.90245 12.3165 6.29297 12.707L10.293 16.707C10.498 16.912 10.7821 17.0176 11.0713 16.9971C11.3603 16.9764 11.626 16.8314 11.7998 16.5996L17.7998 8.59961C18.131 8.15779 18.0414 7.53153 17.5996 7.2002Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          ),
          bgColor: "bg-primary-neutral",
        };
      case "warning":
        return {
          icon: (
            <div className="w-6 h-6 relative overflow-hidden">
              {/* 경고 아이콘 */}
              <svg
                className="w-6 h-6 text-Status-Warning"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
              </svg>
            </div>
          ),
          bgColor: "bg-primary-neutral",
        };
      case "info":
        return {
          icon: (
            <div className="w-6 h-6 relative overflow-hidden">
              {/* 정보 아이콘 */}
              <svg
                className="w-6 h-6 text-Status-Info"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
          ),
          bgColor: "bg-primary-neutral",
        };
      default:
        return {
          icon: (
            <div className="w-6 h-6 relative overflow-hidden">
              <svg
                className="w-6 h-6 text-Status-Positive"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
          ),
          bgColor: "bg-primary-neutral",
        };
    }
  };

  const { icon, bgColor } = getToastStyles();

  return (
    <div
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        isAnimating
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`w-80 px-4 py-2.5 ${bgColor} rounded-lg inline-flex justify-start items-center gap-4 shadow-lg`}
      >
        <div className="flex-1 flex justify-start items-center gap-2">
          {icon}
          <div className="flex-1 justify-start text-Bg-Normal text-sm font-medium font-['Pretendard'] leading-tight tracking-tight">
            {message}
            {subMessage && <br />}
            {subMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
