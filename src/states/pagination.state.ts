import { create } from 'zustand';

type PaginationStore = {
  activePage: number;
  setActivePage: (page: number) => void;
};

export const usePaginationStore = create<PaginationStore>()((set) => ({
  activePage: 1,
  setActivePage: (page) => {
    set({ activePage: page });
  }
}));
