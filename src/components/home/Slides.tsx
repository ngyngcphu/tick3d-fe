import { Carousel, Button, Spinner, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { homeService } from '@services';
import { retryQueryFn } from '@utils';
import { useQuery } from '@tanstack/react-query';

export function Slides() {
  const { data: slides } = useQuery({
    queryKey: ['/api/home/slides'],
    queryFn: () => homeService.getSlideImages(),
    retry: retryQueryFn
  });

  return (
    <Carousel
      placeholder=''
      className='rounded-lg'
      prevArrow={({ handlePrev }) => (
        <div className='absolute top-[40%] left-[5%] p-[5px] rounded-full bg-white opacity-40 cursor-pointer hover:opacity-100'>
          <ChevronLeftIcon strokeWidth={4} className='w-5 h-5' onClick={handlePrev} />
        </div>
      )}
      nextArrow={({ handleNext }) => (
        <div className='absolute top-[40%] right-[5%] p-[5px] rounded-full bg-white opacity-40 cursor-pointer hover:opacity-100'>
          <ChevronRightIcon strokeWidth={4} className='w-5 h-5' onClick={handleNext} />
        </div>
      )}
      loop={true}
      autoplay={true}
      autoplayDelay={3000}
    >
      {slides ? (
        slides.map((slide, index) => (
          <div key={index} className='relative'>
            <img
              src={slide.src}
              alt={slide.alt}
              className='h-[200px] object-cover w-full lg:h-[400px]'
            />
            <div className='absolute bg-black opacity-40 w-full bottom-1/4 lg:w-[400px] lg:left-1/3 lg:top-[15%] text-center flex flex-col items-center text-white py-5'>
              <Typography
                placeholder=''
                className='text-xl lg:text-[52px] font-bold mb-3 lg:mb-1 leading-tight'
              >
                3D Printing Service
              </Typography>
              <Typography
                placeholder=''
                className='text-sm lg:text-base mb-3 lg:mb-1 font-extrabold'
              >
                Mẫu có sẵn hoặc tải lên
              </Typography>
              <Button placeholder='' className='hover:bg-white hover:text-black font-extrabold'>
                Khám phá thêm
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div className='grid justify-items-center items-center'>
          <Spinner color='green' className='h-12 w-12' />
        </div>
      )}
    </Carousel>
  );
}
