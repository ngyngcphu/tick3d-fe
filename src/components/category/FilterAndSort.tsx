import { Button, Select, Option } from '@material-tailwind/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export const FilterAndSort: Component<{ toggleDrawer: () => void }> = ({ toggleDrawer }) => {
  const { screenSize } = useScreenSize();

  return (
    <div className='flex justify-between items-center pe-6'>
      <div className='flex gap-10 justify-center md:justify-start items-center m-5'>
        <Button
          onClick={toggleDrawer}
          variant='outlined'
          size='md'
          className='flex items-center justify-evenly gap-2'
        >
          <AdjustmentsHorizontalIcon className='w-5 h-5 flex-shrink-0' />
          <div className='flex-1'>Filter</div>
        </Button>
        <div className='w-72'>
          <Select label='Sort by' size='lg'>
            <Option>Most Popular</Option>
            <Option>Price</Option>
            <Option>Like</Option>
            <Option>Upload Time</Option>
          </Select>
        </div>
      </div>
      {screenSize > ScreenSize.MD ? <div>10000 results</div> : null}
    </div>
  );
};
