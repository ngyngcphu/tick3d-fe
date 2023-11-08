import { useParams } from 'react-router-dom';
import { useItemStore } from '@states/home';
import { useEffect, useState } from 'react';
import { ImageSlider } from '@components/model';
import { Typography } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
export function DetailModelPage() {
  const [numberModel, setNumberModel] = useState<number>(1);
  const { itemData, getItemData } = useItemStore();
  useEffect(() => {
    getItemData();
  }, []);
  const params = useParams();
  const modelId = params.id;
  const model = itemData.find((item) => item.id.toString() === modelId);
  const images = [model?.image, model?.subImage1, model?.subImage2];
  return (
    <div className='px-6 py-3 lg:px-[100px] lg:py-[120px] lg:bg-white'>
      <div className='flex flex-col lg:flex-row'>
        <ImageSlider images={images} />
        <div className='lg:w-[30%]'>
          <Typography className='font-bold text-2xl lg:mb-3'>{model?.name}</Typography>
          <Typography className='text-red-500 font-bold lg:mb-3'>
            {`${model?.price} VNĐ`}
          </Typography>
          <Typography className='font-bold lg:mb-3'>Thông tin chi tiết</Typography>
          <Typography className='lg:mb-3'>{model?.description}</Typography>
          <Typography>Số lượng</Typography>
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
          <button className='text-red-500 font-bold text-center block w-full p-3 border-2 border-red-500 mb-2 lg:w-[300px]'>
            Thêm vào giỏ hàng
          </button>
          <button className='bg-red-500 font-bold text-center w-full text-white p-3 lg:w-[300px]'>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
