import { Typography, Input, Button } from '@material-tailwind/react';
import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const LINKS = [
  {
    title: 'Đường dẫn nhanh',
    items: ['Trang trí', 'Mô hình', 'Tải lên']
  },
  {
    title: 'Thông tin',
    items: ['Chúng tôi', 'Liên hệ', 'Chính sách vận chuyển']
  }
];
export function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer className='relative w-full py-8 lg:py-16 bg-black'>
      <div className='grid grid-cols-2 justify-between lg:gap-4 px-8 lg:px-24 mb-16'>
        {LINKS.map(({ title, items }) => (
          <ul key={title}>
            <Typography color='white' className='mb-3 font-medium text-[14px] lg:text-[24px]'>
              {title}
            </Typography>
            {items.map((link) => (
              <li key={link}>
                <Typography
                  color='white'
                  className='py-1.5 font-normal transition-colors text-xs lg:text-base'
                >
                  {link}
                </Typography>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className='px-4 lg:px-16 flex flex-col lg:flex-row lg:justify-between lg:items-center'>
        <div className='text-white'>
          <Typography className='mb-4'>Nhận email của chúng tôi</Typography>
          <div className='flex relative lg:w-[400px] mb-4'>
            <Input
              type='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white'
              crossOrigin=''
            ></Input>
            <Button
              size='sm'
              color={email ? 'white' : 'blue-gray'}
              disabled={!email}
              className='!absolute right-1 top-1 rounded'
            >
              Gửi
            </Button>
          </div>
        </div>
        <div className='flex gap-4 text-white justify-center'>
          <Link to='https://www.facebook.com/'>
            <FaFacebook size='2rem' color='#fff' className='hover:bg-indigo-600 hover:text-white' />
          </Link>
          <Link to='https://www.instagram.com/'>
            <FaInstagram
              size='2rem'
              color='#fff'
              className='hover:bg-indigo-600 hover:text-white'
            />
          </Link>
          <Link to='https://twitter.com/home'>
            <FaTiktok size='2rem' color='#fff' className='hover:bg-indigo-600 hover:text-white' />
          </Link>
          <Link to='https://www.linkedin.com/feed/'>
            <FaYoutube size='2rem' color='#fff' className='hover:bg-indigo-600 hover:text-white' />
          </Link>
        </div>
      </div>
    </footer>
  );
}
