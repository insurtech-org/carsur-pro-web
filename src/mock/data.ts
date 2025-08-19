//콜 데이터
export const callData = [
  {
    id: 1,
    company: "AXA손해보험", //보험사
    location: "인천 연수구", // 예약지역
    reservationDate: "2025.10.02", // 입고 예약일
    status: "입고예정", // 예약상태
    carName: "제네시스 G80", //차량명
    carNumber: "12가1234", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2025", //연식
  },
  {
    id: 2,
    company: "DB손해보험", //보험사
    location: "서울 강남구", // 예약지역
    reservationDate: "2025.10.04", // 입고 예약일
    status: "입고예정", // 예약상태
    carName: "아반떼 N", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "소형차", //차종
    carDisplacement: "1,500cc", //배기량
    carYear: "2022", //연식
  },
  {
    id: 3,
    company: "삼성화재", //보험사
    location: "안산 단원구", // 예약지역
    reservationDate: "2025.10.05", // 입고 예약일
    status: "입고예정", // 예약상태
    carName: "K5", //차량명
    carNumber: "12가1236", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2021", //연식
  },
];

//작업 데이터
export const workData = [
  {
    id: 1,
    company: "AXA손해보험", //보험사
    location: "인천 연수구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.02", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "제네시스 G80", //차량명
    carNumber: "12가1234", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "1,000cc", //배기량
    carYear: "2025", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 100000, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 2,
    company: "DB손해보험", //보험사
    location: "서울 은평구", // 예약지역
    accidentNumber: "1234-567894", // 사고 번호
    reservationDate: "2025.10.07", // 입고 예약일
    inDate: "2025.10.07", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "차량입고", // 예약상태
    carName: "BMW 320D", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 3,
    company: "DB손해보험", //보험사
    location: "서울 강남구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.04", // 입고 예약일
    inDate: "2025.10.04", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "수리중", // 예약상태
    carName: "아반떼 N", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "소형차", //차종
    carDisplacement: "1,500cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "2025.10.04", //수리 시작일
    startTime: "10:00", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 4,
    company: "현대해상", //보험사
    location: "서울 종로구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.04", // 입고 예약일
    inDate: "2025.10.04", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "수리완료", // 예약상태
    carName: "볼보 XC90", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "대형차", //차종
    carDisplacement: "3,000cc", //배기량
    carYear: "2021", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "2025.10.05", //수리 시작일
    startTime: "10:00", //수리 시작 시간
    endDate: "2025.10.07", //수리 완료일
    endTime: "10:00", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 5,
    company: "삼성화재", //보험사
    location: "경기도 광명시", // 예약지역
    accidentNumber: "1234-567892", // 사고 번호
    reservationDate: "2025.10.05", // 입고 예약일
    inDate: "2025.10.05", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "2025.10.08", // 출고일
    outTime: "10:00", // 출고 시간
    status: "차량출고", // 예약상태
    carName: "벨로스터 N", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "소형차", //차종
    carDisplacement: "1,500cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "2025.10.05", //수리 시작일
    startTime: "10:00", //수리 시작 시간
    endDate: "2025.10.08", //수리 완료일
    endTime: "10:00", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 6,
    company: "KB손해보험", //보험사
    location: "서울 마포구", // 예약지역
    accidentNumber: "1234-567893", // 사고 번호
    reservationDate: "2025.10.06", // 입고 예약일
    inDate: "2025.10.06", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "2025.10.08", // 출고일
    outTime: "10:00", // 출고 시간
    status: "청구완료", // 예약상태
    carName: "벤츠 320D", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "2025.10.06", //수리 시작일
    startTime: "10:00", //수리 시작 시간
    endDate: "2025.10.07", //수리 완료일
    endTime: "10:00", //수리 완료 시간
    claimDate: "2025.10.08", //청구완료일
    price: 165000, //청구금액
    partsPrice: 50000, //부품비
    laborPrice: 100000, //공임비
  },
];

