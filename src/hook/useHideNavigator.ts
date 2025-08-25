"use client";

import { useEffect } from "react";

/**
 * 네비게이터를 숨기는 hook
 * @param shouldHide - 네비게이터를 숨길지 여부
 */
export const useHideNavigator = (shouldHide: boolean = true) => {
  useEffect(() => {
    if (shouldHide) {
      document.body.classList.add("hide-bottom-navigator");
    }

    return () => {
      document.body.classList.remove("hide-bottom-navigator");
    };
  }, [shouldHide]);
};
