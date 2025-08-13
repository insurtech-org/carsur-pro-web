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
    company: "AXA손해보험", //보험사
    location: "인천 연수구", // 예약지역
    reservationDate: "2025.10.02", // 입고 예약일
    inDate: "2025.10.02", // 입고일
    inTime: "10:00", // 입고 시간
    outDate: "2025.10.02", // 출고일
    outTime: "10:00", // 출고 시간
    status: "수리중", // 예약상태
    carName: "제네시스 G80", //차량명
    carNumber: "12가1234", // 차량번호
    carType: "중형차", //차종
    carDisplacement: "1,000cc", //배기량
    carYear: "2025", //연식
    customerPhone: "010-1234-5678", //고객 전화번호
    startDate: "2025.10.02", //수리 시작일
    startTime: "10:00", //수리 시작 시간
    endDate: "2025.10.02", //수리 완료일
    endTime: "10:00", //수리 완료 시간
    claimDate: "2025.10.02", //청구완료일
    price: "100,000원", //청구금액
  },
];

//예약 상태
export const status = [
  "입고확정",
  "차량입고",
  "수리중",
  "수리완료",
  "차량출고",
  "청구완료",
  "예약취소",
];
