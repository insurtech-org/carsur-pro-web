import { workSteps } from "@/utils/workStatus";
import { IWorkList } from "@/type/work.type";
import dayjs from "dayjs";

export const statusColor = (status: string) => {
  switch (status) {
    case "CONFIRMED": {
      return {
        bg: "#D5E7F299",
        text: "#193347",
      };
    }
    case "ARRIVED": {
      return {
        bg: "#DCEBDD99",
        text: "#1D3829",
      };
    }
    case "REPAIR_STARTED": {
      return {
        bg: "#F8E6BA99",
        text: "#422E1D",
      };
    }
    case "REPAIR_COMPLETED": {
      return {
        bg: "#E8DDEF99",
        text: "#412454",
      };
    }
    case "RELEASED": {
      return {
        bg: "#FBDED999",
        text: "#522A3E",
      };
    }
    case "BILLING_COMPLETED": {
      return {
        bg: "#E5E4E199",
        text: "#1D1B17",
      };
    }
    default: {
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
  const isValid = lengthValid && hasEnglish && hasNumber && hasSpecialChar;

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

//예약에 따른
export const getWorkStatusCount = (data: IWorkList[]) => {
  const confirmedCount = data.filter(item => item.status === "CONFIRMED").length || 0;
  const arrivedCount = data.filter(item => item.status === "ARRIVED").length || 0;
  const repairStartedCount = data.filter(item => item.status === "REPAIR_STARTED").length;
  const repairCompletedCount = data.filter(item => item.status === "REPAIR_COMPLETED").length || 0;
  const releasedCount = data.filter(item => item.status === "RELEASED").length || 0;
  const billingCompletedCount = data.filter(item => item.status === "BILLING_COMPLETED").length || 0;

  return {
    CONFIRMED: confirmedCount || 0,
    ARRIVED: arrivedCount || 0,
    REPAIR_STARTED: repairStartedCount || 0,
    REPAIR_COMPLETED: repairCompletedCount || 0,
    RELEASED: releasedCount || 0,
    BILLING_COMPLETED: billingCompletedCount || 0,
  };
};

//카멜케이스를 스네이크로 변환
export const convertCamelToSnake = (camel: string) => {
  // 카멜케이스를 스네이크 케이스로 변환
  const snake = camel
    .split(/(?=[A-Z])/)
    .join("_")
    .toUpperCase();

  return snake;
};

// 스네이크를 카멜케이스로 변환
export const convertSnakeToCamel = (snake: string) => {
  // 스네이크 케이스를 카멜케이스로 변환
  const camel = snake
    .toLowerCase()
    .split("_")
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join("");

  return camel;
};

//휴대폰번호 포맷팅
export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return "";

  // 숫자만 추출
  const numbers = phoneNumber.replace(/[^0-9]/g, "");

  if (numbers.length === 11) {
    // 11자리일 경우 기존 3-4-4 형식 유지
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else {
    // 11자리 아니라면 앞에서부터 3-3자리를 잘라내고 나머지는 마지막 그룹으로
    const first = numbers.slice(0, 3);
    const second = numbers.slice(3, 6);
    const rest = numbers.slice(6);
    return `${first}-${second}-${rest}`;
  }
};

//팩스번호 포맷팅
export const formatFaxNumber = (faxNumber: string) => {
  if (!faxNumber) return "";

  // 숫자만 추출
  const numbers = faxNumber.replace(/[^0-9]/g, "");

  // 서울 지역번호(02)인 경우
  if (numbers.startsWith("02")) {
    if (numbers.length === 9) {
      // 02-123-4567 형식
      return numbers.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    } else if (numbers.length === 10) {
      // 02-1234-5678 형식
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
    }
  }

  // 그 외 지역번호(031, 032 등)인 경우
  if (numbers.length === 10) {
    // 031-123-4567 형식
    return numbers.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (numbers.length === 11) {
    // 031-1234-5678 형식
    return numbers.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }

  // 그 외의 경우는 입력된 형태 그대로 반환
  return numbers;
};

//대물 자차 구분
export const getCarTypeText = (typeNumber: string) => {
  if (typeNumber === "20") {
    return "대물";
  }
  if (typeNumber === "40") {
    return "자차";
  }
  return "-";
};

//소문자로 변경
export const convertToLowerCase = (text: string) => {
  return text.toLowerCase();
};

//대문자로 변경
export const convertToUpperCase = (text: string) => {
  return text.toUpperCase();
};

// 2025-08-26 15:21:06 => 2025.08.26 15:21 시간이 없으면 - 반환
export const formatDateTime = (dateTime: string, format = "YYYY.MM.DD HH:mm") => {
  if (!dateTime) return "-";
  return dayjs(dateTime).format(format);
};
