import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = [
  "#4269d0",
  "#efb118",
  "#ff725c",
  "#6cc5b0",
  "#3ca951",
  "#ff8ab7",
  "#a463f2",
  "#97bbf5",
  "#9c6b4e",
  "#9498a0"
];

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: CustomizedLabelProps) => {
  const radius = outerRadius + 25;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill={'black'} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

interface PieChartProps {
  data: {[key: string]: number} | null;
}

export default function PieChartComponent(props: PieChartProps) {
  const { data } = props;

  if (!data) {
    return null;
  }

  const dataAsArray = Object.keys(data).map((key) => ({
    name: key,
    value: data[key]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={dataAsArray}
          nameKey={"name"}
          dataKey={"value"}
          label={renderCustomizedLabel}
          outerRadius={80}
        >
          {dataAsArray.map((x, index) => (
            <Cell stroke="0" key={`cell-${index}`} fill={`${COLORS[index]}`} />
          ))}
        </Pie>
        <Legend layout="vertical"
                align="left"
                verticalAlign="middle"
                formatter={(value, entry, index) => <span className="text-color-class">{value}</span>} />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

