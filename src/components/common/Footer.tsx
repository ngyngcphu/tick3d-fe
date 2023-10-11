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
    <footer className='relative w-full py-16 bg-black'>
      <div className='grid grid-cols-3 justify-between gap-4 px-24 mb-16'>
        {LINKS.map(({ title, items }) => (
          <ul key={title}>
            <Typography variant='small' color='white' className='mb-3 font-medium text-lg'>
              {title}
            </Typography>
            {items.map((link) => (
              <li key={link}>
                <Typography
                  as='a'
                  href='#'
                  color='white'
                  className='py-1.5 font-normal transition-colors'
                >
                  {link}
                </Typography>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div className='flex justify-between px-16 items-center'>
        <div className='text-white'>
          <Typography className='mb-4'>Nhận email của chúng tôi</Typography>
          <div className='flex relative'>
            <Input
              type='email'
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white w-[300px]'
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
        <div className='flex gap-4 text-white sm:justify-center'>
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
