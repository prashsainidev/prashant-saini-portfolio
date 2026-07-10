import { create } from 'zustand';

interface INavStore {
  isForceHidden: boolean;
  setForceHidden: (hidden: boolean) => void;
}

export const useNavStore = create<INavStore>((set) => ({
  isForceHidden: false,
  setForceHidden: (hidden: boolean) => set({ isForceHidden: hidden }),
}));
