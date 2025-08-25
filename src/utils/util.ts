import { workDetailStatus, workSteps } from "@/mock/data";
import { ServerErrorResponse } from "@/type/etc.type";
import dayjs from "dayjs";

export const statusColor = (status: string) => {
  switch (status) {
    case "입고확정": {
      return {
        bg: "#D5E7F299",
        text: "#193347",
      };
    }
    case "차량입고": {
      return {
        bg: "#DCEBDD99",
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
  const currentIndex = workSteps.filter(step => step === currentStatus);
  return currentIndex;
};

//지연함수
export const sleep = async (ms: number) => {
  await new Promise(resolve => setTimeout(resolve, ms));
};

// * 비밀번호 유효성 검사 함수
export const validatePassword = (password: string) => {
  // 길이 검사 (8~16자리)
  const lengthValid = password.length >= 8 && password.length <= 16;

  // 영문 포함 여부 검사
  const hasEnglish = /[a-zA-Z]/.test(password);

  // 숫자 포함 여부 검사
  const hasNumber = /[0-9]/.test(password);

  // 특수문자 포함 여부 검사
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password);

  // 모든 조건을 만족하는지 검사
  // const isValid = lengthValid && hasEnglish && hasNumber && hasSpecialChar;

  //테스트 중
  const isValid = true;

  return {
    isValid,
    message: isValid ? "" : "비밀번호는 영문 + 숫자 + 특수문자 조합의 8~16자리여야 합니다.",
  };
};

// * Axios 에러에서 서버 메시지 추출하는 함수
export const extractErrorMessage = (error: any): string => {
  if (error?.response?.data) return error.response.data;

  // 네트워크 에러나 기타 에러의 경우
  if (error?.message) return error.message;

  // 기본 에러 메시지
  return "요청 처리 중 오류가 발생했습니다.";
};

export const formatDate = (date: string | undefined | null, format = "YYYY.MM.DD") => {
  if (!date) return "";

  const result = dayjs(date).format(format);

  return result;
};
