import { Slides } from '@components/home';
import { useEffect } from 'react';
import { useSlideStore, useItemStore } from '@states/common';
import { Typography } from '@material-tailwind/react';
import { PhoneIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { Items } from '@components/home';
export function HomePage() {
  const { slideData, getSlideData } = useSlideStore();
  const { itemData, getItemData } = useItemStore();
  useEffect(() => {
    getSlideData();
    getItemData();
  }, [getSlideData, getItemData]);
  return (
    <div className='bg-gray'>
      <div className='relative'>
        <Slides slides={slideData} />
      </div>
      <div className='p-4 lg:p-16 text-center bg-white'>
        <Typography className='text-xl px-8 mb-5 lg:text-[40px] lg:mb-8 font-bold'>
          Dễ dàng tiếp cận. Tự do sáng tạo
        </Typography>
        <Typography className='text-sm'>
          Các mẫu đơn giản, đa dạng có sẵn giúp dễ dàng tiếp cận. Tải lên mẫu cho các yêu cầu nâng
          cao.
        </Typography>
      </div>
      <div className='py-11 flex flex-col lg:flex-row justify-center items-center gap-6'>
        <div className='flex items-center p-4 lg:flex-col lg:px-3 bg-white pb-4 w-[250px] shadow-md hover:shadow-xl hover:bg-red-400 hover:text-white cursor-pointer'>
          <div className='lg:bg-gray-300 lg:w-full py-2 flex lg:justify-center mb-6 mr-2'>
            <ClockIcon color='red' width={24} />
          </div>
          <div className='lg:text-center'>
            <Typography className='lg:mb-6'>Thứ 2 - Chủ nhật</Typography>
            <Typography>9:00 am - 8:00 pm</Typography>
          </div>
        </div>
        <div className='flex items-center p-4 lg:flex-col lg:px-3 bg-white pb-4 w-[250px] shadow-md hover:shadow-xl hover:bg-red-400 hover:text-white cursor-pointer'>
          <div className='lg:bg-gray-300 lg:w-full py-2 flex lg:justify-center mb-6 mr-2'>
            <MapPinIcon color='red' width={24} />
          </div>
          <div className='lg:text-center'>
            <Typography className='lg:mb-6'>307A, Tô Hiến Thành</Typography>
            <Typography>Quận 10, Tp. Hồ Chí Minh</Typography>
          </div>
        </div>
        <div className='flex items-center p-4 lg:flex-col lg:px-3 bg-white pb-4 w-[250px] shadow-md hover:shadow-xl hover:bg-red-400 hover:text-white cursor-pointer'>
          <div className='lg:bg-gray-300 lg:w-full py-2 flex justify-center mb-6 mr-2'>
            <PhoneIcon color='red' width={24} />
          </div>
          <div className='lg:text-center'>
            <Typography className='lg:mb-6'>(+84) 123 456 7890</Typography>
            <Typography>(+84) 987 654 32100</Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography className='font-bold'>Mô hình 3D được mua nhiều tại cửa hàng</Typography>
        <Items items={itemData} />
      </div>
    </div>
  );
}
