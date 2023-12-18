import {
  ShoppingCartIcon,
  Cog8ToothIcon,
  TruckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { Button, Stepper, Step, Typography } from '@material-tailwind/react';
import { useState, useMemo } from 'react';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import { ManageOrderProduct } from '@components/model';

export function ManagementOrderPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLastStep, setIsLastStep] = useState<boolean>(false);
  const [isFirstStep, setIsFirstStep] = useState<boolean>(false);
  const columnHelper = createColumnHelper<Order>();

  const columnDefs = useMemo(
    () => [
      columnHelper.accessor('idOrder', {
        header: 'Mã đơn hàng',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('dateOrder', {
        header: 'Ngày tạo đơn hàng',
        cell: (info) => (
          <span>{`${info.getValue().getMonth()}/${info.getValue().getDate()}/${info
            .getValue()
            .getFullYear()}`}</span>
        )
      }),
      columnHelper.accessor('customerName', {
        header: 'Tên khách hàng',
        cell: (info) => info.renderValue()
      }),
      columnHelper.accessor('typeOrder', {
        header: 'Loại đặt hàng'
      }),
      columnHelper.accessor('totalCost', {
        header: 'Tổng tiền',
        cell: (info) => <span>{`${info.getValue()} VND`}</span>
      }),
      columnHelper.display({
        id: 'acceptOrder',
        header: 'Chấp nhận',
        cell: () => (
          <Button
            className='bg-transparent outline outline-2 outline-red-400 text-red-400'
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep(activeStep + 1);
            }}
            disabled={isLastStep}
          >
            Xử lý
          </Button>
        )
      }),
      columnHelper.display({
        id: 'denyOrder',
        header: 'Từ chối',
        cell: () => (
          <Button
            className='bg-transparent outline outline-2 outline-gray-700 text-gray-700'
            onClick={(e) => {
              e.stopPropagation();
              setActiveStep(activeStep - 1);
            }}
            disabled={isFirstStep}
          >
            Xử lý
          </Button>
        )
      })
    ],
    [columnHelper]
  );
  const orders = useMemo(
    () => [
      {
        idOrder: '1abefe',
        dateOrder: new Date(2021, 11, 25),
        customerName: 'Bao Thanh Thiên',
        typeOrder: 'Trực tiếp',
        totalCost: 133500,
        listProduct: [
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Deft',
            number: 2,
            cost: 20000
          },
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Showmaker',
            number: 3,
            cost: 20000
          }
        ]
      },
      {
        idOrder: '1acedb',
        dateOrder: new Date(2021, 11, 25),
        customerName: 'Triển Chiêu',
        typeOrder: 'Online',
        totalCost: 56150,
        listProduct: [
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Deft',
            number: 2,
            cost: 20000
          },
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Showmaker',
            number: 3,
            cost: 20000
          }
        ]
      },
      {
        idOrder: '1aefbd',
        dateOrder: new Date(2021, 11, 25),
        customerName: 'Tôn Ngộ Không',
        typeOrder: 'Online',
        totalCost: 43750,
        listProduct: [
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Deft',
            number: 2,
            cost: 20000
          },
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Showmaker',
            number: 3,
            cost: 20000
          }
        ]
      },
      {
        idOrder: '1aefbe',
        dateOrder: new Date(2021, 11, 25),
        customerName: 'Degea',
        typeOrder: 'Online',
        totalCost: 91500,
        listProduct: [
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Deft',
            number: 2,
            cost: 20000
          },
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Showmaker',
            number: 3,
            cost: 20000
          }
        ]
      },
      {
        idOrder: '1afbed',
        dateOrder: new Date(2021, 11, 25),
        customerName: 'Phuc',
        typeOrder: 'Trực tiếp',
        totalCost: 55000,
        listProduct: [
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Deft',
            number: 2,
            cost: 20000
          },
          {
            image:
              'https://thumbs.dreamstime.com/z/toy-car-key-yellow-old-fashioned-security-alarm-32581679.jpg',
            name: 'Showmaker',
            number: 3,
            cost: 20000
          }
        ]
      }
    ],
    []
  );
  const orderTable = useReactTable<Order>({
    columns: columnDefs,
    data: orders,
    getCoreRowModel: getCoreRowModel<RowModel<Order>>()
  });
  return (
    <div className='p-5 w-full'>
      <div className='px-[2rem] pb-[4rem] pt-[1rem] bg-white'>
        <Stepper
          className='lg:px-20'
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step className='cursor-pointer'>
            <ShoppingCartIcon className='w-[1.25rem] h-[1.25rem]' />
            <Typography className='absolute -bottom-[2rem] w-max text-center text-black text-[0.5rem] lg:text-[0.75rem]'>
              Đang chờ xử lý
            </Typography>
          </Step>
          <Step className='cursor-pointer'>
            <Cog8ToothIcon className='w-[1.25rem] h-[1.25rem]' />
            <Typography className='absolute -bottom-[2rem] w-max text-center text-black text-[0.5rem] lg:text-[0.75rem]'>
              Đang được làm
            </Typography>
          </Step>
          <Step className='cursor-pointer'>
            <TruckIcon className='w-[1.25rem] h-[1.25rem]' />
            <Typography className='absolute -bottom-[2rem] w-max text-center text-black text-[0.5rem] lg:text-[0.75rem]'>
              Đang giao hàng
            </Typography>
          </Step>
          <Step className='cursor-pointer'>
            <CreditCardIcon className='w-[1.25rem] h-[1.25rem]' />
            <Typography className='absolute -bottom-[2rem] w-max text-center text-black text-[0.5rem] lg:text-[0.75rem]'>
              Đã thanh toán
            </Typography>
          </Step>
        </Stepper>
      </div>

      <div className='flex justify-between mt-3'>
        <Button
          className='text-[10px]'
          onClick={() => setActiveStep(activeStep - 1)}
          disabled={isFirstStep}
        >
          Từ chối tất cả
        </Button>
        <Button
          className='text-[10px] bg-red-600'
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={isLastStep}
        >
          Chấp nhận tất cả
        </Button>
      </div>
      <table className='mx-auto my-5'>
        <thead className='border-2 border-b-black mb-5'>
          {orderTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className='px-4'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {orderTable.getRowModel().rows.map((row, index) => (
            <ManageOrderProduct row={row} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
