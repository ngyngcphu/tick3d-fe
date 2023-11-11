import { create } from 'zustand';
import { homeService } from '@services';

export const useShoppingCartStore = create<ShoppingCartStore>()((set, get) => ({
  itemStatus: 'UNINIT',
  itemData: [],
  summaryPrice: 0,
  getCardItems: async () => {
    set({ itemStatus: 'PENDING' });
    try {
      const itemData = await homeService.getItem();
      const summaryPrice = () => {
        let totalSum = 0;

        itemData.forEach((item) => {
          totalSum += item.price * item.numberBought;
        });

        return totalSum;
      };
      set(() => ({ itemData: itemData, itemStatus: 'SUCCESS', summaryPrice: summaryPrice() }));
    } catch (err) {
      set(() => ({ itemStatus: 'REJECT' }));
    }
  },
  updateItem: async (item) => {
    set({ itemStatus: 'PENDING' });
    try {
      await homeService.updateItems(item);
      get().getCardItems();
      set(() => ({ itemStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ itemStatus: 'REJECT' }));
    }
  }
}));
