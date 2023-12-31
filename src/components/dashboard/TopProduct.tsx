import { Card, CardHeader, CardBody, Typography, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function Pagination() {
  const [active, setActive] = useState(1);

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className='flex items-center gap-8'>
      <IconButton
        placeholder=''
        size='sm'
        variant='outlined'
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className='h-4 w-4' />
      </IconButton>
      <Typography placeholder='' color='gray' className='font-normal'>
        Page <strong className='text-gray-900'>{active}</strong> of{' '}
        <strong className='text-gray-900'>10</strong>
      </Typography>
      <IconButton
        placeholder=''
        size='sm'
        variant='outlined'
        onClick={next}
        disabled={active === 10}
      >
        <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
      </IconButton>
    </div>
  );
}

function ProductCard() {
  return (
    <Card placeholder='' className='h-full w-5/6 max-w-[48rem] flex-row h-70'>
      <CardHeader
        placeholder=''
        shadow={false}
        floated={false}
        className='m-0 w-2/5 h-full shrink-0 rounded-r-none'
      >
        <img
          src='data:image/jpeg;base64,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'
          alt='model-image'
          className='h-full w-full object-cover'
        />
      </CardHeader>
      <CardBody placeholder='' className='h-full'>
        <Typography placeholder='' variant='h4' color='blue-gray' className='mb-1'>
          Product Name
        </Typography>
        <Typography placeholder='' variant='h6' color='gray' className='mb-2 uppercase'>
          Price
        </Typography>
        <Typography placeholder='' color='gray' className='font-normal h-20 overflow-hidden'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur distinctio sapiente
          reprehenderit error natus libero deserunt ducimus quasi fuga expedita consequatur
          blanditiis sit voluptatum consequuntur incidunt, dolorem iusto debitis numquam?
        </Typography>
      </CardBody>
    </Card>
  );
}

function TopProduct() {
  return (
    <div className='h-full flex flex-col items-center gap-6'>
      <ProductCard />
      <Pagination />
    </div>
  );
}

export default TopProduct;
