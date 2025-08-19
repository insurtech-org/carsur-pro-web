import { callData } from "@/mock/data";
import { create } from "zustand";

interface ICallData {
  id: number;
  company: string;
  location: string;
  reservationDate: string;
  status: string;
  carName: string;
  carNumber: string;
  carType: string;
  carDisplacement: string;
  carYear: string;
}

interface ICallDataStore {
  callData: ICallData[];
  setCallData: (data: ICallData[]) => void;
  addCallData: (data: ICallData) => void;
  updateCallData: (id: number, data: Partial<ICallData>) => void;
  deleteCallData: (id: number) => void;
}
export const useCallDataStore = create<ICallDataStore>((set, get) => ({
  callData: callData,
  setCallData: (data) => set({ callData: data }),
  addCallData: (data) => set({ callData: [...get().callData, data] }),
  updateCallData: (id, data) =>
    set({
      callData: get().callData.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }),
  deleteCallData: (id) =>
    set({ callData: get().callData.filter((item) => item.id !== id) }),
}));
