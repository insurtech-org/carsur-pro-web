import { create } from "zustand";

interface ProposeModalState {
  isOpen: boolean;
  callId: number | null;
  content1?: string;
  content2?: string;
  onConfirm: (() => void) | null;
}

interface ProposeModalActions {
  showProposeModal: (callId: number, onConfirm: () => void, content1?: string, content2?: string) => void;
  hideProposeModal: () => void;
}

export const useProposeModalStore = create<ProposeModalState & ProposeModalActions>(set => ({
  isOpen: false,
  callId: null,
  content1: "",
  content2: "",
  onConfirm: null,

  showProposeModal: (callId: number, onConfirm: () => void, content1?: string, content2?: string) =>
    set({ isOpen: true, callId, onConfirm, content1, content2 }),

  hideProposeModal: () => set({ isOpen: false, callId: null, onConfirm: null, content1: "", content2: "" }),
}));
