import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import { Card, CardBody, Chip, Input, Typography, Textarea } from '@material-tailwind/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCartQuery, useOrderMutation } from '@hooks';
import { checkoutService } from '@services';
import { useDigitalCheckoutSuccessModal } from '@components/common';

export function PaymentCheckoutPage() {
  const {
    listModelsInCart: { data: listModelsInCart }
  } = useCartQuery();

  const { handleOpen, DigitalCheckoutSuccessModal } = useDigitalCheckoutSuccessModal();

  const { approvePayPalOrder } = useOrderMutation();
  const validateSchema = yup.object({
    district: yup.string(),
    ward: yup.string(),
    street: yup.string(),
    streetNo: yup.string(),
    extra_note: yup.string().optional()
  }) as yup.ObjectSchema<CheckoutForm>;

  const {
    watch,
    register,
    formState: { errors }
  } = useForm<CheckoutForm>({
    defaultValues: {
      district: '',
      ward: '',
      street: '',
      streetNo: '',
      extra_note: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const CheckoutForm = () => {
    return (
      <form className='flex flex-col gap-3 w-full max-w-screen-lg' id='checkout-form'>
        <Input
          className='text-black !rounded-none border-border-dark focus:border-dark transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-gray peer-focus:text-gray peer-focus:after:!border-gray peer-placeholder-shown:text-border-dark',
            style: {
              top: '-0.45rem'
            }
          }}
          size='lg'
          label='Quận'
          crossOrigin=''
          {...register('district', { required: true })}
        />
        {errors.district?.message && (
          <Typography placeholder='' color='red' variant='small'>
            {errors.district?.message}{' '}
          </Typography>
        )}
        <Input
          className='text-black !rounded-none border-border-dark focus:border-black transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-black peer-focus:text-black peer-focus:after:!border-black peer-placeholder-shown:text-border-dark',
            style: {
              top: '-0.45rem'
            }
          }}
          size='lg'
          label='Phường'
          crossOrigin=''
          {...register('ward', { required: true })}
        />
        {errors.ward?.message && (
          <Typography placeholder='' color='red' variant='small'>
            {errors.ward?.message}{' '}
          </Typography>
        )}
        <Input
          className='text-black !rounded-none border-border-dark focus:border-black transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-black peer-focus:text-black peer-focus:after:!border-black peer-placeholder-shown:text-border-dark',
            style: {
              top: '-0.45rem'
            }
          }}
          size='lg'
          label='Đường'
          crossOrigin=''
          {...register('street', { required: true })}
        />
        {errors.street?.message && (
          <Typography placeholder='' color='red' variant='small'>
            {errors.street?.message}{' '}
          </Typography>
        )}
        <Input
          className='text-black !rounded-none border-border-dark focus:border-black transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-black peer-focus:text-black peer-focus:after:!border-black peer-placeholder-shown:text-border-dark',
            style: {
              top: '-0.45rem'
            }
          }}
          size='lg'
          label='Số đường'
          crossOrigin=''
          {...register('streetNo', { required: true })}
        />
        {errors.streetNo?.message && (
          <Typography placeholder='' color='red' variant='small'>
            {errors.streetNo?.message}{' '}
          </Typography>
        )}
        <div>
          <Textarea
            className='text-black !rounded-none border-border-dark focus:border-black transition-all placeholder-shown:border-border-dark'
            labelProps={{
              className:
                'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-black peer-focus:text-black peer-focus:after:!border-black peer-placeholder-shown:text-border-dark',
              style: {
                top: '-0.45rem'
              }
            }}
            size='lg'
            label='Ghi chú'
            {...register('extra_note')}
          />
          {errors.extra_note?.message && (
            <Typography placeholder='' color='red' variant='small'>
              {errors.extra_note?.message}{' '}
            </Typography>
          )}
        </div>
      </form>
    );
  };

  const OrderDetails = () => {
    return (
      <div className='flex flex-col gap-5 my-5'>
        {listModelsInCart?.cart.map((item, index) => (
          <div key={index} className='flex gap-4 items-center'>
            <div className='w-1/6 m-auto'>
              <img src={item.image} alt={item.name} className='w-full block' />
            </div>
            <div className='flex items-center gap-10 w-full'>
              <Typography placeholder='' className='text-left w-1/2' variant='h5'>
                {item.name}
              </Typography>
              {item.discount !== undefined && item.discount > 0 ? (
                <div className='flex flex-col gap-2'>
                  <Chip
                    variant='ghost'
                    value={
                      <span className='line-through'>
                        ₫ {(item.price * item.quantity).toLocaleString()}
                      </span>
                    }
                  />
                  <Chip
                    variant='ghost'
                    value={`₫ ${Math.floor(
                      item.price * (1 - item.discount) * item.quantity
                    ).toLocaleString()}`}
                  />
                </div>
              ) : (
                <Chip variant='ghost' value={`₫ ${item.price.toLocaleString()}`} />
              )}
              <Chip
                value={
                  <span className='normal-case'>Số lượng: {item.quantity.toLocaleString()}</span>
                }
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const OrderSummary = () => {
    const SHIPPING_FEE = 30000;
    const totalPrice = useMemo(() => {
      if (listModelsInCart) {
        return listModelsInCart.cart.reduce(
          (result, item) => result + Math.floor(item.price * item.quantity),
          0
        );
      } else return 0;
    }, []);
    const discount = useMemo(() => {
      if (listModelsInCart) {
        return listModelsInCart.cart.reduce(
          (result, item) => result + Math.floor(item.price * (item.discount ?? 0) * item.quantity),
          0
        );
      } else return 0;
    }, []);

    const PayPalButtonWrapper = () => {
      const [{ isPending }] = usePayPalScriptReducer();

      return (
        <>
          {isPending && <div className='spinner' />}
          <PayPalButtons
            disabled={false}
            style={{ color: 'blue' }}
            createOrder={async () => {
              const { id } = await checkoutService.createPaypalOrder({
                intent: 'CAPTURE',
                orderInfo: { ...watch() }
              });

              return id;
            }}
            onApprove={async (data) => {
              await approvePayPalOrder.mutateAsync(data.orderID);
              handleOpen();
            }}
          />
        </>
      );
    };

    return (
      <>
        <div className='flex w-full'>
          <Typography placeholder='' variant='h6'>
            Tổng phí sản phẩm
          </Typography>
          <p className='flex-1 text-right'>₫ {totalPrice.toLocaleString('en-US')}</p>
        </div>
        <div className='flex w-full'>
          <Typography placeholder='' variant='h6'>
            Giảm giá
          </Typography>
          <p className='flex-1 text-right'>- ₫ {discount.toLocaleString('en-US')}</p>
        </div>
        <div className='flex w-full'>
          <Typography placeholder='' variant='h6'>
            Phí vận chuyển
          </Typography>
          <p className='flex-1 text-right'>₫ {SHIPPING_FEE.toLocaleString('en-US')}</p>
        </div>
        <hr />
        <div className='flex w-full'>
          <Typography placeholder='' variant='h6'>
            Tổng chi phí
          </Typography>
          <p className='flex-1 text-right'>
            ₫ {(totalPrice - discount + SHIPPING_FEE).toLocaleString('en-US')}
          </p>
        </div>
        <PayPalScriptProvider
          options={{
            clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
            components: 'buttons',
            currency: 'USD'
          }}
        >
          <PayPalButtonWrapper />
        </PayPalScriptProvider>
      </>
    );
  };

  return (
    <div className='w-full lg:flex justify-center p-0 m-0'>
      <Card placeholder='' className='bg-white/100 rounded-none sm:w-full lg:w-1/2' shadow={false}>
        <CardBody placeholder='' className='flex flex-col gap-5'>
          <Typography placeholder='' className='font-normal' variant='h2' color='black'>
            Xác nhận đơn hàng
          </Typography>
          <CheckoutForm />
          <Typography placeholder='' className='font-normal' variant='h2' color='black'>
            Chi tiết đơn hàng
          </Typography>
          <OrderDetails />
        </CardBody>
      </Card>
      <Card placeholder='' className='bg-white/100 rounded-none sm:w-full lg:w-1/3' shadow={false}>
        <CardBody placeholder='' className='flex flex-col gap-5'>
          <Typography placeholder='' className='font-normal' variant='h2' color='black'>
            Hóa đơn
          </Typography>
          <OrderSummary />
        </CardBody>
      </Card>
      <DigitalCheckoutSuccessModal />
    </div>
  );
}
