import { workDetailStatus, workSteps } from "@/mock/data";

export const statusColor = (status: string) => {
  switch (status) {
    case "입고확정": {
      return {
        bg: "#D5E7F2",
        text: "#193347",
      };
    }
    case "차량입고": {
      return {
        bg: "#DCEBDD",
        text: "#1D3829",
      };
    }
    case "수리중": {
      return {
        bg: "#F8E6BA99",
        text: "#422E1D",
      };
    }
    case "수리완료": {
      return {
        bg: "#E8DDEF99",
        text: "#412454",
      };
    }
    case "차량출고": {
      return {
        bg: "#FBDED999",
        text: "#522A3E",
      };
    }
    case "청구완료": {
      return {
        bg: "#E5E4E199",
        text: "#1D1B17",
      };
    }
    case "입고취소": {
      return {
        bg: "#E5E4E199",
        text: "#9E9E9E",
      };
    }
  }
};

//현재 상태를 받아서, 현재 상태보다 아래에 있는 상태 리턴
export const getWorkUnderStatus = (currentStatus: string) => {
  const currentIndex = workSteps.filter((step) => step === currentStatus);
  return currentIndex;
};

//지연함수
export const sleep = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
