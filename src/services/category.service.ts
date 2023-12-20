import { apiClient, invoke } from './common';

export const categoryService = {
  getAll: () => invoke(apiClient.GET('/api/category'))
};
