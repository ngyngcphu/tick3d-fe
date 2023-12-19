import { AdminProtected, ProtectedRoutes } from '@components/common';
import { MENU_BAR } from '@constants';
import { AppLayout } from '@layouts';
import {
  CategoryPage,
  DetailModelPage,
  HomePage,
  LoginPage,
  ShoppingCartPage,
  SignUpPage,
  PaymentCheckoutPage,
  AdminDashboard
} from '@pages';
import { emitEvent } from '@hooks';

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
          pathReplace: '/my-stars',
          name: MENU_BAR.loginOrStar,
          element: <LoginPage />
        },
        {
          type: 'item',
          path: '/signup',
          pathReplace: '/my-orders',
          name: MENU_BAR.signupOrOrder,
          element: <SignUpPage />
        },
        {
          type: 'skeleton',
          path: '/checkout',
          name: 'Checkout',
          element: (
            <ProtectedRoutes>
              <PaymentCheckoutPage />
            </ProtectedRoutes>
          )
        },
        {
          type: 'skeleton',
          path: '/cart',
          name: MENU_BAR.cart,
          element: (
            <ProtectedRoutes>
              <ShoppingCartPage />
            </ProtectedRoutes>
          )
        },
        {
          type: 'skeleton',
          path: '/admin/dashboard',
          name: MENU_BAR.cart,
          element: (
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          )
        },
        {
          type: 'logout-btn',
          name: 'Log out',
          onClick: () => emitEvent('logout')
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
