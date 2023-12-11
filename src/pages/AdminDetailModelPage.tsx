import { ImageSlider } from '@components/model';
import { useModelStore } from '@states';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Chip,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
  Card,
  CardBody,
  Select,
  Option
} from '@material-tailwind/react';
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowModel,
  useReactTable
} from '@tanstack/react-table';
import Chart from 'react-apexcharts';
import DonutChart from 'react-donut-chart';
export function AdminDetailModelPage() {
  const date = new Date();
  const formattedDay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const params = useParams<string>();
  const { modelData, getModelById } = useModelStore();
  const [openRemoveDialog, setOpenRemoveDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>('');
  const [productCost, setProductCost] = useState<number | string>();
  const [productDiscount, setProductDiscount] = useState<number | string>();
  const [productImage, setProductImage] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const totalVenue = 30000000;
  const infoProduct = useMemo(
    () => ({
      totalBuyer: 50,
      totalProduct: 70,
      productVenue: 6000000
    }),
    []
  );
  const lineChartConfig = {
    type: 'line',
    height: 240,
    series: [
      {
        name: 'Sales',
        data: [1, 2, 1, 3, 4, 1, 3, 5, 1, 2]
      }
    ],
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      title: {
        show: ''
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#e21212'],
      stroke: {
        lineCap: 'round',
        curve: 'smooth'
      },
      markers: {
        size: 0
      },
      xaxis: {
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400
          }
        },
        categories: [
          '3/10',
          '5/10',
          '6/10',
          '10/10',
          '15/10',
          '16/10',
          '20/10',
          '24/10',
          '27/10',
          '29/10',
          '30/10'
        ]
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'inherit',
            fontWeight: 400
          }
        }
      },
      grid: {
        show: true,
        borderColor: '#dddddd',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 5,
          right: 20
        }
      },
      fill: {
        opacity: 0.8
      },
      tooltip: {
        theme: 'red'
      }
    }
  };
  const listBuyer = useMemo(
    () => [
      {
        fullName: 'Nguyễn Hoàng Duy Tân',
        buyDate: new Date(2023, 9, 25),
        number: 3,
        totalCost: 150000
      },
      {
        fullName: 'Nguyễn Minh Lộc',
        buyDate: new Date(2023, 10, 20),
        number: 2,
        totalCost: 98000
      },
      {
        fullName: 'Trần Nguyễn Minh Tuệ',
        buyDate: new Date(2023, 10, 5),
        number: 1,
        totalCost: 48000
      }
    ],
    []
  );
  const columnHelper = createColumnHelper<ModelInfoBuyer>();
  const columnDefs = useMemo(
    () => [
      columnHelper.accessor('fullName', {
        header: 'Họ và tên',
        cell: (info) => info.getValue()
      }),
      columnHelper.accessor('buyDate', {
        header: 'Ngày mua',
        cell: (info) => (
          <span>{`${info.getValue().getMonth()}/${info.getValue().getDate()}/${info
            .getValue()
            .getFullYear()}`}</span>
        )
      }),
      columnHelper.accessor('number', {
        header: 'Số lượng',
        cell: (info) => info.renderValue()
      }),
      columnHelper.accessor('totalCost', {
        header: 'Tổng tiền',
        cell: (info) => <span>{`${info.getValue().toLocaleString('en-US')} VND`}</span>
      })
    ],
    [columnHelper]
  );
  const listBuyerTable = useReactTable<ModelInfoBuyer>({
    columns: columnDefs,
    data: listBuyer,
    getCoreRowModel: getCoreRowModel<RowModel<ModelInfoBuyer>>()
  });
  useEffect(() => {
    if (params.id) {
      getModelById(params.id);
    }
  }, [params.id, getModelById]);
  return (
    <div className='flex p-5 gap-4'>
      <div className='w-[25%]'>
        <div className='flex flex-col items-center'>
          <Typography className='font-bold text-2xl lg:mb-3'>{modelData.name}</Typography>
          <ImageSlider images={[modelData.image, modelData.subImage1, modelData.subImage2]} />
        </div>
        <div className='mt-5'>
          <Typography className='font-bold lg:mb-3' variant='h6'>
            Thông tin chi tiết
          </Typography>
          <Typography className='lg:mb-3' variant='paragraph'>
            {modelData?.description}
          </Typography>
        </div>
        <Typography className='font-bold lg:mb-3' variant='h6'>
          Giá sản phẩm
        </Typography>
        {modelData.discount > 0 ? (
          <div>
            <Chip
              value={`-${modelData.discount * 100}%`}
              color='red'
              className='w-fit rounded-full'
            />
            <div className='flex gap-2'>
              <Typography className='text-black font-bold lg:mb-3 line-through'>
                {`${modelData.price.toLocaleString('en-US')} VNĐ`}
              </Typography>
              <Typography className='text-red-500 font-bold lg:mb-3'>
                {`${(modelData.price * (1 - modelData.discount)).toLocaleString('en-US')} VNĐ`}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography className='text-red-500 font-bold lg:mb-3'>
            {`${modelData.price.toLocaleString('en-US')} VNĐ`}
          </Typography>
        )}
        <div className='flex gap-3'>
          <Typography className='font-bold lg:mb-3' variant='h6'>
            Ngày chỉnh sửa:
          </Typography>
          {formattedDay}
        </div>
        <div className='flex gap-3'>
          <Typography className='font-bold lg:mb-3' variant='h6'>
            Ngày xóa:
          </Typography>
          {formattedDay}
        </div>
        <div className='flex mt-4 gap-5 justify-center'>
          <Button
            className='w-[150px] flex gap-2 justify-center items-center bg-transparent text-gray-600 outline outline-2 outline-gray-600'
            onClick={() => setOpenEditDialog(true)}
          >
            <span>Chỉnh sửa</span>
            <PencilSquareIcon width={14} />
          </Button>
          <Button
            className='w-[150px] flex justify-center bg-transparent text-red-600 outline outline-2 outline-red-600'
            onClick={() => setOpenRemoveDialog(true)}
          >
            <span>Xóa</span>
            <TrashIcon width={14} />
          </Button>
        </div>
      </div>
      <div className='w-[75%]'>
        <div className='flex gap-2 mb-3'>
          <Card className='bg-yellow-200 w-1/3'>
            <CardBody className='flex justify-around'>
              <UsersIcon width={60} />
              <div className='flex flex-col items-end'>
                <Typography className='font-bold lg:mb-2' variant='h6'>
                  Số người mua
                </Typography>
                <Typography className='font-bold lg:mb-2' variant='h3'>
                  {infoProduct.totalBuyer}
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className='bg-green-200 w-1/3'>
            <CardBody className='flex justify-around'>
              <BuildingStorefrontIcon width={60} />
              <div className='flex flex-col items-end'>
                <Typography className='font-bold lg:mb-2' variant='h6'>
                  Số sản phẩm đã bán
                </Typography>
                <Typography className='font-bold lg:mb-2' variant='h3'>
                  {infoProduct.totalProduct}
                </Typography>
              </div>
            </CardBody>
          </Card>
          <Card className='bg-blue-200 w-1/3'>
            <CardBody className='flex justify-around'>
              <CurrencyDollarIcon width={60} />
              <div className='flex flex-col items-end'>
                <Typography className='font-bold lg:mb-2' variant='h6'>
                  Doanh thu
                </Typography>
                <Typography
                  className='font-bold lg:mb-2'
                  variant='h3'
                >{`${infoProduct.productVenue.toLocaleString('en-US')} VNĐ`}</Typography>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className='flex gap-5 h-[400px]'>
          <Card className='w-[60%] p-5'>
            <div className='flex items-center gap-2'>
              <Typography className='w-[60%] font-bold'>Thống kê sản phẩm được bán</Typography>
              <Select label='Select Version'>
                <Option>Tháng 9 - 2023</Option>
                <Option>Tháng 10 - 2023</Option>
                <Option>Tháng 11 - 2023</Option>
                <Option>Tháng 12 - 2023</Option>
              </Select>
            </div>
            <CardBody>
              <Chart config={lineChartConfig} />
            </CardBody>
          </Card>
          <Card className='w-[40%] p-5'>
            <Typography className='font-bold '>Thống kê doanh thu</Typography>
            <DonutChart
              data={[
                {
                  label: 'Doanh thu sản phẩm',
                  value: infoProduct.productVenue
                },
                {
                  label: 'Tổng doanh thu',
                  value: totalVenue
                }
              ]}
              width={400}
            />
          </Card>
        </div>
        <table className='w-full my-5'>
          <thead className='border-2 border-b-black mb-5'>
            {listBuyerTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='px-4 text-left'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {listBuyerTable.getRowModel().rows.map((row, index) => (
              <tr
                className={index % 2 === 0 ? 'cursor-pointer' : 'bg-white cursor-pointer'}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='py-2 px-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openRemoveDialog} handler={() => setOpenRemoveDialog(!openRemoveDialog)}>
        <DialogHeader className='flex justify-end'>
          <XMarkIcon
            onClick={() => setOpenRemoveDialog(false)}
            width={30}
            className='cursor-pointer'
          />
        </DialogHeader>
        <DialogBody>
          <Typography className='text-center mb-5' variant='h4'>
            Xóa sản phẩm này?
          </Typography>
          <div className='flex justify-center gap-20'>
            <Button className='bg-red-600'>Xóa</Button>
            <Button onClick={() => setOpenRemoveDialog(false)}>Thoát</Button>
          </div>
        </DialogBody>
      </Dialog>
      <Dialog open={openEditDialog} handler={() => setOpenEditDialog(!openEditDialog)}>
        <DialogHeader className='flex justify-end'>
          <XMarkIcon
            onClick={() => setOpenEditDialog(false)}
            width={30}
            className='cursor-pointer'
          />
        </DialogHeader>
        <DialogBody>
          <Typography className='font-bold lg:mb-2' variant='h6'>
            Tên sản phẩm
          </Typography>
          <Input
            crossOrigin=''
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            label='Name'
          />
          <div className='flex gap-2 justify-between mt-3'>
            <div className='w-1/2'>
              <Typography className='font-bold lg:mb-2' variant='h6'>
                Giá sản phẩm
              </Typography>
              <Input
                type='number'
                crossOrigin=''
                value={productCost}
                onChange={(e) => setProductCost(e.target.value)}
                label='Cost'
              />
            </div>
            <div className='w-1/2'>
              <Typography className='font-bold mb-2' variant='h6'>
                Mức giảm giá
              </Typography>
              <Input
                type='number'
                crossOrigin=''
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
                label='Discount'
              />
            </div>
          </div>
          <Typography className='font-bold my-2' variant='h6'>
            Link ảnh
          </Typography>
          <Input
            crossOrigin=''
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            label='Image Link'
          />
          <Typography className='font-bold my-2' variant='h6'>
            Thông tin chi tiết
          </Typography>
          <Input
            crossOrigin=''
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            label='Description'
          />
        </DialogBody>
        <DialogFooter>
          <Button className='outline outline-2 outline-green-400 bg-transparent text-green-400'>
            Cập nhật
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
