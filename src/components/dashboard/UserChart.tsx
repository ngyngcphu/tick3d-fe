import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type BarData = {
  name: string;
  'old user': number;
  'new user': number;
};

const UserChart: Component<{ data: BarData[] }> = ({ data }) => (
  <ResponsiveContainer width='100%' height='100%'>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='old user' stackId='a' fill='#FF6633' />
      <Bar dataKey='new user' stackId='a' fill='#FFB399' />
    </BarChart>
  </ResponsiveContainer>
);

export default UserChart;
