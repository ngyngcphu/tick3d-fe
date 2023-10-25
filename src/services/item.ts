import { mockServer, invoke } from './common';

export const itemService = {
  getItem: () => invoke<ItemData[]>(mockServer.get('/items'))
};
