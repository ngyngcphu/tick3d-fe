import { useLocation } from 'react-router-dom';
import { MAIN_MENU } from '@constants';
import { AuthLayout, AppLayout } from '@layouts';
import { LoginPage } from '@pages';

export default function App() {
  const { pathname } = useLocation();

  if (pathname === '/login') {
    return (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    );
  }

  return (
    <AppLayout
      menu={[
        {
          type: 'main-item',
          path: '/',
          name: MAIN_MENU.sample,
          element: <></>
        },
        {
          type: 'main-item',
          path: '/home',
          name: MAIN_MENU.sample,
          element: <></>
        }
      ]}
    />
  );
}
