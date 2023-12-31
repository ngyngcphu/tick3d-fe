import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Typography } from '@material-tailwind/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { ImageSlider } from '@components/model';
import { defaultModelService, cartService } from '@services';
import { retryQueryFn } from '@utils';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useCartStore } from '@states';
import { useUserQuery, useCartQuery } from '@hooks';
//import { toast } from 'react-toastify';
//import { useCartStore, useMenuBarStore } from '@states';
//import { useUserQuery } from '@hooks';
//import { MENU_BAR } from '@constants';

export function DetailModelPage() {
  const { listFlagIsModelAdded, setListFlagIsModelAdded, create: addModelToCart } = useCartStore();
  //const { setSelectedMenu } = useMenuBarStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    info: { isSuccess }
  } = useUserQuery();
  const { data: modelData } = useQuery({
    queryKey: [`/api/model/{id}`, id],
    queryFn: () => (id ? defaultModelService.getById(id) : null),
    retry: retryQueryFn
  });
  const {
    listModelsInCart: { refetch: refetchTotalModelsInCart }
  } = useCartQuery();
  // const { data: modelCartList } = useQuery({
  //   queryKey: ['/api/cart'],
  //   queryFn: () => cartService.getCart(),
  //   retry: retryQueryFn,
  //   enabled: isSuccess
  // });
  const addToUserCart = useMutation({
    mutationKey: ['/api/cart'],
    mutationFn: (data: { models: CartCreationPayload[] }) => cartService.create(data)
  });
  const handleAddtoUserCart = async (data: { models: CartCreationPayload[] }) => {
    try {
      await addToUserCart.mutateAsync(data);
      await refetchTotalModelsInCart();
    } catch (e) {
      alert(e);
    }
  };
  const [numberModel, setNumberModel] = useState<number>(1);

  // const handleAddToCart = async () => {
  //   try {
  //     if (id) {
  //       useCartStore.getState().addToCart(id, numberModel);
  //       const cartdatas = useCartStore.getState().cartdatas;
  //       const data = {
  //         models: Object.keys(cartdatas).map((modelId) => ({
  //           id: modelId,
  //           quantity: cartdatas[modelId]
  //         }))
  //       };
  //       if (isSuccess) {
  //         await addToCart.mutateAsync(data);
  //       }
  //       navigate('/cart');
  //       setSelectedMenu(MENU_BAR.cart);
  //     } else {
  //       toast.error('Không tìm thấy ID sản phẩm');
  //     }
  //   } catch (err) {
  //     toast.error(err as string);
  //   }
  // };
  return (
    <div className='px-6 py-3 lg:datas-center lg:justify-datas-center lg:bg-white'>
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
                  value={`-${Math.round(modelData.discount * 100)}%`}
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
            <div className='flex datas-center gap-8 w-[120px] border-gray-400 border-2 p-2 my-3 lg:mb-6'>
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
              className={
                !listFlagIsModelAdded[modelData.id]
                  ? 'text-red-500  border-red-500 font-bold text-center block w-full p-3 border-2  mb-2 lg:w-[300px]'
                  : 'text-blue-500 border-blue-500 font-bold text-center block w-full p-3 border-2  mb-2 lg:w-[300px]'
              }
              onClick={(event) => {
                event.stopPropagation();
                if (isSuccess && !listFlagIsModelAdded[modelData.id]) {
                  handleAddtoUserCart({
                    models: [
                      {
                        id: modelData.id,
                        quantity: numberModel
                      }
                    ]
                  });
                  setListFlagIsModelAdded(modelData.id, true);
                } else if (!isSuccess && !listFlagIsModelAdded[modelData.id]) {
                  addModelToCart({
                    id: modelData.id,
                    image: modelData.imageUrl,
                    name: modelData.name,
                    discount: modelData.discount ?? 0,
                    price: modelData.price,
                    quantity: numberModel
                  });
                  setListFlagIsModelAdded(modelData.id, true);
                } else {
                  navigate('/cart');
                }
              }}
            >
              {listFlagIsModelAdded[modelData.id] ? 'Đi đến giỏ hàng' : 'Thêm vào giỏ hàng'}
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
