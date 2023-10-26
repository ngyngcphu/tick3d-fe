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
    <form className='flex flex-col gap-3 w-full max-w-screen-lg' onSubmit={handleSubmit(submit)}>
      <div>
        <Typography className='font-normal' variant='p' color='white'>
          Phương thức thanh toán
        </Typography>
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
        <Radio
          label={
            <div className='flex gap-2'>
              <img src={momoPaymentLogo} className='h-6'></img>
              <p>Momo</p>
            </div>
          }
          value={PaymentMethod.MOMO}
          name='paymentMethod'
          crossOrigin=''
        />
        {errors.paymentMethod?.message && (
          <Typography color='red' variant='small'>
            {errors.paymentMethod?.message}{' '}
          </Typography>
        )}
      </div>

      <div>
        <Input
          className='text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
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
          className='text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
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
          className='text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
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
          className='text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
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
          className='text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
          labelProps={{
            className:
              'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
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

      <Button
        className='py-2 px-8 bg-transparent border rounded-none border-white capitalize w-fit font-normal text-base'
        type='submit'
      >
        <div>Xác nhận</div>
      </Button>
    </form>
  );
}

function OrderSummary() {
  return (
    <>
      <div className='flex w-full'>
        <p className='flex-3'>Tổng phí sản phẩm</p>
        <p className='flex-1 text-right'>10</p>
      </div>
      <div className='flex w-full'>
        <p className='flex-3'>Phí vận chuyển</p>
        <p className='flex-1 text-right'>10</p>
      </div>
      <hr />
      <div className='flex w-full'>
        <p className='flex-3'>Tổng chi phí</p>
        <p className='flex-1 text-right'>10</p>
      </div>
    </>
  );
}

export function PaymentCheckoutPage() {
  return (
    <div className='w-full lg:flex items-center justify-center bg-cover bg-no-repeat p-0 m-0'>
      <Card className='bg-black/0 rounded-none sm:w-full lg:w-1/2' shadow={false}>
        <CardBody className='flex flex-col gap-5'>
          <Typography className='font-normal' variant='h2' color='white'>
            Xác nhận đơn hàng
          </Typography>
          <CheckoutForm />
        </CardBody>
        <CardBody>
          <Typography className='font-normal' variant='h2' color='white'>
            Chi tiết đơn hàng
          </Typography>
        </CardBody>
      </Card>
      <Card className='bg-black/0 rounded-none sm:w-full lg:w-1/3' shadow={false}>
        <CardBody className='flex flex-col gap-5'>
          <Typography className='font-normal' variant='h2' color='white'>
            Hóa đơn
          </Typography>
          <OrderSummary />
        </CardBody>
      </Card>
    </div>
  );
}
