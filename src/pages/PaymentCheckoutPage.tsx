import {
  Card,
  CardBody,
  Button,
  Radio,
  Input,
  Typography,
  Textarea
} from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import cashPaymentLogo from '@assets/cashpayment.webp';
import momoPaymentLogo from '@assets/momopayment.png';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const enum PaymentMethod {
  CASH,
  MOMO
}

export interface CheckoutForm {
  paymentMethod: PaymentMethod;
  district: string;
  ward: string;
  street: string;
  streetNo: string;
  note?: string;
}

function CheckoutForm() {
  const validateSchema = yup.object({
    paymentMethod: yup
      .mixed()
      .oneOf([PaymentMethod.CASH, PaymentMethod.MOMO])
      .required('Vui lòng chọn phương thức thanh toán'),
    district: yup.string(),
    ward: yup.string(),
    street: yup.string(),
    streetNo: yup.string(),
    note: yup.string().optional()
  }) as yup.ObjectSchema<CheckoutForm>;

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<CheckoutForm>({
    defaultValues: {
      paymentMethod: PaymentMethod.CASH,
      district: '',
      ward: '',
      street: '',
      streetNo: '',
      note: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const submit = async (data: CheckoutForm) => {
    return data;
  };

  return (
    <form
      className='flex flex-col gap-3 w-full max-w-screen-lg'
      id='checkout-form'
      onSubmit={handleSubmit(submit)}
    >
      <div>
        <p className='text-black'>Phương thức thanh toán</p>
        <div>
          <Radio
            label={
              <div className='flex gap-2'>
                <img src={cashPaymentLogo} className='h-6'></img>
                <p>Tiền mặt</p>
              </div>
            }
            value={PaymentMethod.CASH}
            name='paymentMethod'
            crossOrigin=''
          />
        </div>
        <div>
          <Radio
            label={
              <div className='flex gap-2'>
                <img src={momoPaymentLogo} className='h-7 bg-transparent'></img>
                <p>Momo</p>
              </div>
            }
            value={PaymentMethod.MOMO}
            name='paymentMethod'
            crossOrigin=''
          />
        </div>
        {errors.paymentMethod?.message && (
          <Typography color='red' variant='small'>
            {errors.paymentMethod?.message}{' '}
          </Typography>
        )}
      </div>

      <div>
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
          style={{
            WebkitTransition: 'background-color 5000s ease-in-out 0s',
            WebkitTextFillColor: 'white',
            caretColor: 'white'
          }}
          crossOrigin=''
          {...register('district', { required: true })}
        />
        {errors.district?.message && (
          <Typography color='red' variant='small'>
            {errors.district?.message}{' '}
          </Typography>
        )}
      </div>

      <div>
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
          style={{
            WebkitTransition: 'background-color 5000s ease-in-out 0s',
            WebkitTextFillColor: 'white',
            caretColor: 'white'
          }}
          crossOrigin=''
          {...register('ward', { required: true })}
        />
        {errors.ward?.message && (
          <Typography color='red' variant='small'>
            {errors.ward?.message}{' '}
          </Typography>
        )}
      </div>

      <div>
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
          style={{
            WebkitTransition: 'background-color 5000s ease-in-out 0s',
            WebkitTextFillColor: 'white',
            caretColor: 'white'
          }}
          crossOrigin=''
          {...register('street', { required: true })}
        />
        {errors.street?.message && (
          <Typography color='red' variant='small'>
            {errors.street?.message}{' '}
          </Typography>
        )}
      </div>

      <div>
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
          style={{
            WebkitTransition: 'background-color 5000s ease-in-out 0s',
            WebkitTextFillColor: 'white',
            caretColor: 'white'
          }}
          crossOrigin=''
          {...register('streetNo', { required: true })}
        />
        {errors.streetNo?.message && (
          <Typography color='red' variant='small'>
            {errors.streetNo?.message}{' '}
          </Typography>
        )}
      </div>

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
          style={{
            WebkitTransition: 'background-color 5000s ease-in-out 0s',
            WebkitTextFillColor: 'white',
            caretColor: 'white'
          }}
          {...register('note')}
        />
        {errors.note?.message && (
          <Typography color='red' variant='small'>
            {errors.note?.message}{' '}
          </Typography>
        )}
      </div>
    </form>
  );
}

function OrderSummary() {
  const [cart, setCart] = useState(
    [] as { image: string; name: string; numberBought: number; price: number }[]
  );
  useEffect(() => {
    async function fetchCart() {
      setCart((await axios.get('http://localhost:3003/items')).data);
    }

    fetchCart();
  }, []);

  const productPrice = cart.reduce((acc, item) => acc + item.price * item.numberBought, 0);
  const shippingFee = 30000;
  return (
    <>
      <div className='flex w-full'>
        <p className='flex-3'>Tổng phí sản phẩm</p>
        <p className='flex-1 text-right'>₫ {productPrice.toLocaleString('en-US')}</p>
      </div>
      <div className='flex w-full'>
        <p className='flex-3'>Phí vận chuyển</p>
        <p className='flex-1 text-right'>₫ {shippingFee.toLocaleString('en-US')}</p>
      </div>
      <hr />
      <div className='flex w-full'>
        <p className='flex-3'>Tổng chi phí</p>
        <p className='flex-1 text-right'>
          ₫ {(productPrice + shippingFee).toLocaleString('en-US')}
        </p>
      </div>

      <Button
        className='py-2 px-8 bg-transparent border rounded-none border-black capitalize w-fit font-normal text-base text-dark'
        type='submit'
        form='checkout-form'
      >
        <div>Xác nhận</div>
      </Button>
    </>
  );
}

function OrderDetails() {
  const [cart, setCart] = useState(
    [] as { image: string; name: string; numberBought: number; price: number }[]
  );
  useEffect(() => {
    async function fetchCart() {
      setCart((await axios.get('http://localhost:3003/items')).data);
    }

    fetchCart();
  }, []);
  return (
    <div className='flex flex-col gap-5 my-5'>
      {cart.map((item) => (
        <div className='flex gap-4' key={item.name}>
          <div className='w-1/6 m-auto'>
            <img src={item.image} alt={item.name} className='w-full block' />
          </div>
          <div className='flex flex-row gap-10 w-full p-5'>
            <Typography className='text-left w-1/2' variant='h5' color='dark'>
              {item.name}
            </Typography>
            <p className='text-right w-1/5'>₫ {item.price.toLocaleString()}</p>
            <p className='text-right w-1/5'>Sl: {item.numberBought.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PaymentCheckoutPage() {
  return (
    <div className='w-full lg:flex justify-center bg-cover bg-no-repeat p-0 m-0'>
      <Card className='bg-white/100 rounded-none sm:w-full lg:w-1/2' shadow={false}>
        <CardBody className='flex flex-col gap-5'>
          <Typography className='font-normal' variant='h2' color='black'>
            Xác nhận đơn hàng
          </Typography>
          <CheckoutForm />
        </CardBody>
        <CardBody>
          <Typography className='font-normal' variant='h2' color='black'>
            Chi tiết đơn hàng
          </Typography>
          <OrderDetails />
        </CardBody>
      </Card>
      <Card className='bg-white/100 rounded-none sm:w-full lg:w-1/3' shadow={false}>
        <CardBody className='flex flex-col gap-5'>
          <Typography className='font-normal' variant='h2' color='black'>
            Hóa đơn
          </Typography>
          <OrderSummary />
        </CardBody>
      </Card>
    </div>
  );
}
