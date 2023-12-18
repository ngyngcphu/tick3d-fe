import { useQuery } from '@tanstack/react-query';
import { userService } from '@services';
import { retryQueryFn } from '@utils';

export function useUserQuery() {
  const info = useQuery({
    queryKey: ['/api/user'],
    queryFn: () => userService.getInfo(),
    retry: retryQueryFn
  });

  return {
    info: info
  };
}
