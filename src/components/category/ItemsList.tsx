import { Button, List, ListItem, Typography, Card, CardBody, Chip } from '@material-tailwind/react';
import { ScreenSize } from '@constants';
import { useScreenSize } from '@hooks';

export const ItemsList: Component<{ items: ItemData[] }> = ({ items }) => {
  const { screenSize } = useScreenSize();

  return screenSize <= ScreenSize.SM ? (
    <List className='grid gap-2 w-full'>
      {items.map((item, index) => (
        <ListItem
          key={index}
          className='flex gap-5 border-2 border-b-gray-400 cursor-pointer rounded-lg p-4'
        >
          <img src={item.image} alt={item.name} className='w-40 h-40 md:w-full md:h-full' />
          <div className='flex flex-col gap-3'>
            <Typography variant='lead' className='font-bold'>
              {item.name}
            </Typography>
            <Typography variant='paragraph'>{item.description}</Typography>
            <Typography variant='paragraph' className='font-bold'>{`${item.price} VNĐ`}</Typography>

            <div className='flex gap-10 items-center'>
              <Typography variant='h6' className='font-bold'>
                {`Đã mua: ${item.numberBought}`}
              </Typography>
              <Button className='bg-red-500 text-white'>Đặt hàng</Button>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  ) : (
    <div className='grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 lg:py-6 lg:gap-3'>
      {items.map((item, index) => (
        <Card
          key={index}
          className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
        >
          <CardBody className='flex flex-col justify-between h-[550px]'>
            <div className='flex flex-col items-center gap-2 line-clamp-4'>
              <img src={item.image} />
              <Typography variant='lead' className='font-bold'>
                {item.name}
              </Typography>
              <Chip color='amber' value={`${item.price} VNĐ`} className='w-fit' />
              <Typography variant='paragraph' className='text-justify'>
                {item.description}
              </Typography>
            </div>
            <div className='flex flex-col items-center gap-2'>
              <Typography variant='h6' className='font-bold'>
                {`Đã mua: ${item.numberBought}`}
              </Typography>
              <Button className='bg-red-500 text-white'>Đặt hàng</Button>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
