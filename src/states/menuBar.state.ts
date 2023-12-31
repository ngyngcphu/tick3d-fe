import { create } from 'zustand';
import { MENU_BAR } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()((set) => ({
  selectedMenu: MENU_BAR.home,
  isCategoryItem: false,
  selectedCategoryItem: {
    id: '',
    name: ''
  },
  setSelectedMenu: (selectedMenu) => {
    set({ selectedMenu: selectedMenu });
  },
  setIsCategoryItem: (payload) => {
    set({ isCategoryItem: payload });
  },
  setSelectedCategoryItem: (payload) => {
    set({ selectedCategoryItem: payload });
  }
}));
