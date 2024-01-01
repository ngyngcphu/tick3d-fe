import { useQuery } from '@tanstack/react-query';
import { categoryService } from '@services';
import { retryQueryFn } from '@utils';

export function useCategoryQuery() {
  const listCategories = useQuery({
    queryKey: ['/api/category'],
    queryFn: () => categoryService.getAll(),
    retry: retryQueryFn
  });

  return {
    listCategories: listCategories
  };
}
