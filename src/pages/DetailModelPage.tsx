import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Typography } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { ImageSlider } from '@components/model';
import { defaultModelService } from '@services';
import { retryQueryFn } from '@utils';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function DetailModelPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: modelData } = useQuery({
    queryKey: [`/api/model/{id}`, id],
    queryFn: () => (id ? defaultModelService.getById(id) : null),
    retry: retryQueryFn
  });
  const [numberModel, setNumberModel] = useState<number>(1);

  return (
    <div className='px-6 py-3 lg:items-center lg:justify-items-center lg:bg-white'>
      {modelData ? (
        <div className='flex flex-col lg:flex-row lg:my-12'>
          <ImageSlider
            images={[modelData.imageUrl, modelData.subImages[0], modelData.subImages[1]]}
          />
          <div className='lg:w-[50%]'>
            <Typography className='font-bold text-2xl lg:mb-3'>{modelData.name}</Typography>
            {modelData?.discount ? (
              <div>
                <Chip
                  value={`-${modelData.discount * 100}%`}
                  color='red'
                  className='w-fit rounded-full'
                />
                <Typography className='text-black font-bold lg:mb-3 line-through'>
                  {`${modelData.price.toLocaleString('en-US')} VNĐ`}
                </Typography>
                <Typography className='text-red-500 font-bold lg:mb-3'>
                  {`${(modelData.price * (1 - modelData.discount)).toLocaleString('en-US')} VNĐ`}
                </Typography>
              </div>
            ) : (
              <Typography className='text-red-500 font-bold lg:mb-3'>
                {`${modelData.price.toLocaleString('en-US')} VNĐ`}
              </Typography>
            )}
            <Typography className='font-bold lg:mb-3' variant='h6'>
              Thông tin chi tiết
            </Typography>
            <Typography className='lg:mb-3' variant='paragraph'>
              {modelData?.description}
            </Typography>
            <Typography variant='h6'>Số lượng</Typography>
            <div className='flex items-center gap-8 w-[120px] border-gray-400 border-2 p-2 my-3 lg:mb-6'>
              <MinusIcon
                width={20}
                className='cursor-pointer'
                onClick={() => {
                  if (numberModel > 1) {
                    setNumberModel(numberModel - 1);
                  }
                }}
              />
              {numberModel}
              <PlusIcon
                width={20}
                className='cursor-pointer'
                onClick={() => {
                  setNumberModel(numberModel + 1);
                }}
              />
            </div>
            <button
              className='text-red-500 font-bold text-center block w-full p-3 border-2 border-red-500 mb-2 lg:w-[300px]'
              onClick={() => navigate('/cart')}
            >
              Thêm vào giỏ hàng
            </button>
            <button
              className='bg-red-500 font-bold text-center w-full text-white p-3 lg:w-[300px]'
              onClick={() => navigate('/checkout')}
            >
              Mua ngay
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
