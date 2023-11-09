import { mockServer, invoke } from './common';

export const checkoutService = {
  getAll: () => invoke<OrderData[]>(mockServer.get('/orders'))
};
