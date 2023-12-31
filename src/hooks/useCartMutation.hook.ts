import { useMutation } from '@tanstack/react-query';
import { cartService } from '@services';

export function useCartMutation() {
  const createCart = useMutation({
    mutationKey: ['createCart'],
    mutationFn: (payload: { models: CartCreationPayload[] }) => cartService.create(payload)
  });

  const updateCartQuantity = useMutation({
    mutationKey: ['updateQuantity'],
    mutationFn: ({ modelId, quantity }: { modelId: string; quantity: number }) =>
      cartService.create({
        models: [{ id: modelId, quantity: quantity }]
      })
  });

  const deleteUserModel = useMutation({
    mutationKey: ['deleteMode'],
    mutationFn: (payload: { models: string[] }) => cartService.deleteUserModel(payload)
  });
  return {
    createCart: createCart,
    updateCartQuantity: updateCartQuantity,
    deleteUserModel: deleteUserModel
  };
}
