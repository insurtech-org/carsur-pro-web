import { workData, workData2 } from "@/mock/data";
import { create } from "zustand";

// 스토어 상태 타입
interface IMyWorkData {
  id: number;
  company: string; //보험사
  location: string; // 예약지역
  accidentNumber: string; // 사고 번호
  reservationDate: string; // 입고 예약일
  inDate: string; // 입고일
  inTime: string; // 입고 시간
  outDate: string; // 출고일
  outTime: string; // 출고 시간
  status: string; // 예약상태
  carName: string; //차량명
  carNumber: string; // 차량번호
  carType: string; //차종
  carDisplacement: string; //배기량
  carYear: string; //연식
  customerPhone: string; //고객 전화번호
  startDate: string; //수리 시작일
  startTime: string; //수리 시작 시간
  endDate: string; //수리 완료일
  endTime: string; //수리 완료 시간
  claimDate: string; //청구완료일
  price: number; //청구금액
  partsPrice: number; //부품비
  laborPrice: number; //공임비
}

interface IMyWorkStore {
  myWorkData: IMyWorkData[];

  setMyWorkData: (data: IMyWorkData[]) => void;
  addMyWorkData: (data: IMyWorkData) => void;
  updateMyWorkData: (id: number, data: Partial<IMyWorkData>) => void;
  deleteMyWorkData: (id: number) => void;
  getMyWorkData: (id: number) => IMyWorkData | undefined;
}

// Zustand 스토어 생성
export const useMyWorkStore = create<IMyWorkStore>((set, get) => ({
  myWorkData: workData,
  setMyWorkData: (data) => set({ myWorkData: data }),
  addMyWorkData: (data) => set({ myWorkData: [...get().myWorkData, data] }),
  updateMyWorkData: (id, data) =>
    set({
      myWorkData: get().myWorkData.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }),
  deleteMyWorkData: (id) =>
    set({ myWorkData: get().myWorkData.filter((item) => item.id !== id) }),
  getMyWorkData: (id) => get().myWorkData.find((item) => item.id === id),
}));
