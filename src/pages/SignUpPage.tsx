import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardBody, Input, Button, Typography } from '@material-tailwind/react';
import { MENU_BAR } from '@constants';
import { useUserQuery } from '@hooks';
import { authService } from '@services';
import { useMenuBarStore } from '@states';

export function SignUpPage() {
  const navigate = useNavigate();
  const [isOTPForm, setIsOTPForm] = useState<boolean>(false);

  const { setSelectedMenu } = useMenuBarStore();
  const {
    info: { isSuccess }
  } = useUserQuery();

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  const signup = useMutation({
    mutationKey: ['signup'],
    mutationFn: (data: SignUpFormData) => authService.signUp(data),
    onSuccess: () => setIsOTPForm(true)
  });

  const createOTP = useMutation({
    mutationKey: ['createOTP'],
    mutationFn: (userId: string) => authService.createOTP(userId)
  });

  const verifyOTP = useMutation({
    mutationKey: ['verifyOTP'],
    mutationFn: ({ userId, otp }: { userId: string; otp: string }) =>
      authService.verifyOTP(userId, otp)
  });

  const validateSchemaSignUp = yup.object({
    firstname: yup.string().required('Vui lòng nhập tên của bạn'),
    lastname: yup.string().required('Vui lòng nhập họ của bạn'),
    tel: yup.string().required('Vui lòng nhập số điện thoại'),
    email: yup.string().required('Vui lòng nhập email').email('Email không đúng định dạng'),
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu')
      .min(8, 'Vui lòng nhập tối thiểu 8 kí tự')
  }) as yup.ObjectSchema<SignUpFormData>;

  const validateSchemaVerifyOTP = yup.object({
    otp: yup
      .string()
      .required('Vui lòng nhập mã OTP để xác thực')
      .min(6, 'Vui lòng nhập tối thiểu 6 kí tự')
  }) as yup.ObjectSchema<{ otp: string }>;

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors }
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstname: '',
      lastname: '',
      tel: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(validateSchemaSignUp)
  });

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: { errors: otpErrors }
  } = useForm<{ otp: string }>({
    defaultValues: {
      otp: ''
    },
    resolver: yupResolver(validateSchemaVerifyOTP)
  });

  const submitSignupData = async (formData: SignUpFormData) => {
    try {
      const { id } = await signup.mutateAsync(formData);
      await createOTP.mutateAsync(id);
    } catch (err) {
      toast.error(err as string);
    }
  };

  const submitOTP = async (otpData: { otp: string }) => {
    if (!signup.data) {
      toast.error('User not found !');
      return;
    }
    await toast.promise(
      verifyOTP.mutateAsync({
        userId: signup.data.id,
        otp: otpData.otp
      }),
      {
        pending: 'Registration request is pending',
        success: {
          render() {
            navigate('/login');
            setSelectedMenu(MENU_BAR.loginOrStar);
            return 'Sign up successfully. Please log in!';
          }
        },
        error: {
          render({ data }) {
            return data as string;
          }
        }
      }
    );
  };

  return (
    <div
      className='w-full h-full flex items-center justify-center bg-cover bg-no-repeat p-0 m-0 '
      style={{
        background: `linear-gradient(rgba(18, 18, 18, 0.4), rgba(18, 18, 18, 0.4)),
          url('./src/assets/auth-background.png')`
      }}
    >
      {!isOTPForm ? (
        <Card className='bg-black/50 rounded-none' shadow={false}>
          <CardBody className='flex flex-col gap-8'>
            <Typography className='font-normal' variant='h2' color='white'>
              Đăng ký tài khoản
            </Typography>
            <form
              className='flex flex-col gap-8 w-fit max-w-screen-lg'
              onSubmit={handleSubmitSignup(submitSignupData)}
            >
              <div className='flex flex-col gap-4 w-fit'>
                <div className='w-fit'>
                  <div className='flex w-fit gap-4'>
                    <Input
                      className=' text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
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
                      {...registerSignup('lastname', { minLength: 8, required: true })}
                    />

                    {signupErrors.lastname?.message && (
                      <Typography color='red' variant='small'>
                        {signupErrors.lastname?.message}{' '}
                      </Typography>
                    )}
                    <Input
                      className=' text-white !rounded-none border-border-dark focus:border-white transition-all placeholder-shown:border-border-dark'
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
                      {...registerSignup('firstname', { minLength: 8, required: true })}
                    />
                  </div>

                  {signupErrors.firstname?.message && (
                    <Typography color='red' variant='small'>
                      {signupErrors.firstname?.message}{' '}
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
                    label='Số điện thoại'
                    type='tel'
                    style={{
                      WebkitTransition: 'background-color 5000s ease-in-out 0s',
                      WebkitTextFillColor: 'white',
                      caretColor: 'white'
                    }}
                    crossOrigin=''
                    {...registerSignup('tel', { minLength: 8, required: true })}
                  />
                  {signupErrors.tel?.message && (
                    <Typography color='red' variant='small'>
                      {signupErrors.tel?.message}{' '}
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
                    {...registerSignup('email', { minLength: 8, required: true })}
                  />
                  {signupErrors.email?.message && (
                    <Typography color='red' variant='small'>
                      {signupErrors.email?.message}{' '}
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
                    {...registerSignup('password', { minLength: 8, required: true })}
                  />
                  {signupErrors.password?.message && (
                    <Typography color='red' variant='small'>
                      {signupErrors.password?.message}{' '}
                    </Typography>
                  )}
                </div>
              </div>

              <Button
                className='py-2 px-8 bg-transparent border rounded-none border-white capitalize w-fit font-normal text-base'
                type='submit'
              >
                Gửi
              </Button>
            </form>
          </CardBody>
        </Card>
      ) : (
        <Card className='bg-black/50 rounded-none' shadow={false}>
          <CardBody className='flex flex-col gap-4 w-96'>
            <Typography className='font-normal text-center' variant='h2' color='white'>
              Xác nhận email
            </Typography>
            <Typography variant='paragraph' color='white'>
              Mã gồm 6 ký tự đã được gửi về địa chỉ email{' '}
              <span className='font-bold underline'>{signup.data?.email}</span>
            </Typography>
            <form
              className='flex flex-col gap-4 w-fit max-w-screen-lg self-center'
              onSubmit={handleSubmitOTP(submitOTP)}
            >
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
                label='OTP'
                style={{
                  WebkitTransition: 'background-color 5000s ease-in-out 0s',
                  WebkitTextFillColor: 'white',
                  caretColor: 'white'
                }}
                crossOrigin=''
                {...registerOTP('otp', { minLength: 6, required: true })}
              />
              {otpErrors.otp?.message && (
                <Typography color='red' variant='small'>
                  {otpErrors.otp?.message}{' '}
                </Typography>
              )}
              <Button
                className='flex bg-transparent border rounded-none border-white capitalize w-fit font-normal text-base self-center'
                type='submit'
              >
                Xác nhận
              </Button>
            </form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
