import { mockServer, invoke } from '@services/common';

export const itemService = {
  getItem: () => invoke<ItemData[]>(mockServer.get('/items'))
};
