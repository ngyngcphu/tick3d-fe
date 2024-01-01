import { AdminProtected, ProtectedRoutes } from '@components/common';
import { MENU_BAR } from '@constants';
import { AppLayout } from '@layouts';
import {
  CategoryPage,
  DetailModelPage,
  HomePage,
  LoginPage,
  MyOrderPage,
  MyStarPage,
  ShoppingCartPage,
  SignUpPage,
  PaymentCheckoutPage,
  ManagementOrderPage,
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
          pathReplace: '/admin/dashboard',
          name: MENU_BAR.uploadOrDashboard,
          element: <></>,
          elementReplace: (
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          )
        },
        {
          type: 'item',
          path: '/manageOrder',
          name: MENU_BAR.manageOrder,
          element: <></>,
          elementReplace: (
            <AdminProtected>
              <ManagementOrderPage />
            </AdminProtected>
          )
        },
        'divider',
        {
          type: 'item',
          path: '/login',
          pathReplace: '/my-stars',
          name: MENU_BAR.loginOrStar,
          element: <LoginPage />,
          elementReplace: (
            <ProtectedRoutes>
              <MyStarPage />
            </ProtectedRoutes>
          )
        },
        {
          type: 'item',
          path: '/signup',
          pathReplace: '/my-orders',
          name: MENU_BAR.signupOrOrder,
          element: <SignUpPage />,
          elementReplace: (
            <ProtectedRoutes>
              <MyOrderPage />
            </ProtectedRoutes>
          )
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
          element: <ShoppingCartPage />
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
