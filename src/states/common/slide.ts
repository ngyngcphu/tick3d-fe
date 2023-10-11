import { create } from 'zustand';
import { slideService } from '@services';

export const useSlideStore = create<SlideStore>()((set) => ({
  slideStatus: 'UNINIT',
  slideData: [],
  getSlideData: async () => {
    set(() => ({ slideStatus: 'PENDING' }));
    try {
      const slideData = await slideService.getSlide();
      set(() => ({ slideData: slideData, slideStatus: 'SUCCESS' }));
    } catch (err) {
      set(() => ({ slideStatus: 'REJECT' }));
    }
  }
}));
