import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-tailwind/react';
import { ToggleSidebarBtn } from '@components/common';
import { useMenuBarStore } from '@states/common';

export function useSidebarMenu() {
  const { selectedMenu, setSelectedMenu } = useMenuBarStore();

  const ITEM_CLASSNAME =
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold h-14 px-6 py-4 rounded-none text-gray/4 font-medium';
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const SidebarMenu: Component<{ mainMenu: RouteMenu; subMenu: RouteMenu }> = useMemo(
    () =>
      ({ mainMenu, subMenu }) => {
        return (
          <>
            <div className='h-11 pt-4 px-6 flex items-center gap-1 self-stretch'>
              <div
                className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100 mr-4'
                onClick={() => setOpenSidebar(false)}
              >
                <ToggleSidebarBtn open={openSidebar} />
              </div>
              <div className='flex'>
                <img className='w-7 h-7 mr-2' src={''}></img>
                <img className='w-7 h-7' src={''}></img>
              </div>
            </div>
            <div className='min-h-[90%] mt-10 flex flex-col justify-between pb-4'>
              <List className='p-0'>
                {mainMenu.map((menuItem, idx) => (
                  <Link key={idx} to='#'>
                    <ListItem
                      className={
                        ITEM_CLASSNAME +
                        (selectedMenu === menuItem.name
                          ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                          : '')
                      }
                      onClick={() => {
                        setSelectedMenu(menuItem.name);
                        setOpenSidebar(false);
                      }}
                    >
                      {menuItem.name}
                    </ListItem>
                  </Link>
                ))}
              </List>
              <List className='p-0'>
                {subMenu.map((menuItem, idx) => (
                  <Link key={idx} to='#'>
                    <ListItem
                      className={
                        ITEM_CLASSNAME +
                        (selectedMenu === menuItem.name
                          ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                          : '')
                      }
                      onClick={() => {
                        setSelectedMenu(menuItem.name);
                        setOpenSidebar(false);
                      }}
                    >
                      {menuItem.name}
                    </ListItem>
                  </Link>
                ))}
              </List>
            </div>
          </>
        );
      },
    [openSidebar, selectedMenu, setSelectedMenu]
  );

  return {
    openSidebar: openSidebar,
    handleOpenSidebar: () => setOpenSidebar(!openSidebar),
    SidebarMenu: SidebarMenu
  };
}
