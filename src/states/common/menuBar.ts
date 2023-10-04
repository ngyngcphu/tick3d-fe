import { create } from 'zustand';
import { MAIN_MENU } from '@constants';

export const useMenuBarStore = create<MenuBarStore>()((set) => ({
  selectedMenu: MAIN_MENU.sample,
  setSelectedMenu: (selectedMenu) => {
    set({ selectedMenu: selectedMenu });
  }
}));
