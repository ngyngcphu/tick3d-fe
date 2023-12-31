import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#e67132', '#87b63d', '#f8ce26', '#7619bd', '#0678dc', '#cc0849'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface DataType {
  name: string;
  value: number;
}

const CategoryChart: Component<{ data: DataType[] }> = ({ data }) => (
  <ResponsiveContainer width='100%' height='100%'>
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx='50%'
        cy='50%'
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill='#8884d8'
        dataKey='value'
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend layout='vertical' align='right' verticalAlign='middle' />
    </PieChart>
  </ResponsiveContainer>
);

export default CategoryChart;