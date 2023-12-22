import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import tick3D from '@assets/tick3D-logo.svg';
import { AppDrawer, DesktopNavbar, ToggleSidebarBtn, useSidebarMenu } from '@components/common';
import { ScreenSize, MENU_BAR } from '@constants';
import { useScreenSize, useCategoryQuery, useUserQuery } from '@hooks';
import { useMenuBarStore, usePaginationStore, useCartStore } from '@states';
import { Typography } from '@material-tailwind/react';
import { cartService } from '@services';
import { useQuery } from '@tanstack/react-query';
import { retryQueryFn } from '@utils';

export const AppNavigation: Component<{ menu: RouteMenu }> = ({ menu }) => {
  const {
    info: { isSuccess }
  } = useUserQuery();
  const { data: modelCartList } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: () => cartService.getCart(),
    retry: retryQueryFn
  });
  const numberOfUserModels = useMemo(
    () => modelCartList?.reduce((total, currentModel) => total + currentModel.quantity, 0),
    [modelCartList]
  );
  const { screenSize } = useScreenSize();

  const {
    listCategories: { data: listCategories }
  } = useCategoryQuery();
  const { openSidebar, handleOpenSidebar, SidebarMenu } = useSidebarMenu();
  const numberOfLocalModels = Object.values(useCartStore.getState().cartItems).reduce(
    (acc, value) => acc + value,
    0
  );
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
          (selectedMenu === MENU_BAR.cart
            ? ' bg-blue-100 text-blue/1 font-bold p-2 cursor-pointer'
            : '')
        }
        onClick={() => {
          setSelectedMenu(MENU_BAR.cart);
          setIsCategoryItem(false);
          setSelectedCategoryItem({
            id: '',
            name: ''
          });
          setActivePage(1);
        }}
      >
        <div className='relative'>
          <ShoppingCartIcon strokeWidth={2} className='w-6 h-6' />
          <Typography className='absolute px-1 bg-red-400 rounded-[999px] text-white text-[12px] font-bold top-1/3 right-1/3'>
            {isSuccess ? numberOfUserModels : numberOfLocalModels}
          </Typography>
        </div>
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
            <MagnifyingGlassIcon strokeWidth={2} className='w-6 h-6 cursor-pointer' />
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
            numberModels={
              isSuccess && numberOfUserModels ? numberOfUserModels : numberOfLocalModels
            }
          />
        )}
      </div>
    </div>
  );
};
