import { create } from 'zustand';
import { itemService } from '@services';

export const useItemStore = create<ItemStore>()((set) => ({
  itemData: [],
  getItemData: async () => {
    try {
      const itemData = await itemService.getItem();
      set(() => ({ itemData: itemData }));
    } catch (err) {
      set(() => ({ itemData: [] }));
    }
  }
}));
