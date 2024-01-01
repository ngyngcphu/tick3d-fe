import { Card, Typography, Select, Option } from '@material-tailwind/react';
import {
  CategoryChart,
  RevenueChart,
  UserChart,
  TopProduct,
  UploadChart
} from '@components/dashboard';

// Data format for CategoryChart, UploadChart and RevenueChart
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 100 },
  { name: 'Group F', value: 100 }
];

// Data format for UserChart
const barData = [
  {
    name: 'Jan',
    'old user': 500,
    'new user': 100
  },
  {
    name: 'Feb',
    'old user': 600,
    'new user': 200
  },
  {
    name: 'Mar',
    'old user': 800,
    'new user': 150
  },
  {
    name: 'Apr',
    'old user': 950,
    'new user': 300
  },
  {
    name: 'May',
    'old user': 1250,
    'new user': 100
  },
  {
    name: 'Jun',
    'old user': 1350,
    'new user': 250
  }
];

export function AdminDashboard() {
  return (
    <div className='grid lg:grid-cols-12 gap-5'>
      <Card placeholder='' className='lg:col-span-5 h-96 p-3 flex flex-col items-center'>
        <Typography placeholder='' variant='h5'>
          Thống kê sản phẩm theo danh mục
        </Typography>
        <CategoryChart data={data} />
      </Card>
      <Card placeholder='' className='lg:col-span-7 h-96 p-3 flex flex-col items-center'>
        <div className='grid grid-cols-2 justify-items-center items-center w-full mb-3'>
          <Typography placeholder='' variant='h5'>
            Thống kê sản phẩm được upload
          </Typography>
          <Select placeholder='' label='Select Period'>
            <Option>Weekly</Option>
            <Option>Monthly</Option>
            <Option>Quarterly</Option>
          </Select>
        </div>
        <UploadChart data={data} />
      </Card>
      <Card placeholder='' className='lg:col-span-5 h-96 p-3 flex flex-col items-center gap-10'>
        <Typography placeholder='' variant='h5'>
          Top sản phẩm bán chạy
        </Typography>
        <TopProduct />
      </Card>
      <Card placeholder='' className='lg:col-span-7 h-96 p-3 flex flex-col items-center'>
        <div className='grid grid-cols-2 justify-items-center items-center w-full mb-3'>
          <Typography placeholder='' variant='h5'>
            Thống kê người dùng
          </Typography>
          <Select placeholder='' label='Select Period'>
            <Option>Weekly</Option>
            <Option>Monthly</Option>
            <Option>Quarterly</Option>
          </Select>
        </div>
        <UserChart data={barData} />
      </Card>
      <Card placeholder='' className='lg:col-span-12 h-96 p-3 flex flex-col items-center'>
        <div className='grid grid-cols-2 justify-items-center items-center w-full mb-3'>
          <Typography placeholder='' variant='h5'>
            Thống kê doanh thu
          </Typography>
          <Select
            placeholder=''
            label='Select Period'
            className='self-end'
            containerProps={{ className: 'w-2/3' }}
          >
            <Option>Weekly</Option>
            <Option>Monthly</Option>
            <Option>Quarterly</Option>
          </Select>
        </div>
        <RevenueChart data={data} />
      </Card>
    </div>
  );
}
