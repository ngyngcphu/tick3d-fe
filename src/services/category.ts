import { mockServer, invoke } from './common';

export const categoryService = {
  getAll: () => invoke<ItemData[]>(mockServer.get('/items'))
};
