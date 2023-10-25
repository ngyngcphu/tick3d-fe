import { mockServer, invoke } from './common';

export const slideService = {
  getSlide: () => invoke<SlideData[]>(mockServer.get('/slides'))
};
