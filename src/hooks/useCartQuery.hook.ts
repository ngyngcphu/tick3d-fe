import { useQuery } from '@tanstack/react-query';
import { cartService } from '@services';

export function useCartQuery() {
  const listModelsInCart = useQuery({
    queryKey: ['/api/cart'],
    queryFn: () => cartService.getAll(),
    retry(failureCount, error: string) {
      if (error === 'Login first !') return false;
      return failureCount < 3;
    }
  });

  return {
    listModelsInCart: listModelsInCart
  };
}
