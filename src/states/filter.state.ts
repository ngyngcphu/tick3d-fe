import { create } from 'zustand';

export const useFilterStore = create<FilterStore>()((set) => ({
  selectedStar: 0,
  fromDay: undefined,
  toDay: undefined,
  setSelectedStar: (star) => {
    set({ selectedStar: star });
  },
  setFromDay: (day) => {
    set({ fromDay: day });
  },
  setToDay: (day) => {
    set({ toDay: day });
  }
}));
