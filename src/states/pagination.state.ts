import { create } from 'zustand';

export const usePaginationStore = create<PaginationStore>()((set) => ({
  activePage: 1,
  setActivePage: (page) => {
    set({ activePage: page });
  }
}));
