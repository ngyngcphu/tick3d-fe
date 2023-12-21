import { Typography } from '@material-tailwind/react';
import { StarIcon } from '@heroicons/react/24/solid';

export const STAR_FILTER = [
  {
    label: (
      <Typography className='flex items-center font-medium' variant='h6'>
        100 <StarIcon className='w-6 h-6 text-yellow-700' /> & up
      </Typography>
    ),
    value: 100
  },
  {
    label: (
      <Typography className='flex items-center font-medium' variant='h6'>
        200 <StarIcon className='w-6 h-6 text-yellow-700' /> & up
      </Typography>
    ),
    value: 200
  },
  {
    label: (
      <Typography className='flex items-center font-medium' variant='h6'>
        300 <StarIcon className='w-6 h-6 text-yellow-700' /> & up
      </Typography>
    ),
    value: 300
  },
  {
    label: (
      <Typography className='flex items-center font-medium' variant='h6'>
        400 <StarIcon className='w-6 h-6 text-yellow-700' /> & up
      </Typography>
    ),
    value: 400
  },
  {
    label: (
      <Typography className='flex items-center font-medium' variant='h6'>
        500 <StarIcon className='w-6 h-6 text-yellow-700' /> & up
      </Typography>
    ),
    value: 500
  }
];
