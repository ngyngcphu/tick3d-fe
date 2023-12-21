import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemSuffix, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import tick3D from '@assets/tick3D-logo.svg';
import { ToggleSidebarBtn } from '@components/common';
import { MENU_BAR } from '@constants';
import { useUserQuery } from '@hooks';
import { useMenuBarStore, usePaginationStore } from '@states';

export function useSidebarMenu() {
  const {
    info: { data, isSuccess }
  } = useUserQuery();

  const {
    selectedMenu,
    isCategoryItem,
    selectedCategoryItem,
    setSelectedMenu,
    setIsCategoryItem,
    setSelectedCategoryItem
  } = useMenuBarStore();
  const { setActivePage } = usePaginationStore();

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const SIDEBAR_ITEM_CLASSNAME =
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold h-14 px-6 py-4 rounded-none text-gray/4 font-medium';
  const CATEGORYBAR_ITEM_CLASSNAME =
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold px-6 rounded-none text-gray/4 font-medium';

  const CategoryBar: Component<{ listCategories: Category[] }> = useMemo(
    () =>
      ({ listCategories }) => {
        return (
          <>
            <div
              className='flex items-center gap-2 p-4 bg-gray-100 rounded-t-2xl cursor-pointer'
              onClick={() => setIsCategoryItem(false)}
            >
              <ChevronLeftIcon className='w-5 h-5' />
              <Typography variant='h6'>{MENU_BAR.category}</Typography>
            </div>
            <div className='flex flex-col'>
              <List className='p-0'>
                {listCategories.map((item, idx) => (
                  <ListItem
                    key={idx}
                    className={
                      CATEGORYBAR_ITEM_CLASSNAME +
                      (selectedCategoryItem.name === item.name
                        ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                        : '')
                    }
                    onClick={() => {
                      setSelectedCategoryItem(item);
                      setActivePage(1);
                      setOpenSidebar(false);
                    }}
                  >
                    {item.name}
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        );
      },
    [selectedCategoryItem, setSelectedCategoryItem, setIsCategoryItem, setActivePage]
  );

  const SidebarMenu: Component<{ menu: RouteMenu; listCategories: Category[] }> = useMemo(
    () =>
      ({ menu, listCategories }) => {
        if (isCategoryItem === true) {
          return <CategoryBar listCategories={listCategories} />;
        }

        return (
          <>
            <div className='p-4 flex items-center justify-between bg-gray-100 rounded-t-2xl'>
              {isSuccess ? (
                <div className='flex items-center gap-2'>
                  <Avatar src='https://docs.material-tailwind.com/img/face-2.jpg' alt='avatar' />
                  <div>
                    <Typography variant='h6'>Tania Andrew</Typography>
                    <Typography variant='small' color='gray' className='font-normal'>
                      {data ? data.email : ''}
                    </Typography>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-2'>
                  <img className='w-10 h-10' src={tick3D} alt='tick3D-logo'></img>
                  <Typography variant='h5'>Tick3D</Typography>
                </div>
              )}
              <div
                className='cursor-pointer opacity-40 focus:opacity-100 active:opacity-100'
                onClick={() => setOpenSidebar(false)}
              >
                <ToggleSidebarBtn open={openSidebar} />
              </div>
            </div>
            <div className='flex flex-col'>
              <List className='p-0'>
                {menu.map((menuItem, idx) => {
                  if (menuItem === 'divider') {
                    return <hr key={idx} className='my-2 border-blue-gray-100' />;
                  }
                  if (menuItem.type === 'item') {
                    if (menuItem.name === MENU_BAR.category) {
                      return (
                        <Link key={idx} to={menuItem.path}>
                          <ListItem
                            className={
                              SIDEBAR_ITEM_CLASSNAME +
                              (selectedMenu === menuItem.name
                                ? ' bg-blue-100 text-blue/1 font-bold'
                                : '')
                            }
                            onClick={() => {
                              setSelectedMenu(menuItem.name);
                              setIsCategoryItem(true);
                              setSelectedCategoryItem({
                                id: '',
                                name: 'All things'
                              });
                              setActivePage(1);
                            }}
                          >
                            {menuItem.name}
                            <ListItemSuffix>
                              <ChevronRightIcon className='w-5 h-5' />
                            </ListItemSuffix>
                          </ListItem>
                        </Link>
                      );
                    }
                    return (
                      <Link
                        key={idx}
                        to={
                          menuItem.name !== MENU_BAR.loginOrStar &&
                          menuItem.name !== MENU_BAR.signupOrOrder
                            ? menuItem.path
                            : isSuccess && menuItem.pathReplace
                            ? menuItem.pathReplace
                            : menuItem.path
                        }
                      >
                        <ListItem
                          className={
                            SIDEBAR_ITEM_CLASSNAME +
                            (selectedMenu === menuItem.name
                              ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                              : '')
                          }
                          onClick={() => {
                            setSelectedMenu(menuItem.name);
                            setOpenSidebar(false);
                            setSelectedCategoryItem({
                              id: '',
                              name: ''
                            });
                            setActivePage(1);
                          }}
                        >
                          {menuItem.name !== MENU_BAR.loginOrStar &&
                            menuItem.name !== MENU_BAR.signupOrOrder &&
                            menuItem.name}
                          {menuItem.name === MENU_BAR.loginOrStar &&
                            (isSuccess ? MENU_BAR.star : menuItem.name)}
                          {menuItem.name === MENU_BAR.signupOrOrder &&
                            (isSuccess ? MENU_BAR.order : menuItem.name)}
                        </ListItem>
                      </Link>
                    );
                  }
                  if (isSuccess && menuItem.type === 'logout-btn') {
                    return (
                      <ListItem
                        key={idx}
                        className={SIDEBAR_ITEM_CLASSNAME}
                        onClick={menuItem.onClick}
                      >
                        {menuItem.name}
                      </ListItem>
                    );
                  }
                })}
              </List>
            </div>
          </>
        );
      },
    [
      openSidebar,
      selectedMenu,
      isCategoryItem,
      isSuccess,
      data,
      CategoryBar,
      setSelectedMenu,
      setIsCategoryItem,
      setSelectedCategoryItem,
      setActivePage
    ]
  );

  return {
    openSidebar: openSidebar,
    handleOpenSidebar: () => setOpenSidebar(!openSidebar),
    SidebarMenu: SidebarMenu
  };
}
