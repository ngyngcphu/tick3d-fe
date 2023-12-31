import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DataType {
  name: string;
  value: number;
}

const UploadChart: Component<{ data: DataType[] }> = ({ data }) => (
  <ResponsiveContainer width='100%' height='100%'>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Line type='monotone' dataKey='value' stroke='#cb3310' activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

export default UploadChart;