//작업 데이터2
export const workData2 = [
  {
    id: 1,
    company: "AXA손해보험", //보험사
    location: "인천 연수구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.02", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "제네시스 G80", //차량명
    carNumber: "12가1234", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "1,000cc", //배기량
    carYear: "2025", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 100000, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 2,
    company: "DB손해보험", //보험사
    location: "서울 은평구", // 예약지역
    accidentNumber: "1234-567894", // 사고 번호
    reservationDate: "2025.10.07", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "BMW 320D", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 3,
    company: "DB손해보험", //보험사
    location: "서울 강남구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.04", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "아반떼 N", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "소형차", //차종
    carDisplacement: "1,500cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 4,
    company: "현대해상", //보험사
    location: "서울 종로구", // 예약지역
    accidentNumber: "1234-567890", // 사고 번호
    reservationDate: "2025.10.04", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "볼보 XC90", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "대형차", //차종
    carDisplacement: "3,000cc", //배기량
    carYear: "2021", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 5,
    company: "삼성화재", //보험사
    location: "경기도 광명시", // 예약지역
    accidentNumber: "1234-567892", // 사고 번호
    reservationDate: "2025.10.05", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "벨로스터 N", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "소형차", //차종
    carDisplacement: "1,500cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
  {
    id: 6,
    company: "KB손해보험", //보험사
    location: "서울 마포구", // 예약지역
    accidentNumber: "1234-567893", // 사고 번호
    reservationDate: "2025.10.06", // 입고 예약일
    inDate: "", // 입고일
    inTime: "", // 입고 시간
    outDate: "", // 출고일
    outTime: "", // 출고 시간
    status: "입고확정", // 예약상태
    carName: "벤츠 320D", //차량명
    carNumber: "12가1235", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "2,000cc", //배기량
    carYear: "2022", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "", //수리 시작일
    startTime: "", //수리 시작 시간
    endDate: "", //수리 완료일
    endTime: "", //수리 완료 시간
    claimDate: "", //청구완료일
    price: 0, //청구금액
    partsPrice: 0, //부품비
    laborPrice: 0, //공임비
  },
];

//예약 상태
export const workStatus = {
  입고확정: "입고확정",
  차량입고: "차량입고",
  수리중: "수리중",
  수리완료: "수리완료",
  차량출고: "차량출고",
  청구완료: "청구완료",
  예약취소: "예약취소",
};

//예약에 따른
export const workStatusCount = (data: any[]) => {
  const 입고확정Count =
    data.filter((item) => item.status === "입고확정").length || 0;
  const 차량입고Count =
    data.filter((item) => item.status === "차량입고").length || 0;
  const 수리중Count = data.filter((item) => item.status === "수리중").length;
  const 수리완료Count =
    data.filter((item) => item.status === "수리완료").length || 0;
  const 차량출고Count =
    data.filter((item) => item.status === "차량출고").length || 0;
  const 청구완료Count =
    data.filter((item) => item.status === "청구완료").length || 0;
  const 예약취소Count =
    data.filter((item) => item.status === "예약취소").length || 0;

  return {
    입고확정: 입고확정Count || 0,
    차량입고: 차량입고Count || 0,
    수리중: 수리중Count || 0,
    수리완료: 수리완료Count || 0,
    차량출고: 차량출고Count || 0,
    청구완료: 청구완료Count || 0,
    예약취소: 예약취소Count || 0,
  };
};

//상세 상태
export const workDetailStatus = {
  차량입고: "차량 수리를 시작해 주세요",
  수리중: "차량 수리를 완료해 주세요",
  수리완료: "차량을 출고해 주세요",
  차량출고: "청구를 완료해 주세요",
  청구완료: "모두 완료되었어요",
};

// 진행 단계별 상태 매핑
export const workSteps = [
  "입고확정",
  "차량입고",
  "수리중",
  "수리완료",
  "차량출고",
  "청구완료",
];
