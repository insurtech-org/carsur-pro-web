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
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-status-destructive"
              >
                <path
                  d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM16.707 7.29297C16.3165 6.90244 15.6835 6.90244 15.293 7.29297L12 10.5859L8.70703 7.29297C8.31651 6.90244 7.68349 6.90244 7.29297 7.29297C6.90244 7.68349 6.90244 8.31651 7.29297 8.70703L10.5859 12L7.29297 15.293C6.90244 15.6835 6.90244 16.3165 7.29297 16.707C7.68349 17.0976 8.31651 17.0976 8.70703 16.707L12 13.4141L15.293 16.707C15.6835 17.0976 16.3165 17.0976 16.707 16.707C17.0976 16.3165 17.0976 15.6835 16.707 15.293L13.4141 12L16.707 8.70703C17.0976 8.31651 17.0976 7.68349 16.707 7.29297Z"
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
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-status-cautionary"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.09991 12.0001C2.09991 6.53248 6.53228 2.1001 11.9999 2.1001C17.4675 2.1001 21.8998 6.53248 21.8998 12.0001C21.8998 17.4677 17.4675 21.9001 11.9999 21.9001C6.53228 21.9001 2.09991 17.4677 2.09991 12.0001ZM12 7.1C12.497 7.1 12.9 7.50294 12.9 8V12.5C12.9 12.9971 12.497 13.4 12 13.4C11.5029 13.4 11.1 12.9971 11.1 12.5V8C11.1 7.50294 11.5029 7.1 12 7.1ZM12.9998 16C12.9998 16.5523 12.5521 17 11.9998 17C11.4476 17 10.9999 16.5523 10.9999 16C10.9999 15.4477 11.4476 15 11.9998 15C12.5521 15 12.9998 15.4477 12.9998 16Z"
                  fill="currentColor"
                />
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
              <svg className="w-6 h-6 text-Status-Info" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-6 h-6 text-Status-Positive" fill="currentColor" viewBox="0 0 24 24">
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
      className={`fixed top-12 left-1/2 transform -translate-x-1/2 z-[9999] transition-all duration-300 ease-out ${
        isAnimating ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={`px-4 w-80 max-w-[480px] py-2.5 ${bgColor} rounded-lg inline-flex justify-start items-center gap-4 shadow-lg`}
        onClick={handleClose}
      >
        <div className="flex-1 flex justify-start items-center gap-2">
          {icon}
          <div className="flex-1 justify-start text-bg-normal text-sm font-medium">
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
