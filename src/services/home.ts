import { mockServer, invoke } from './common';

export const homeService = {
  getSlide: () => invoke<SlideData[]>(mockServer.get('/slides')),
  getItem: () => invoke<ItemData[]>(mockServer.get('/items'))
};