import { apiClient, invoke } from './common';

export const homeService = {
  getTopModels: (noItems: number, orderBy: string, order: Order) =>
    invoke(apiClient.GET('/api/model', { params: { query: { orderBy, noItems, order } } })),
  getSlideImages: () => invoke(apiClient.GET('/api/home/slides'))
};
