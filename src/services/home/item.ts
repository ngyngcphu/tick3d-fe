import { mockServer, invoke } from '@services';

export const itemService = {
  getItem: () => invoke<ItemData[]>(mockServer.get('/items')),
  updateItems: (item: ItemData) => invoke<ItemData>(mockServer.put(`/items/${item.id}`, item))
};
