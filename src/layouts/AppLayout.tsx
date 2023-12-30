import { Fragment, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogHeader, DialogBody, Typography, Button } from '@material-tailwind/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { AppNavigation, Footer } from '@components/common';
import { MENU_BAR } from '@constants';
import { useAuthMutation, useListenEvent, emitEvent } from '@hooks';
import { useMenuBarStore } from '@states';

export const AppLayout: Component<{ menu: RouteMenu; child: RouteChild }> = ({ menu, child }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { setSelectedMenu, setIsCategoryItem } = useMenuBarStore();
  const { logout } = useAuthMutation();

  useEffect(() => {
    if (pathname === '/home') {
      setSelectedMenu(MENU_BAR.home);
      setIsCategoryItem(false);
    }
    if (pathname.includes('/category')) {
      setSelectedMenu(MENU_BAR.category);
      setIsCategoryItem(true);
    }
    if (pathname === '/cart' || pathname === '/checkout') {
      setSelectedMenu(MENU_BAR.cart);
    }
  }, [pathname, setSelectedMenu, setIsCategoryItem]);

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };
  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      setOpenDialog(false);
      navigate('/');
      setSelectedMenu(MENU_BAR.home);
      emitEvent('refetch:clearModelsInCart');
    } catch (err) {
      throw err;
    }
  };
  const routeItems = useMemo(() => {
    const items: {
      path: string;
      element: React.ReactElement;
      pathReplace?: string;
      elementReplace?: React.ReactElement;
    }[] = [];

    for (const menuItem of menu) {
      if (menuItem === 'divider' || menuItem.type === 'logout-btn') continue;
      items.push({
        path: menuItem.path,
        element: menuItem.element,
        pathReplace: menuItem.pathReplace,
        elementReplace: menuItem.elementReplace
      });
    }
    for (const childItem of child) {
      items.push({ path: childItem.path, element: childItem.element });
    }

    return items;
  }, [menu, child]);

  useListenEvent('logout', handleOpenDialog);

  return (
    <>
      <div className='flex flex-col h-screen sm:min-h-screen'>
        <AppNavigation menu={menu} />
        <div className='flex-1 h-screen overflow-y-scroll bg-gray-200'>
          <Routes>
            {routeItems.map((item, idx) => (
              <Fragment key={idx}>
                <Route path={item.path} element={item.element} />
                {item.pathReplace !== undefined && item.elementReplace !== undefined && (
                  <Route path={item.pathReplace} element={item.elementReplace} />
                )}
              </Fragment>
            ))}
          </Routes>
          <Footer />
        </div>
      </div>
      <Dialog open={openDialog} handler={handleOpenDialog} size='sm'>
        <DialogHeader className='flex justify-center items-center  bg-green-400 h-[150px]'>
          <div className='p-3 border-2 border-white rounded-[999px]'>
            <CheckIcon width={50} color='white' className='' />
          </div>
        </DialogHeader>
        <DialogBody>
          <Typography className='text-center font-bold uppercase text-black mb-3'>
            Are you sure?
          </Typography>
          <Typography className='text-center text-gray-700 mb-3'>
            Do you want to log out?
          </Typography>
          <div className='flex justify-center gap-10 bg-none'>
            <Button
              className='border-none shadow-none p-5 w-[150px] bg-[transparent] text-black'
              onClick={handleOpenDialog}
            >
              No
            </Button>
            <Button className='p-3 w-[150px] bg-green-300' onClick={handleLogout}>
              Yes
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};
