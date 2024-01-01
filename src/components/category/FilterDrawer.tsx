import React, { ReactNode } from 'react';
import { Chip, Drawer, IconButton } from '@material-tailwind/react';

export const FilterDrawer: Component<{
  open: boolean;
  noItems: number;
  children: ReactNode;
  onClose: () => void;
}> = ({ open, noItems, children, onClose }) => {
  return (
    <React.Fragment>
      <Drawer placeholder='' placement='right' open={open} onClose={onClose} className='p-4'>
        <div className='flex flex-col gap-3 items-center justify-end'>
          <div className='flex items-center justify-between w-full'>
            <Chip value={<span className='normal-case'>{noItems} results</span>}></Chip>
            <IconButton
              placeholder=''
              variant='text'
              color='blue-gray'
              onClick={onClose}
              className='self-end'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </div>
          {children}
        </div>
      </Drawer>
    </React.Fragment>
  );
};
