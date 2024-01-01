import { apiClient, invoke } from './common';

export const statService = {
  statisticCategories: () => invoke(apiClient.GET('/api/stat/category'))
};
