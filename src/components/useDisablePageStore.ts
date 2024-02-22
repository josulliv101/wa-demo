import { create } from "zustand";

interface PageState {
  disablePage: boolean;
  enable: () => void;
  disable: () => void;
}

const useDisablePageStore = create<PageState>((set) => ({
  disablePage: false,
  enable: () => set({ disablePage: false }),
  disable: () => set({ disablePage: true }),
}));

export default useDisablePageStore;
