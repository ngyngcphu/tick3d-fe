import { mockServer, invoke } from './common';

export const modelService = {
  getById: (id: string) => invoke<ItemData>(mockServer.get(`/items/${id}`))
};
