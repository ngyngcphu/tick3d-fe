import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { authService } from '@services';
import * as yup from 'yup';

export function SignUpPage() {
  const validateSchema = yup.object({
    firstName: yup.string().required('Vui lòng nhập tên của bạn'),
    lastName: yup.string(),
    email: yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Vui lòng nhập tối thiểu 8 kí tự')
  }) as yup.ObjectSchema<SignUpFormData>;

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const submit = async (data: SignUpFormData) => {
    try {
      await authService.signUp(data);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setFocus('email');

    const switchFocusTimeout1 = setTimeout(() => {
      setFocus('password');
    }, 1000);

    const switchFocusTimeout2 = setTimeout(() => {
      setFocus('lastName');
    }, 1000);

    return () => {
      clearTimeout(switchFocusTimeout1);
      clearTimeout(switchFocusTimeout2);
    };
  }, [setFocus]);

  return (
    <div
      className='w-full h-full flex items-center justify-center bg-cover bg-no-repeat p-0 m-0 '
      style={{
        background: `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.4)),
          url(https://www.kisscom.co.uk/media/pages/news/3d-printing-a-world-of-possibilities/5824bcf0fe-1666776023/blog_31.08.18.png)`
      }}
    >
      <Card className='flex gap-8 w-fit bg-black/50 px-20 py-12 rounded-none' shadow={false}>
        <Typography className='font-normal' variant='h2' color='white'>
          Đăng nhập
        </Typography>
        <form
          className='flex flex-col gap-8 md:min-w-80 w-fit max-w-screen-lg'
          onSubmit={handleSubmit(submit)}
        >
          <div className='flex flex-col gap-4 w-fit'>
            <div className='w-fit'>
              <div className='flex w-fit gap-4'>
                <Input
                  className=' text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
                  containerProps={{ className: 'w-[12.5rem]' }}
                  placeholder=' '
                  labelProps={{
                    className:
                      'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
                    style: {
                      top: '-0.45rem'
                    }
                  }}
                  label='Họ'
                  style={{
                    WebkitTransition: 'background-color 5000s ease-in-out 0s',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                  crossOrigin=''
                  {...register('lastName', { minLength: 8, required: true })}
                />
                <Input
                  className=' text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
                  containerProps={{ className: 'w-[12.5rem]' }}
                  labelProps={{
                    className:
                      'before:rounded-tl-none after:rounded-tr-none text-border-dark before:border-border-dark after:border-border-dark peer-focus:before:!border-white peer-focus:text-white peer-focus:after:!border-white peer-placeholder-shown:text-border-dark',
                    style: {
                      top: '-0.45rem'
                    }
                  }}
                  label='Tên'
                  style={{
                    WebkitTransition: 'background-color 5000s ease-in-out 0s',
                    WebkitTextFillColor: 'white',
                    caretColor: 'white'
                  }}
                  crossOrigin=''
                  {...register('firstName', { minLength: 8, required: true })}
                />
              </div>

              {errors.email?.message && (
                <Typography color='red' variant='small'>
                  {errors.email?.message}{' '}
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
                label='Email'
                style={{
                  WebkitTransition: 'background-color 5000s ease-in-out 0s',
                  WebkitTextFillColor: 'white',
                  caretColor: 'white'
                }}
                crossOrigin=''
                {...register('email', { minLength: 8, required: true })}
              />
              {errors.email?.message && (
                <Typography color='red' variant='small'>
                  {errors.email?.message}{' '}
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
                label='Mật khẩu'
                type='password'
                style={{
                  WebkitTransition: 'background-color 5000s ease-in-out 0s',
                  WebkitTextFillColor: 'white',
                  caretColor: 'white'
                }}
                crossOrigin=''
                {...register('password', { minLength: 8, required: true })}
              />
              {errors.password?.message && (
                <Typography color='red' variant='small'>
                  {errors.password?.message}{' '}
                </Typography>
              )}
            </div>
          </div>

          <Button
            className='py-2 px-8 bg-transparent border rounded-none border-white capitalize w-fit font-normal text-base'
            type='submit'
          >
            <div>Gửi</div>
          </Button>
        </form>
      </Card>
    </div>
  );
}
