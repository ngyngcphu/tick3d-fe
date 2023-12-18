import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserQuery } from '@hooks';

export const AdminProtected: Component<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const {
    info: { data, isSuccess }
  } = useUserQuery();

  return isSuccess ? (
    data?.role === 'MANAGER' ? (
      children
    ) : (
      <Navigate to='/login' state={{ from: pathname }} replace />
    )
  ) : (
    <Navigate to='/login' state={{ from: pathname }} replace />
  );
};
