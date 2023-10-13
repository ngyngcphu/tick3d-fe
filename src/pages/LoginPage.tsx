import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { authService } from '@services';
import { useUserStore } from '@states/common';
import * as yup from 'yup';

export function LoginPage() {
  const { getUserData } = useUserStore();

  const validateSchema = yup.object({
    email: yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Vui lòng nhập tối thiểu 8 kí tự')
  }) as yup.ObjectSchema<LoginFormData>;

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(validateSchema)
  });

  const submit = async (data: LoginFormData) => {
    try {
      await authService.login(data);
      await getUserData();
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setFocus('password');

    const switchFocusTimeout = setTimeout(() => {
      setFocus('email');
    }, 1000);

    return () => {
      clearTimeout(switchFocusTimeout);
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
          className='flex flex-col gap-8 w-72 md:w-80 max-w-screen-lg'
          onSubmit={handleSubmit(submit)}
        >
          <div className='flex flex-col gap-4'>
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
