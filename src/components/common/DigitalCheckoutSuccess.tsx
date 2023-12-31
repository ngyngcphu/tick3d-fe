import React from 'react';
import { Button, Dialog, DialogBody, Typography } from '@material-tailwind/react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';

export function useDigitalCheckoutSuccessModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const navigate: NavigateFunction = useNavigate();

  return {
    handleOpen: handleOpen,
    DigitalCheckoutSuccessModal: () => (
      <>
        <Dialog open={open} handler={handleOpen} size='sm' placeholder=' '>
          <DialogBody
            className='mx-0 px-0 pt-3 py-8 flex flex-col justify-center items-center'
            placeholder=' '
          >
            <div className='w-full flex flex-col justify-center items-center h-32 overscroll-y-auto'>
              <div className='p-5 rounded-full bg-[#DBEAFE]'>
                <CheckIcon className='w-5 h-5 text-blue/1' />
              </div>
              <Typography className='text-blue/1 text-2xl font-bold mt-4' placeholder=' '>
                Your payment success
              </Typography>
            </div>

            <Button
              placeholder=' '
              onClick={() => navigate(`/category`)}
              className='px-4 py-2 rounded-lg text-white bg-green-500 text-sm font-semibold mt-2 normal-case'
            >
              Tiếp tục mua hàng
            </Button>
          </DialogBody>
        </Dialog>
      </>
    )
  };
}
