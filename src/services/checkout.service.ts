import { apiClient, invoke } from './common';

export const checkoutService = {
  createOrder: (data: CheckoutForm) => invoke(apiClient.POST('/api/checkout', { body: data })),
  completePaypalOrder: (data: PaypalInfo) =>
    invoke(apiClient.POST('/api/checkout/paypal/completing', { body: data })),
  createPaypalOrder: (data: PaypalOrderInfo) =>
    invoke(apiClient.POST('/api/checkout/paypal/creating', { body: data }))
};
