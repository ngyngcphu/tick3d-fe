import avatar from '@assets/avatar.png';
import { SOCIAL_MEDIA } from '@constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography
} from '@material-tailwind/react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
export function ProfileSettingPage() {
  const validateSchema = yup.object({
    firstName: yup.string().required('Vui lòng nhập tên của bạn'),
    lastName: yup.string().required('Vui lòng nhập họ của bạn'),
    headline: yup
      .string()
      .required('Vui lòng nhập headline của bạn')
      .max(60, 'Vui lòng nhập chỉ nhập tối đa 60 kí tự'),
    biography: yup
      .string()
      .required('Vui lòng nhập biography của bạn')
      .min(50, 'Vui lòng nhập tối thiểu 50 kí tự'),
    language: yup.string().required('Vui lòng nhập language của bạn')
  }) as yup.ObjectSchema<ProfileFormData>;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      headline: '',
      biography: '',
      language: 'English',
      facebook: '',
      twitter: '',
      linkedIn: '',
      youtube: '',
      avatar: ''
    },
    resolver: yupResolver(validateSchema)
  });
  const submit = async (data: ProfileFormData) => {
    data.facebook = `https://www.facebook.com/${data.facebook}`;
    data.twitter = `https://www.twitter.com/${data.twitter}`;
    data.linkedIn = `https://www.linkedin.com/${data.linkedIn}`;
    data.youtube = `https://www.youtube.com/${data.youtube}`;

    try {
      console.log(data);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  };
  const INPUT_CLASSNAME =
    'rounded-none text-xs lg:text-base placeholder-gray-600 bg-white text-gray-900 !border-t-gray-900 !border-gray-900';
  const [avatarPreview, setAvatarPreview] = useState<string>(avatar);
  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card className='w-full px-4 mb-[64px] lg:px-[150px]' color='transparent' shadow={false}>
      <Typography className='mt-2 lg:mt-4' variant='h4' color='blue-gray'>
        Profile & Setting
      </Typography>
      <Typography color='gray' className='mt-1 text-base lg:text-lg'>
        Update your profile and settings
      </Typography>
      <form className='mt-4 mb-2 min-w-full ' onSubmit={handleSubmit(submit)}>
        <div className='mb-2 flex flex-col gap-4 lg:gap-10 lg:flex-row'>
          <div className='flex flex-col gap-2 lg:max-w-[600px] lg:min-w-[400px]'>
            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Họ
            </Typography>
            <Input
              className={INPUT_CLASSNAME}
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              crossOrigin=''
              {...register('firstName')}
            />
            {errors.firstName?.message && (
              <Typography color='red' variant='small' className='-mt-2'>
                {errors.firstName?.message}{' '}
              </Typography>
            )}
            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Tên
            </Typography>
            <Input
              className={INPUT_CLASSNAME}
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              crossOrigin=''
              {...register('lastName')}
            />
            {errors.lastName?.message && (
              <Typography color='red' variant='small' className='-mt-2'>
                {errors.lastName?.message}{' '}
              </Typography>
            )}
            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Headline
            </Typography>
            <Input
              className={INPUT_CLASSNAME}
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              placeholder='Tôi là một nhà thiết kế 3D'
              crossOrigin=''
              {...register('headline')}
            />
            {errors.headline?.message && (
              <Typography color='red' variant='small' className='-mt-2'>
                {errors.headline?.message}{' '}
              </Typography>
            )}
            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Biography
            </Typography>
            <Textarea
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
              className={INPUT_CLASSNAME}
              {...register('biography')}
            />
            {errors.biography?.message && (
              <Typography color='red' variant='small' className='-mt-2'>
                {errors.biography?.message}{' '}
              </Typography>
            )}
            <Typography className='text-xs text-gray-500 lg:text-sm'>
              Để lại một vài dòng giới thiệu về bản thân. Bạn có thể nói về kinh nghiệm trong lĩnh
              vực 3D, những thành tựu của bản thân, những dự án đã từng tham gia, ...
            </Typography>

            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Language
            </Typography>
            <Typography color='red' variant='small' className='-mt-2'>
              {errors.language?.message}{' '}
            </Typography>
            <Controller
              name='language'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className={INPUT_CLASSNAME}
                  labelProps={{
                    className: 'before:content-none after:content-none'
                  }}
                  menuProps={{
                    className: 'text-sm lg:text-base'
                  }}
                >
                  <Option value='English'>English</Option>
                  <Option value='Vietnamese'>Vietnamese</Option>
                </Select>
              )}
            />
            {errors.language?.message && (
              <Typography color='red' variant='small' className='-mt-2'>
                {errors.language?.message}{' '}
              </Typography>
            )}
          </div>
          <div className='flex flex-col gap-2 lg:max-w-[600px] lg:min-w-[400px] lg:w-[600px]'>
            <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
              Social Media
            </Typography>
            <Input
              size='md'
              className='rounded-none text-xs lg:text-base placeholder-gray-600 cursor-not-allowed pointer-events-none select-none bg-inherit text-gray-900 !border-t-gray-900 !border-gray-900'
              crossOrigin=''
              placeholder='Url'
              labelProps={{
                className: 'before:content-none after:content-none'
              }}
            />

            {Object.entries(SOCIAL_MEDIA).map(([name, label]) => (
              <div key={name} className='flex flex-col gap-2'>
                <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
                  {label}
                </Typography>
                <div className='flex'>
                  <Input
                    size='md'
                    className='rounded-none text-xs lg:text-base placeholder-gray-600 cursor-not-allowed pointer-events-none select-none bg-inherit text-gray-900 !border-t-gray-900 !border-gray-900 !border-r-0'
                    containerProps={{
                      className: '!min-w-[100px] !max-w-1/2'
                    }}
                    crossOrigin=''
                    placeholder={`https://www.${name}.com/`}
                  />
                  <Input
                    size='md'
                    className={INPUT_CLASSNAME}
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                    containerProps={{
                      className: '!min-w-[100px] !max-w-1/2'
                    }}
                    placeholder='username'
                    crossOrigin=''
                    {...register(name as keyof ProfileFormData)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2 max-w-[600px]'>
          <Typography variant='h6' color='blue-gray' className='text-sm lg:text-base'>
            Upload Avatar
          </Typography>
          <Typography className='text-xs text-gray-500 lg:text-sm'>
            Kích thước ảnh tối thiểu 200x200px, kích thước đối đa 6000x6000px
          </Typography>
          <div className='flex justify-center items-center border border-gray-900 p-4 bg-white text-gray-900'>
            <img className='w-[200px] h-[200px] object-cover' src={avatarPreview} alt='avatar' />
          </div>
          <Input
            className='!border-t-blue-gray-200 focus:!border-t-gray-900 rounded-none text-sm lg:text-base bg-white text-gray-900'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
            type='file'
            containerProps={{
              className: 'h-fit'
            }}
            crossOrigin=''
            {...register('avatar')}
            onChange={handleChangeAvatar}
          />
        </div>
        <Button className='w-[100px] h-[50px] rounded-none mt-4' type='submit'>
          Save
        </Button>
      </form>
    </Card>
  );
}
