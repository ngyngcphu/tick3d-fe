import { flexRender, Row } from '@tanstack/react-table';

import { Dialog, DialogBody, DialogHeader, Typography, Button } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const ManageOrderProduct: Component<{ row: Row<Order>; index: number }> = ({
  row,
  index
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <tr
      className={index % 2 === 0 ? 'cursor-pointer' : 'bg-white cursor-pointer'}
      key={row.id}
      onClick={() => setOpenDialog(true)}
    >
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id} className='py-2 px-4'>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
      <Dialog placeholder='' open={openDialog} handler={() => setOpenDialog(!openDialog)}>
        <DialogHeader placeholder='' className='flex justify-between border-b-2 border-gray-200'>
          <Typography
            placeholder=''
            variant='h4'
          >{`Chi tiết đơn hàng ${row.original.idOrder}`}</Typography>
          <XMarkIcon
            width={32}
            className='cursor-pointer hover:text-red-500'
            onClick={() => setOpenDialog(!false)}
          />
        </DialogHeader>
        <DialogBody placeholder=''>
          <div className='mb-5'>
            <Typography placeholder='' variant='h5' className='text-black'>
              Thông tin khách hàng
            </Typography>
            <Typography placeholder=''>{`Họ và tên: ${row.original.customerName}`}</Typography>
          </div>
          <div>
            <Typography placeholder='' variant='h5' className='text-black mb-5'>
              Giỏ hàng
            </Typography>
            {row.original.listProduct.map((product) => (
              <div className='h-[50px] lg:h-[70px] mb-5 flex justify-between'>
                <div className='flex gap-3 items-center'>
                  <img src={product.image} className='h-full w-[70px] lg:w-[100px]' />
                  <Typography placeholder='' className='text-black font-bold'>
                    {product.name}
                  </Typography>
                </div>
                <div className='flex gap-3 items-center'>
                  <Typography placeholder=''>{`Số lượng: ${product.number}`}</Typography>
                  <Button placeholder='' className='py-2 text-white font-bold bg-red-700 '>{`${
                    product.cost * product.number
                  } VND`}</Button>
                </div>
              </div>
            ))}
          </div>
        </DialogBody>
      </Dialog>
    </tr>
  );
};
