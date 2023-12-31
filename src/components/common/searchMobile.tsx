import React from 'react';
import { Dialog, DialogBody } from '@material-tailwind/react';
import { MobileSearchDefaultModel } from './SearchDefaultModelBar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function MobileDefaultModelSearch() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <MagnifyingGlassIcon
        strokeWidth={2}
        className='w-6 h-6 cursor-pointer'
        onClick={handleOpen}
      />
      <Dialog open={open} handler={handleOpen} size='xxl'>
        <DialogBody className='mx-0 px-0 pt-3'>
          <MobileSearchDefaultModel handleSuggestionSelected={handleOpen} />
        </DialogBody>
      </Dialog>
    </>
  );
}
