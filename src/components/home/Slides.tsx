import { Carousel, Button, Typography } from '@material-tailwind/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const Slides: Component<{ slides: SlideData[] }> = ({ slides }) => {
  return (
    <Carousel
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
      {slides.map((slide, index) => (
        <div className='relative'>
          <img
            key={index}
            src={slide.src}
            alt={slide.alt}
            className='h-[200px] object-cover w-full lg:h-[600px]'
          />
          <div className='absolute bg-black opacity-40 w-full bottom-1/4 lg:w-[400px] lg:left-1/3 lg:top-1/3 text-center flex flex-col items-center text-white py-5'>
            <Typography className='text-xl lg:text-[52px] font-bold mb-3 leading-tight'>
              3D printing service
            </Typography>
            <Typography className='text-sm lg:text-base mb-3'>Mẫu có sẵn hoặc tải lên</Typography>
            <Button className='hover:bg-white hover:text-black'>Khám phá thêm</Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
