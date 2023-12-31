import { useMemo } from 'react';
import { Link, useNavigate, NavigateFunction } from 'react-router-dom';
import { Avatar, Button, Chip, Typography } from '@material-tailwind/react';
import { TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Items } from '@components/home';
import { ScreenSize } from '@constants';
import { useScreenSize, useCartMutation, useCartQuery } from '@hooks';
import { useCartStore } from '@states';

export const ShoppingCartPage = () => {
  const {
    listModelsInCart: { data: listModelsInCart, isSuccess }
  } = useCartQuery();
  const { updateCartQuantity } = useCartMutation();

  const { screenSize } = useScreenSize();
  const {
    cartItems,
    update: updateModelQuantity,
    delete: deleteModel,
    removeItemInListFlag
  } = useCartStore();

  const Header = () => {
    return (
      <div className='flex items-center justify-between bg-white'>
        <Typography placeholder='' variant={screenSize >= ScreenSize.MD ? 'h3' : 'h4'}>
          Giỏ hàng
        </Typography>
        <Link to={'/category'} className='flex justify-center items-center hover:bg-gray-100'>
          <Button
            placeholder=''
            variant='outlined'
            className='flex items-center gap-2 normal-case cursor-pointer'
          >
            <Typography placeholder='' variant='h6'>
              Tiếp tục mua hàng
            </Typography>
            <ChevronRightIcon className='w-5 h-5' />
          </Button>
        </Link>
      </div>
    );
  };

  const OrdersList = () => {
    const navigate: NavigateFunction = useNavigate();

    const Item: Component<{ order: ModelInCart }> = ({ order }) => {
      const handleIncreaseNumBought = async (modelId: string) => {
        if (isSuccess && listModelsInCart) {
          const index = listModelsInCart.cart.findIndex((item) => item.id === modelId);
          await updateCartQuantity.mutateAsync({
            modelId: modelId,
            quantity: listModelsInCart.cart[index].quantity + 1
          });
        } else {
          const index = cartItems.findIndex((item) => item.id === modelId);
          updateModelQuantity(cartItems[index].id, cartItems[index].quantity + 1);
        }
      };
      const handleDecreaseNumBought = async (modelId: string) => {
        if (isSuccess && listModelsInCart) {
          const index = listModelsInCart.cart.findIndex((item) => item.id === modelId);
          if (listModelsInCart.cart[index].quantity > 1) {
            await updateCartQuantity.mutateAsync({
              modelId: modelId,
              quantity: listModelsInCart.cart[index].quantity - 1
            });
          }
        } else {
          const index = cartItems.findIndex((item) => item.id === modelId);
          if (cartItems[index].quantity > 1) {
            updateModelQuantity(cartItems[index].id, cartItems[index].quantity - 1);
          }
        }
      };

      const QuantityButton = () => {
        return (
          <div className='flex flex-row gap-1 md:gap-6 justify-center items-center h-fit'>
            <div className='border-2 flex gap-4 md:gap-8 justify-between items-center px-2 py-0 md:px-4 md:py-2 h-fit'>
              <Typography
                placeholder=''
                className='text-xl md:text-2xl h-fit cursor-pointer'
                onClick={() => handleDecreaseNumBought(order.id)}
              >
                -
              </Typography>
              <Typography placeholder='' className='h-fit text-xs md:text-base'>
                {order.quantity}
              </Typography>
              <Typography
                placeholder=''
                className='text-xl md:text-2xl h-fit cursor-pointer'
                onClick={() => handleIncreaseNumBought(order.id)}
              >
                +
              </Typography>
            </div>
            <TrashIcon
              strokeWidth={2}
              className='w-7 h-7 md:w-8 md:h-8 p-1 cursor-pointer text-red-600 hover:bg-red-50 rounded-full'
              onClick={() => {
                deleteModel(order.id);
                removeItemInListFlag(order.id);
              }}
            />
          </div>
        );
      };
      return (
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2 md:gap-6'>
            <Avatar
              placeholder=''
              src={order.image}
              alt=''
              variant='square'
              size={screenSize < ScreenSize.MD ? 'lg' : 'xxl'}
            />
            <div className='flex flex-col gap-1 justify-start items-start'>
              <Typography
                placeholder=''
                variant={screenSize < ScreenSize.MD ? 'small' : 'paragraph'}
                className='capitalize w-36 md:w-72'
              >
                {order.name}
              </Typography>
              {screenSize < ScreenSize.MD && <QuantityButton />}
            </div>
          </div>
          <div className='flex items-center md:justify-between w-fit md:w-[34rem]'>
            {screenSize >= ScreenSize.MD && <QuantityButton />}
            {order.discount !== undefined && order.discount > 0 ? (
              <div className='flex flex-col gap-2'>
                <Chip
                  variant='ghost'
                  value={
                    <span className='line-through'>
                      {(order.price * order.quantity).toLocaleString()} VNĐ
                    </span>
                  }
                />
                <Chip
                  variant='ghost'
                  value={`${Math.floor(
                    order.price * (1 - order.discount) * order.quantity
                  ).toLocaleString()} VNĐ`}
                />
              </div>
            ) : (
              <Chip
                variant='ghost'
                value={`${(order.price * order.quantity).toLocaleString()} VNĐ`}
              />
            )}
          </div>
        </div>
      );
    };

    const SummaryPrice = () => {
      const productPrice = useMemo(() => {
        if (isSuccess && listModelsInCart) {
          return listModelsInCart.cart.reduce(
            (result, item) =>
              result + Math.floor(item.price * (1 - (item.discount ?? 0)) * item.quantity),
            0
          );
        } else {
          return cartItems.reduce(
            (result, item) =>
              result + Math.floor(item.price * (1 - (item.discount ?? 0)) * item.quantity),
            0
          );
        }
      }, []);
      return (
        <div className='flex flex-col gap-3 items-center md:items-end'>
          <div className='flex flex-col gap-2 items-center md:items-end'>
            <Typography placeholder='' className='w-fit'>
              <span>Tổng: </span>
              <span className='font-bold text-xl'>{productPrice.toLocaleString('en-US')} VNĐ</span>
            </Typography>
            <Typography placeholder='' variant='small' className='w-fit text-center'>
              Thuế và phí giao hàng được tính tại bước thanh toán
            </Typography>
          </div>

          <Button
            placeholder=''
            className='normal-case rounded-none w-80 md:w-96 text-md bg-red-500'
            onClick={() => navigate('/checkout')}
          >
            Thanh toán
          </Button>
        </div>
      );
    };

    return (
      <div className='flex flex-col gap-4 justify-between bg-white'>
        <div className='flex justify-between w-full'>
          <Typography placeholder='' variant='small' className='uppercase'>
            Sản phẩm
          </Typography>
          <div className='flex justify-end lg:justify-between w-fit md:w-[34rem]'>
            <Typography placeholder='' variant='small' className='uppercase hidden lg:inline'>
              Số lượng
            </Typography>
            <Typography placeholder='' variant='small' className='uppercase'>
              Tổng cộng
            </Typography>
          </div>
        </div>
        <hr className='mb-2' />
        {!isSuccess
          ? cartItems.map((order, idx) => <Item key={idx} order={order} />)
          : listModelsInCart?.cart.map((order, idx) => <Item key={idx} order={order} />)}
        <hr />
        <SummaryPrice />
      </div>
    );
  };

  const RecommendList = () => {
    return (
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-start'>
          <Typography
            placeholder=''
            variant={screenSize >= ScreenSize.MD ? 'h4' : 'h5'}
            className='w-fit'
          >
            Có thể bạn cũng thích !
          </Typography>
        </div>
        <Items />
        <Link to={'/category'} className='w-full flex justify-center'>
          <Button placeholder='' className='normal-case rounded-none w-fit px-6 text-md bg-red-500'>
            Xem thêm
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-12 justify-center p-4 md:p-8 bg-white'>
      <Header />
      <OrdersList />
      <RecommendList />
    </div>
  );
};
