import { Avatar, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCardStore } from '@states/home';
import { useEffect } from 'react';
import { formatNumberWithCommas } from '@utils';

export const CardPage = () => {
  const Header = () => {
    return (
      <div className='flex justify-between bg-white'>
        <Typography variant='h3'>Giỏ hàng</Typography>
        <Link to={'/'}>
          <Typography variant='small' className='underline hover:cursor-pointer'>
            Tiếp tục mua hàng
          </Typography>
        </Link>
      </div>
    );
  };

  const ItemsList = () => {
    const { itemData, summaryPrice, getCardItems, updateItem } = useCardStore();

    useEffect(() => {
      getCardItems();
    }, [getCardItems]);

    const Item: Component<{ item: ItemData }> = ({ item }) => {
      const handleIncreaseNumBought = () => {
        updateItem({ ...item, numberBought: item.numberBought + 1 });
      };

      const handleDecreaseNumBought = () => {
        updateItem({ ...item, numberBought: item.numberBought - 1 });
      };

      const QuantityButton = () => {
        return (
          <div className='flex flex-row gap-6 justify-center items-center h-fit'>
            <div className='border-2 flex gap-8 justify-between items-center px-4 py-2 h-fit'>
              <Typography
                className='text-2xl h-fit cursor-pointer'
                onClick={handleDecreaseNumBought}
              >
                -
              </Typography>
              <Typography className='h-fit'>{item.numberBought}</Typography>
              <Typography
                className='text-2xl h-fit cursor-pointer'
                onClick={handleIncreaseNumBought}
              >
                +
              </Typography>
            </div>
            <TrashIcon className='w-5 h-fit cursor-pointer' />
          </div>
        );
      };
      return (
        <div className='flex justify-between w-full'>
          <div className='flex gap-6'>
            <Avatar src={item.image} variant='square' size='xxl' />
            <Typography className='capitalize'>{item.name}</Typography>
          </div>
          <div className='flex justify-between w-[34rem]'>
            <QuantityButton />
            <Typography className='uppercase'>{`${formatNumberWithCommas(
              item.price * item.numberBought
            )} VNĐ`}</Typography>
          </div>
        </div>
      );
    };

    const SumaryPrice = () => {
      return (
        <div className='flex flex-col gap-3 items-end'>
          <div className='flex flex-col gap-2 items-end'>
            <Typography className='w-fit'>{`Tổng ${formatNumberWithCommas(
              summaryPrice
            )} VNĐ`}</Typography>
            <Typography variant='small' className='w-fit'>
              Thuế và phí giao hàng được tính tại bước thanh toán
            </Typography>
          </div>

          <Button className='capitalize w-fit rounded-none w-96 text-md bg-red-500'>
            Thanh toán
          </Button>
        </div>
      );
    };

    return (
      <div className='flex flex-col gap-4 justify-between bg-white'>
        <div className='flex justify-between w-full'>
          <Typography variant='small' className='uppercase'>
            Sản phẩm
          </Typography>
          <div className='flex justify-between w-[34rem]'>
            <Typography variant='small' className='uppercase'>
              Số lượng
            </Typography>
            <Typography variant='small' className='uppercase'>
              Tổng cộng
            </Typography>
          </div>
        </div>
        <hr />
        {itemData.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
        <hr />
        <SumaryPrice />
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-12 justify-center p-8 bg-white'>
      <Header />
      <ItemsList />
      <div></div>
    </div>
  );
};
