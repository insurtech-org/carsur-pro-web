import { useEffect } from "react";

/**
 * 모달이 열려있을 때 body의 스크롤을 방지하는 훅
 * @param isOpen 모달의 열림 상태
 */
export const usePreventScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때 body 스크롤 막기
      document.body.style.overflow = "hidden";
    } else {
      // 모달이 닫힐 때 body 스크롤 복구
      document.body.style.overflow = "unset";
    }

    // 컴포넌트가 언마운트될 때 스크롤 복구
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
};
