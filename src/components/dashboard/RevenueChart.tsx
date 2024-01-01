import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const RevenueChart: Component<{ data: DataType[] }> = ({ data }) => (
  <ResponsiveContainer width='100%' height='100%'>
    <AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Area type='monotone' dataKey='value' stroke='#FF6633' fill='#FFB399' />
    </AreaChart>
  </ResponsiveContainer>
);
