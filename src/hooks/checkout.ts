import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkoutService } from '@services';

export function useOrderMutation() {
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationKey: ['createPrintingRequest'],
    mutationFn: (data: CheckoutForm) => checkoutService.createOrder(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['orderId'], data.id);
    }
  });

  const createPayPalOrder = useMutation({
    mutationKey: ['createPayPalOrder'],
    mutationFn: (orderInfo: CheckoutForm) =>
      checkoutService.createPaypalOrder({ intent: 'CAPTURE', orderInfo }).then((order) => order.id),
    onSuccess: (data) => {
      queryClient.setQueryData(['paypalOrderId'], data);
    }
  });

  const approvePayPalOrder = useMutation({
    mutationKey: ['approvePayPalOrder'],
    mutationFn: (paypalOrderId: string) =>
      checkoutService.completePaypalOrder({ intent: 'CAPTURE', paypalOrderId }),
    onSuccess: () => {}
  });

  return {
    createOrder: createOrder,
    createPayPalOrder: createPayPalOrder,
    approvePayPalOrder: approvePayPalOrder
  };
}
