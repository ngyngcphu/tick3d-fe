import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserQuery } from '@hooks';

export const ProtectedRoutes: Component<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const {
    info: { isSuccess }
  } = useUserQuery();

  return isSuccess ? children : <Navigate to='/login' state={{ from: pathname }} replace />;
};
