import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-tailwind/react';
import tick3D from '@assets/tick3D-logo.svg';
import { useMenuBarStore } from '@states/common';

export const DesktopNavbar: Component<{ mainMenu: RouteMenu }> = ({ mainMenu }) => {
  const { selectedMenu, setSelectedMenu } = useMenuBarStore();

  return (
    <div className='flex'>
      <div className='max-w-[50px] max-h-[50px] ml-0 mr-3 object-cover'>
        <img className='w-full h-full' src={tick3D} alt='tick3D-logo'></img>
      </div>
      <List className='p-0 flex-row -ml-3 max-w-[calc(100%-36px)]'>
        {mainMenu.map((menuItem, idx) => (
          <Link key={idx} to='#'>
            <ListItem
              className={
                'hover:bg-gray/1 focus:bg-blue-100 active:bg-blue-100 focus:text-blue/1 active:text-blue/1 focus:font-bold active:font-bold px-6 py-3 text-gray/4 font-medium rounded-lg text-xl ml-6 w-fit text-center' +
                (selectedMenu === menuItem.name
                  ? ' bg-blue-100 text-blue/1 font-bold pointer-events-none'
                  : '')
              }
              onClick={() => setSelectedMenu(menuItem.name)}
            >
              {menuItem.name}
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );
};
