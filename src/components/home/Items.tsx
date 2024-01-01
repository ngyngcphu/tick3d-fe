import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, CardBody, Chip, Typography } from '@material-tailwind/react';
import { homeService } from '@services';
import { useCartStore } from '@states';
import { retryQueryFn } from '@utils';
import { useCartQuery, useCartMutation } from '@hooks';
import { SORT_ORDER } from '@constants';

export function Items() {
  const { createCart } = useCartMutation();
  const navigate = useNavigate();

  const { data: items } = useQuery({
    queryKey: ['topModels'],
    queryFn: () => homeService.getTopModels(8, 'numberBought', SORT_ORDER.numberBought),
    retry: retryQueryFn
  });

  const { listFlagIsModelAdded, setListFlagIsModelAdded, create: addModelToCart } = useCartStore();
  const {
    listModelsInCart: { data: listModelsInCart, isSuccess, refetch: refetchTotalModelsInCart }
  } = useCartQuery();
  const handleAddtoUserCart = async (data: { models: CartCreationPayload[] }) => {
    try {
      await createCart.mutateAsync(data);
      await refetchTotalModelsInCart();
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className='grid grid-cols-2 gap-2 lg:grid-cols-4 lg:py-6 lg:px-4 lg:gap-3'>
      {items &&
        items.models.map((item, index) => (
          <Card
            placeholder=''
            key={index}
            className='border-2 border-gray-400 hover:border-gray-600 cursor-pointer rounded-lg'
            onClick={() => navigate(`/category/${item.id}`)}
          >
            <CardBody placeholder='' className='flex flex-col justify-between h-[500px]'>
              <div className='line-clamp-4'>
                <img src={item.imageUrl} />
                <Typography placeholder='' variant='lead' className='font-bold'>
                  {item.name}
                </Typography>
                <Chip
                  color='amber'
                  value={`${item.price.toLocaleString('en-US')} VNĐ`}
                  className='w-fit'
                />
                <Typography placeholder='' variant='paragraph'>
                  {item.description}
                </Typography>
              </div>
              <div className='flex flex-col gap-2'>
                <Typography placeholder='' variant='h6' className='font-bold'>
                  {`Đã mua: ${item.numberBought}`}
                </Typography>
                <Button
                  placeholder=''
                  className={
                    'text-white normal-case text-sm truncate p-4' +
                    (listFlagIsModelAdded[item.id] ||
                    (isSuccess &&
                      listModelsInCart &&
                      listModelsInCart.cart.map((item) => item.id).includes(item.id))
                      ? ' bg-blue-500 '
                      : ' bg-red-500')
                  }
                  onClick={(event) => {
                    event.stopPropagation();
                    if (
                      isSuccess &&
                      listModelsInCart &&
                      !listModelsInCart.cart.map((item) => item.id).includes(item.id)
                    ) {
                      handleAddtoUserCart({
                        models: [
                          {
                            id: item.id,
                            quantity: 1
                          }
                        ]
                      });
                      setListFlagIsModelAdded(item.id, true);
                    } else if (!isSuccess && !listFlagIsModelAdded[item.id]) {
                      addModelToCart({
                        id: item.id,
                        image: item.imageUrl,
                        name: item.name,
                        discount: item.discount ?? 0,
                        price: item.price,
                        quantity: 1
                      });
                      setListFlagIsModelAdded(item.id, true);
                    } else {
                      navigate('/cart');
                    }
                  }}
                >
                  {listFlagIsModelAdded[item.id] ||
                  (isSuccess &&
                    listModelsInCart &&
                    listModelsInCart.cart.map((item) => item.id).includes(item.id))
                    ? 'Đi đến giỏ hàng'
                    : 'Thêm vào giỏ hàng'}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}
