import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@material-tailwind/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import tick3D from '@assets/tick3D-logo.svg';
import {
  AppDrawer,
  DesktopNavbar,
  MobileDefaultModelSearch,
  ToggleSidebarBtn,
  useSidebarMenu
} from '@components/common';
import { ScreenSize, MENU_BAR } from '@constants';
import { useScreenSize, useCategoryQuery, useCartQuery } from '@hooks';
import { useMenuBarStore, usePaginationStore, useCartStore } from '@states';

export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const {
    listModelsInCart: { data: listModelsInCart, isSuccess }
  } = useCartQuery();
  const {
    listCategories: { data: listCategories }
  } = useCategoryQuery();
  const { totalCartItems } = useCartStore();

  const { screenSize } = useScreenSize();

  const { openSidebar, handleOpenSidebar, SidebarMenu } = useSidebarMenu();

  const extraListCategories = useMemo(
    () => [{ id: '', name: 'All things' }, ...(listCategories ?? [])],
    [listCategories]
  );

  const ShoppingCart: Component = () => {
    const { selectedMenu, setSelectedMenu, setIsCategoryItem, setSelectedCategoryItem } =
      useMenuBarStore();
    const { setActivePage } = usePaginationStore();

    return (
      <Link
        to='/cart'
        className={
          'focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold rounded-lg text-lg w-fit text-center' +
          (selectedMenu === MENU_BAR.cartOrTrackingOrder
            ? ' bg-blue-100 text-blue/1 font-bold p-2 cursor-pointer'
            : '')
        }
        onClick={() => {
          setSelectedMenu(MENU_BAR.cartOrTrackingOrder);
          setIsCategoryItem(false);
          setSelectedCategoryItem({
            id: '',
            name: ''
          });
          setActivePage(1);
        }}
      >
        {totalCartItems > 0 || (isSuccess && (listModelsInCart?.total ?? 0 > 0)) ? (
          <Badge content={isSuccess ? listModelsInCart?.total : totalCartItems}>
            <ShoppingCartIcon strokeWidth={2} className='w-6 h-6' />
          </Badge>
        ) : (
          <ShoppingCartIcon strokeWidth={2} className='w-6 h-6' />
        )}
      </Link>
    );
  };

  return (
    <div className='w-full max-h-[768px] px-6 lg:px-9 py-3 shadow-md z-10'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center justify-between w-full lg:hidden'>
          <div className='cursor-pointer' onClick={handleOpenSidebar}>
            <ToggleSidebarBtn open={openSidebar} />
          </div>
          <img className='w-12 h-12' src={tick3D} alt='tick3D-logo' />
          <div className='flex items-center gap-8'>
            <MobileDefaultModelSearch />
            <ShoppingCart />
          </div>
        </div>
        {screenSize < ScreenSize.LG ? (
          <AppDrawer open={openSidebar} onClose={handleOpenSidebar}>
            <SidebarMenu menu={menu} listCategories={extraListCategories} />
          </AppDrawer>
        ) : (
          <DesktopNavbar
            menu={menu}
            listCategories={extraListCategories}
            totalCartItems={isSuccess ? listModelsInCart?.total ?? 0 : totalCartItems}
          />
        )}
      </div>
    </div>
  );
};
