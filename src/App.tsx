import { MAIN_MENU } from '@constants';
import { AppLayout } from '@layouts';
import { LoginPage } from '@pages';

export default function App() {
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
          path: '/login',
          name: MAIN_MENU.login,
          element: <LoginPage />
        },
        {
          type: 'main-item',
          path: '/home',
          name: MAIN_MENU.upload,
          element: <></>
        }
      ]}
    />
  );
}
