import { create } from "zustand";

interface ProposeModalState {
  isOpen: boolean;
  callId: number | null;
  onConfirm: (() => void) | null;
}

interface ProposeModalActions {
  showProposeModal: (callId: number, onConfirm: () => void) => void;
  hideProposeModal: () => void;
}

export const useProposeModalStore = create<ProposeModalState & ProposeModalActions>(set => ({
  isOpen: false,
  callId: null,
  onConfirm: null,

  showProposeModal: (callId: number, onConfirm: () => void) => set({ isOpen: true, callId, onConfirm }),

  hideProposeModal: () => set({ isOpen: false, callId: null, onConfirm: null }),
}));
