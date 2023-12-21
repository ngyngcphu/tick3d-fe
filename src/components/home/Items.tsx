import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { homeService } from '@services';
import { retryQueryFn } from '@utils';
import { useQuery } from '@tanstack/react-query';

export function Items() {
  const navigate = useNavigate();

  const { data: items } = useQuery({
    queryKey: ['topModels'],
    queryFn: () => homeService.getTopModels(8, 'numberBought', 'desc'),
    retry: retryQueryFn
  });

  return (
    <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:py-6 lg:px-4 lg:gap-3'>
      {items &&
        items.models.map((item, index) => (
          <Card
            key={index}
            className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
            onClick={() => navigate(`/category/${item.id}`)}
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
                <Button
                  className='bg-red-500 text-white normal-case text-sm md:text-base'
                  onClick={(event) => event.stopPropagation()}
                >
                  Thêm vào giỏ
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}
