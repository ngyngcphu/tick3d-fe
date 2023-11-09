import { create } from 'zustand';
import { checkoutService } from '@services';

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
  checkoutStatus: 'UNINIT',
  allOrder: [],
  getAllOrder: async () => {
    set(() => ({ checkoutStatus: 'PENDING' }));
    try {
      const allOrder = await checkoutService.getAll();
      set(() => ({ allOrder: allOrder, checkoutStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ checkoutStatus: 'REJECT' }));
    }
  }
}));
