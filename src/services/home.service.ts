import { apiClient, invoke } from './common';

export const homeService = {
  getSlideImages: () => invoke(apiClient.GET('/api/home/slides'))
};
