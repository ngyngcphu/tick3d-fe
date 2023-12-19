import { apiClient, invoke } from './common';

export const homeService = {
  getTopModels: (noItems: number, orderBy: string) =>
    invoke(apiClient.GET('/api/model', { params: { query: { orderBy, noItems } } })),
  getSlideImages: () => invoke(apiClient.GET('/api/home/slides'))
};
