import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  CardBody,
  Chip,
  List,
  ListItem,
  Select,
  Option,
  Typography
} from '@material-tailwind/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { FilterDrawer, FilterAccordion } from '@components/category';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';
import { defaultModelService } from '@services';
import { retryQueryFn } from '@utils';

export function CategoryPage() {
  const { data: listModels } = useQuery({
    queryKey: ['/api/model'],
    queryFn: () => defaultModelService.getAll(),
    retry: retryQueryFn
  });

  const { screenSize } = useScreenSize();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const mockData = [
    {
      id: 1,
      image: '',
      subImage1: '',
      subImage2: '',
      name: '',
      discount: 0,
      price: 0,
      description: '',
      numberBought: 0
    }
  ];

  return (
    <>
      <div className='flex md:justify-between items-center md:pe-6'>
        <div className='flex gap-10 justify-center md:justify-start items-center m-5'>
          <Button
            onClick={() => setOpenDrawer(!openDrawer)}
            variant='outlined'
            size='md'
            className='flex items-center gap-2'
          >
            <AdjustmentsHorizontalIcon className='w-5 h-5' />
            Filter
          </Button>
          <div className='w-fit'>
            <Select
              label='Sort by'
              size='md'
              color='blue-gray'
              labelProps={{ className: 'text-black' }}
            >
              <Option>Most Popular</Option>
              <Option>Price</Option>
              <Option>Like</Option>
              <Option>Upload Time</Option>
            </Select>
          </div>
        </div>
        {screenSize > ScreenSize.MD ? <span>10000 results</span> : null}
      </div>
      <div className='flex mx-5'>
        {screenSize > ScreenSize.MD ? (
          <div className={openDrawer ? 'w-52 pe-5' : ''}>{openDrawer && <FilterAccordion />}</div>
        ) : null}
        {screenSize <= ScreenSize.SM ? (
          <List className='grid gap-2 w-full'>
            {mockData.map((item, index) => (
              <ListItem
                key={index}
                className='flex gap-5 border-2 border-b-gray-400 cursor-pointer rounded-lg p-4'
              >
                <img src={item.image} alt={item.name} className='w-40 h-40 md:w-full md:h-full' />
                <div className='flex flex-col gap-3'>
                  <Typography variant='lead' className='font-bold truncate'>
                    {item.name}
                  </Typography>
                  <Typography variant='paragraph'>{item.description}</Typography>
                  <Chip
                    color='amber'
                    value={`${item.price.toLocaleString('en-US')} VNĐ`}
                    className='w-fit'
                  />

                  <div className='flex items-center justify-between'>
                    <Typography variant='h6' className='font-bold'>
                      {`Đã mua: ${item.numberBought}`}
                    </Typography>
                    <Button className='bg-red-500 text-white normal-case truncate p-4'>
                      Đặt hàng
                    </Button>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:py-6 lg:px-4 lg:gap-3'>
            {listModels &&
              listModels.map((item, index) => (
                <Card
                  key={index}
                  className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
                >
                  <CardBody className='flex flex-col justify-between h-[500px]'>
                    <div className='line-clamp-4'>
                      <img src={item.imageUrl} />
                      <Typography variant='lead' className='font-bold'>
                        {item.name}
                      </Typography>
                      <Chip
                        color='amber'
                        value={`${item.price.toLocaleString('en-US')} VNĐ`}
                        className='w-fit'
                      />
                      <Typography variant='paragraph'>{item.description}</Typography>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='h6' className='font-bold'>
                        {`Đã mua: ${item.numberBought}`}
                      </Typography>
                      <Button className='bg-red-500 text-white'>Đặt hàng</Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
          </div>
        )}
      </div>
      {screenSize <= ScreenSize.MD ? (
        <FilterDrawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <FilterAccordion closeDrawer={() => setOpenDrawer(false)} />
        </FilterDrawer>
      ) : null}
    </>
  );
}
