import { create } from "zustand";

interface ProposeModalState {
  isOpen: boolean;
  callId: number | null;
  isAxa: boolean;
  additionalRequest?: string;
  onConfirm: (() => void) | null;
}

interface ProposeModalActions {
  showProposeModal: (callId: number, onConfirm: () => void, isAxa: boolean, additionalRequest?: string) => void;
  hideProposeModal: () => void;
}

export const useProposeModalStore = create<ProposeModalState & ProposeModalActions>(set => ({
  isOpen: false,
  callId: null,
  isAxa: false,
  additionalRequest: "",
  onConfirm: null,

  showProposeModal: (callId: number, onConfirm: () => void, isAxa: boolean, additionalRequest?: string) =>
    set({ isOpen: true, callId, onConfirm, isAxa, additionalRequest }),

  hideProposeModal: () => set({ isOpen: false, callId: null, onConfirm: null, isAxa: false, additionalRequest: "" }),
}));
