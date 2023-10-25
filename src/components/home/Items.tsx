import { Typography, Button } from '@material-tailwind/react';

export const Items: Component<{ items: ItemData[] }> = ({ items }) => {
  return (
    <div className='grid grid-cols-2 gap-2  lg:grid-cols-4 lg:py-6 lg:px-24 lg:gap-3'>
      {items.map((item, index) => (
        <div
          className='p-3  border-2 border-gray-400 hover:border-gray-600 flex flex-col items-center rounded-lg '
          key={index}
        >
          <img src={item.image} />
          <div className='lg:p-12 lg:-mt-4 lg:text-justify'>
            <Typography className='font-bold'>{item.name}</Typography>
            <Typography className='mb-2'>{`${item.price} VNĐ`}</Typography>
            <Typography className='h-[120px] lg:h-auto'>{item.description}</Typography>
            <Typography className='font-bold mt-3 mb-3 lg:mb-0'>
              {`Đã mua: ${item.numberBought}`}
            </Typography>
          </div>
          <Button className='bg-red-500 text-white lg:-mt-3'>Đặt hàng</Button>
        </div>
      ))}
    </div>
  );
};
