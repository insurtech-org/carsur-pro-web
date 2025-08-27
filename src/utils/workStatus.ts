//상세 상태
export const workDetailStatus = {
  ARRIVED: "차량 수리를 시작해 주세요",
  REPAIR_STARTED: "차량 수리를 완료해 주세요",
  REPAIR_COMPLETED: "차량을 출고해 주세요",
  RELEASED: "청구를 완료해 주세요",
  BILLING_COMPLETED: "모두 완료되었어요",
};

// 진행 단계별 상태 매핑
export const workSteps = [
  "CONFIRMED",
  "ARRIVED",
  "REPAIR_STARTED",
  "REPAIR_COMPLETED",
  "RELEASED",
  "BILLING_COMPLETED",
];

//상태를 보내는 타입으로 변경
export const convertStatusToType = (status: string) => {
  switch (status) {
    case "ARRIVED":
      return "arrived";
    case "REPAIR_STARTED":
      return "repair-started";
    case "REPAIR_COMPLETED":
      return "repair-completed";
    case "RELEASED":
      return "released";
  }
};

//상태 변경 후 toast 메세지
export const getStatusToastMessage = (status: string) => {
  switch (status) {
    case "ARRIVED":
      return "차량 입고가 완료되었어요";
    case "REPAIR_STARTED":
      return "차량 수리가 시작되었어요";
    case "REPAIR_COMPLETED":
      return "차량 수리가 완료되었어요";
    case "RELEASED":
      return "차량 출고가 완료되었어요";
    case "BILLING_COMPLETED":
      return "청구 처리가 완료되었어요";
  }
};
