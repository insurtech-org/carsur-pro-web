import { create } from "zustand";

// 스토어 상태 타입
interface IPropoesData {
  id: number;
  company: string; // 보험사
  location: string; // 예약지역
  reservationDate: string; // 입고 예약일
  status: string; // 예약상태
  carName: string; // 차량명
  carNumber: string; // 차량번호
  carType: string; // 차종
  carDisplacement: string; // 배기량
  carYear: string; // 연식
}

interface IPropoesStore {
  proposeData: IPropoesData[];

  setProposeData: (data: IPropoesData[]) => void;
  addProposeData: (data: IPropoesData) => void;
  updateProposeData: (id: number, data: Partial<IPropoesData>) => void;
  deleteProposeData: (id: number) => void;
}

// Zustand 스토어 생성
export const usePropoesStore = create<IPropoesStore>((set, get) => ({
  proposeData: [],
  setProposeData: (data) => set({ proposeData: data }),
  addProposeData: (data) => set({ proposeData: [...get().proposeData, data] }),
  updateProposeData: (id, data) =>
    set({
      proposeData: get().proposeData.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }),
  deleteProposeData: (id) =>
    set({ proposeData: get().proposeData.filter((item) => item.id !== id) }),
}));
