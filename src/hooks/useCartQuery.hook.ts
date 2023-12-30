import { useQuery } from '@tanstack/react-query';
import { cartService } from '@services';
import { retryQueryFn } from '@utils';

export function useCartQuery() {
  const listModelsInCart = useQuery({
    queryKey: ['/api/cart'],
    queryFn: () => cartService.getAll(),
    retry: retryQueryFn
  });

  return {
    listModelsInCart: listModelsInCart
  };
}
