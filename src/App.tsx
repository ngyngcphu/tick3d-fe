import { MENU_BAR } from '@constants';
import { AppLayout } from '@layouts';
import {
  CategoryPage,
  LoginPage,
  SignUpPage,
  HomePage,
  DetailModelPage,
  PaymentCheckoutPage,
  ShoppingCartPage
} from '@pages';

export default function App() {
  return (
    <AppLayout
      menu={[
        {
          type: 'item',
          path: '/',
          name: MENU_BAR.home,
          element: <HomePage />
        },
        {
          type: 'item',
          path: '/category',
          name: MENU_BAR.category,
          element: <CategoryPage />
        },
        {
          type: 'item',
          path: '/up',
          name: MENU_BAR.upload,
          element: <></>
        },
        'divider',
        {
          type: 'item',
          path: '/login',
          name: MENU_BAR.login,
          element: <LoginPage />
        },
        {
          type: 'item',
          path: '/signup',
          name: MENU_BAR.signup,
          element: <SignUpPage />
        },
        {
          type: 'skeleton',
          path: '/checkout',
          name: 'Checkout',
          element: <PaymentCheckoutPage />
        },
        {
          type: 'skeleton',
          path: '/card',
          name: MENU_BAR.card,
          element: <ShoppingCartPage />
        }
      ]}
      child={[
        {
          path: '/category/:id',
          element: <DetailModelPage />
        }
      ]}
    />
  );
}
