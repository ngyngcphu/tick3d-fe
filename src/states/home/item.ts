import { create } from 'zustand';
import { itemService } from '@services/home';

export const useItemStore = create<ItemStore>()((set) => ({
  itemStatus: 'UNINIT',
  itemData: [],
  getItemData: async () => {
    set({ itemStatus: 'PENDING' });
    try {
      const itemData = await itemService.getItem();
      set(() => ({ itemData: itemData, itemStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ itemStatus: 'REJECT' }));
    }
  }
}));
