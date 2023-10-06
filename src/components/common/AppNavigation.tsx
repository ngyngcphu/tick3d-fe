import { Chip } from '@material-tailwind/react';
import tick3D from '@assets/tick3D-logo.svg';
import { AppDrawer, DesktopNavbar, ToggleSidebarBtn, useSidebarMenu } from '@components/common';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export const AppNavigation: Component<{ mainMenu: RouteMenu; subMenu: RouteMenu }> = ({
  mainMenu,
  subMenu
}) => {
  const { screenSize } = useScreenSize();
  const { openSidebar, handleOpenSidebar, SidebarMenu } = useSidebarMenu();

  return (
    <div className='w-full max-h-[768px] px-6 lg:px-9 py-3 shadow-md lg:sticky'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex items-center justify-between w-full lg:hidden'>
          <div
            className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100 mr-4'
            onClick={handleOpenSidebar}
          >
            <ToggleSidebarBtn open={openSidebar} />
          </div>
          <img className='w-12 h-12' src={tick3D} alt='tick3D-logo' />
          <Chip className='normal-case' variant='outlined' value='Sign up' />
        </div>
        {screenSize < ScreenSize.LG ? (
          <AppDrawer open={openSidebar} onClose={handleOpenSidebar}>
            <SidebarMenu mainMenu={mainMenu} subMenu={subMenu} />
          </AppDrawer>
        ) : (
          <DesktopNavbar mainMenu={mainMenu} />
        )}
      </div>
    </div>
  );
};
