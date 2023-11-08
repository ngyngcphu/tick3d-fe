import { Avatar, Button, Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCardStore, useHomeStore } from '@states';
import { useEffect } from 'react';
import { formatItemName, formatNumberWithCommas } from '@utils';
import { useScreenSize } from '@hooks';
import { ScreenSize } from '@constants';

export const CardPage = () => {
  const { screenSize } = useScreenSize();
  const Header = () => {
    return (
      <div className='flex justify-between bg-white'>
        <Typography variant={screenSize >= ScreenSize.MD ? 'h3' : 'h4'}>Giỏ hàng</Typography>
        <Link to={'/'} className='flex justify-center items-center'>
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
          <div className='flex flex-row gap-1 md:gap-6 justify-center items-center h-fit'>
            <div className='border-2 flex gap-4 md:gap-8 justify-between items-center px-2 py-0 md:px-4 md:py-2 h-fit'>
              <Typography
                className='text-xl md:text-2xl h-fit cursor-pointer'
                onClick={handleDecreaseNumBought}
              >
                -
              </Typography>
              <Typography className='h-fit text-xs md:text-base'>{item.numberBought}</Typography>
              <Typography
                className='text-xl md:text-2xl h-fit cursor-pointer'
                onClick={handleIncreaseNumBought}
              >
                +
              </Typography>
            </div>
            <TrashIcon className='w-4 md:w-5 h-fit cursor-pointer' />
          </div>
        );
      };
      return (
        <div className='flex justify-between w-full'>
          <div className='flex gap-2 md:gap-6'>
            <Avatar
              src={item.image}
              variant='square'
              size={screenSize < ScreenSize.MD ? 'lg' : 'xxl'}
            />
            <div className='flex flex-col gap-1 justify-start items-start'>
              <Typography
                variant={screenSize < ScreenSize.MD ? 'small' : 'paragraph'}
                className='capitalize'
              >
                {formatItemName(item.name, screenSize < ScreenSize.MD)}
              </Typography>
              {screenSize < ScreenSize.MD && <QuantityButton />}
            </div>
          </div>
          <div className='flex flex-col md:flex-row items-end md:items-start md:justify-between w-fit md:w-[34rem]'>
            {screenSize >= ScreenSize.MD && <QuantityButton />}
            {screenSize < ScreenSize.MD && (
              <Typography variant={screenSize < ScreenSize.MD ? 'small' : 'paragraph'}>
                {'VNĐ'}
              </Typography>
            )}
            <Typography
              variant={screenSize < ScreenSize.MD ? 'small' : 'paragraph'}
              className='uppercase'
            >
              {`${formatNumberWithCommas(item.price * item.numberBought)}` +
                (screenSize > ScreenSize.MD ? ' VNĐ' : '')}
            </Typography>
          </div>
        </div>
      );
    };

    const SummaryPrice = () => {
      return (
        <div className='flex flex-col gap-3 items-center md:items-end'>
          <div className='flex flex-col gap-2 items-center md:items-end'>
            <Typography className='w-fit'>{`Tổng ${formatNumberWithCommas(
              summaryPrice
            )} VNĐ`}</Typography>
            <Typography variant='small' className='w-fit text-center'>
              Thuế và phí giao hàng được tính tại bước thanh toán
            </Typography>
          </div>

          <Button className='normal-case rounded-none w-80 md:w-96 text-md bg-red-500'>
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
          <div className='flex justify-end lg:justify-between w-fit md:w-[34rem]'>
            <Typography variant='small' className='uppercase hidden lg:inline'>
              Số lượng
            </Typography>
            <Typography variant='small' className='uppercase'>
              Tổng cộng
            </Typography>
          </div>
        </div>
        <hr className='mb-2' />
        {itemData.map((item, idx) => (
          <Item key={idx} item={item} />
        ))}
        <hr />
        <SummaryPrice />
      </div>
    );
  };

  const RecommendList = () => {
    const ItemCards = () => {
      const { itemData, getItemData } = useHomeStore();
      useEffect(() => {
        getItemData();
      }, [getItemData]);

      const ItemCard: Component<{ item: ItemData }> = ({ item }) => {
        return (
          <div className='flex flex-col gap-2 cursor-pointer'>
            <img className='w-[9.4rem] md:w-[20rem] border-0' src={item.image} alt={item.name} />
            <Typography variant='h6' className='w-[9.4rem] md:w-[20rem]'>
              {formatItemName(item.name, screenSize < ScreenSize.MD)}
            </Typography>
            <Typography>{`${formatNumberWithCommas(item.price)} VNĐ`}</Typography>
          </div>
        );
      };
      return (
        <div className='w-full flex justify-center'>
          <div className='flex w-fit justify-start gap-6'>
            {screenSize >= ScreenSize.MD ? (
              itemData.slice(0, 4).map((item, idx) => <ItemCard key={idx} item={item} />)
            ) : (
              <div className='flex flex-col gap-5'>
                <div className='flex gap-5 justify-center'>
                  {itemData.slice(0, 2).map((item, idx) => (
                    <ItemCard key={idx} item={item} />
                  ))}
                </div>
                <div className='flex gap-5 justify-center'>
                  {itemData.slice(2, 4).map((item, idx) => (
                    <ItemCard key={idx} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };
    return (
      <div className='flex flex-col gap-8 w-full'>
        <div className='flex justify-start'>
          <Typography variant={screenSize >= ScreenSize.MD ? 'h4' : 'h5'} className='w-fit'>
            Có thể bạn cũng thích !
          </Typography>
        </div>

        <ItemCards />
        <Link to={'/home'} className='w-full flex justify-center'>
          <Button className='normal-case rounded-none w-fit px-6 text-md bg-red-500'>
            Xem thêm
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-12 justify-center p-4 md:p-8 bg-white'>
      <Header />
      <ItemsList />
      <RecommendList />
    </div>
  );
};
