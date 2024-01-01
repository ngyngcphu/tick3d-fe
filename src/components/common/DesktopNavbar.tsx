import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge, Chip, List, ListItem, Tooltip, Typography } from '@material-tailwind/react';
import { ShoppingCartIcon, StarIcon } from '@heroicons/react/24/outline';
import tick3D from '@assets/tick3D-logo.svg';
import { MENU_BAR } from '@constants';
import { useUserQuery } from '@hooks';
import { useMenuBarStore, usePaginationStore } from '@states';
import { DesktopSearchDefaultModel } from './SearchDefaultModelBar';

export const DesktopNavbar: Component<{
  menu: RouteMenu;
  listCategories: Category[];
  totalCartItems: number;
}> = ({ menu, listCategories, totalCartItems }) => {
  const {
    info: { data, isSuccess }
  } = useUserQuery();

  const {
    selectedMenu,
    selectedCategoryItem,
    setSelectedMenu,
    setSelectedCategoryItem,
    setIsCategoryItem
  } = useMenuBarStore();
  const { setActivePage } = usePaginationStore();

  const [openPopoverCategory, setOpenPopoverCategory] = useState<boolean>(false);
  const [openPopoverAvatar, setOpenPopoverAvatar] = useState<boolean>(false);

  const triggersCategory = {
    onMouseEnter: () => setOpenPopoverCategory(true),
    onMouseLeave: () => setOpenPopoverCategory(false)
  };
  const triggersAvatar = {
    onMouseEnter: () => setOpenPopoverAvatar(true),
    onMouseLeave: () => setOpenPopoverAvatar(false)
  };
  const NAVBAR_ITEM_CLASSNAME =
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold text-gray/4 font-medium rounded-lg text-lg w-fit text-center';
  const CATEGORYLIST_ITEM_CLASSNAME =
    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold px-6 rounded-none text-gray/4 font-medium';

  return (
    <div className='flex items-center'>
      <div className='max-w-[40px] max-h-[40px] ml-0 mr-3 object-cover'>
        <img className='w-full h-full' src={tick3D} alt='tick3D-logo'></img>
      </div>
      <List placeholder='' className='p-0 flex flex-row items-center gap-3 max-w-[calc(100%-36px)]'>
        {menu.map((menuItem, idx) => {
          if (menuItem === 'divider') return;
          if (menuItem.type === 'item') {
            if (menuItem.name === MENU_BAR.category)
              return (
                <Tooltip
                  key={idx}
                  open={openPopoverCategory}
                  handler={setOpenPopoverCategory}
                  {...triggersCategory}
                  className='bg-white'
                  content={
                    <List placeholder='' className='p-0'>
                      {listCategories.map((item, idx) => (
                        <ListItem
                          placeholder=''
                          key={idx}
                          className={
                            CATEGORYLIST_ITEM_CLASSNAME +
                            (selectedCategoryItem.name === item.name
                              ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                              : '')
                          }
                          onClick={() => {
                            setSelectedMenu(menuItem.name);
                            setSelectedCategoryItem(item);
                            setActivePage(1);
                          }}
                        >
                          {item.name}
                        </ListItem>
                      ))}
                    </List>
                  }
                >
                  <Link to={menuItem.path}>
                    <ListItem
                      placeholder=''
                      className={
                        NAVBAR_ITEM_CLASSNAME +
                        (selectedMenu === menuItem.name ? ' bg-blue-100 text-blue/1 font-bold' : '')
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
                    </ListItem>
                  </Link>
                </Tooltip>
              );
            if (menuItem.name === MENU_BAR.uploadOrDashboard)
              return (
                <div key={idx} className='flex items-center gap-4'>
                  <div className='min-w-[350px] xl:min-w-[500px] flex justify-center items-center'>
                    <div className='flex flex-col justify-start items-start h-[40px] w-full'>
                      <DesktopSearchDefaultModel />
                    </div>
                  </div>
                  <Link
                    to={
                      isSuccess && data?.role === 'MANAGER' && menuItem.pathReplace
                        ? menuItem.pathReplace
                        : menuItem.path
                    }
                  >
                    <ListItem
                      placeholder=''
                      className={
                        NAVBAR_ITEM_CLASSNAME +
                        (selectedMenu === menuItem.name
                          ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                          : '')
                      }
                      onClick={() => {
                        setSelectedMenu(menuItem.name);
                        setIsCategoryItem(false);
                        setSelectedCategoryItem({
                          id: '',
                          name: ''
                        });
                        setActivePage(1);
                      }}
                    >
                      <span className='truncate'>
                        {isSuccess && data?.role === 'MANAGER' ? MENU_BAR.dashboard : menuItem.name}
                      </span>
                    </ListItem>
                  </Link>
                  <Link to='/cart'>
                    <ListItem
                      placeholder=''
                      className={
                        NAVBAR_ITEM_CLASSNAME +
                        (selectedMenu === MENU_BAR.cartOrTrackingOrder
                          ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
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
                      {totalCartItems > 0 ? (
                        <Badge content={totalCartItems}>
                          <ShoppingCartIcon strokeWidth={2} className='w-6 h-6' />
                        </Badge>
                      ) : (
                        <ShoppingCartIcon strokeWidth={2} className='w-6 h-6' />
                      )}
                    </ListItem>
                  </Link>
                </div>
              );
            return (
              <Link
                key={idx}
                to={
                  menuItem.name !== MENU_BAR.loginOrStar && menuItem.name !== MENU_BAR.signupOrOrder
                    ? menuItem.path
                    : isSuccess && menuItem.pathReplace
                    ? menuItem.pathReplace
                    : menuItem.path
                }
              >
                <ListItem
                  placeholder=''
                  className={
                    'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold text-gray/4 font-medium rounded-lg text-lg w-fit text-center' +
                    (selectedMenu === menuItem.name
                      ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                      : '')
                  }
                  onClick={() => {
                    setSelectedMenu(menuItem.name);
                    setIsCategoryItem(false);
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
                    (isSuccess ? (
                      <StarIcon strokeWidth={2} className='w-6 h-6 cursor-pointer' />
                    ) : (
                      <Chip
                        variant='outlined'
                        size='lg'
                        value={<span className='normal-case text-sm'>{menuItem.name}</span>}
                      />
                    ))}
                  {menuItem.name === MENU_BAR.signupOrOrder &&
                    (isSuccess ? (
                      <span className='truncate'>{MENU_BAR.order}</span>
                    ) : (
                      <Chip
                        size='lg'
                        value={<span className='normal-case text-sm'>{menuItem.name}</span>}
                      />
                    ))}
                </ListItem>
              </Link>
            );
          }
          if (isSuccess && menuItem.type === 'logout-btn') {
            return (
              <Tooltip
                key={idx}
                open={openPopoverAvatar}
                handler={setOpenPopoverAvatar}
                {...triggersAvatar}
                className='bg-white shadow-2xl'
                placement='bottom-end'
                content={
                  <>
                    <div className='flex items-center gap-2'>
                      <Avatar
                        placeholder=''
                        src='https://docs.material-tailwind.com/img/face-2.jpg'
                        alt='avatar'
                      />
                      <div>
                        <Typography placeholder='' variant='h6' color='gray'>
                          {data ? data.VnFormatName : ''}
                        </Typography>
                        <Typography
                          placeholder=''
                          variant='small'
                          color='gray'
                          className='font-normal'
                        >
                          {data ? data.email : ''}
                        </Typography>
                      </div>
                    </div>
                    <hr className='my-1' />
                    <List placeholder='' className='p-0'>
                      <ListItem placeholder='' onClick={menuItem.onClick}>
                        {menuItem.name}
                      </ListItem>
                    </List>
                  </>
                }
              >
                <Avatar
                  placeholder=''
                  size='sm'
                  src='https://docs.material-tailwind.com/img/face-2.jpg'
                  alt='avatar'
                  className='ml-3 cursor-pointer'
                />
              </Tooltip>
            );
          }
        })}
      </List>
    </div>
  );
};
