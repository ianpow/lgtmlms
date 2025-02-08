import React from "react";
import { Card } from "../../ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface PredictiveChartProps {
  data: Array<{
    date: string;
    actual: number;
    predicted: number;
  }>;
  title: string;
}

const PredictiveChart = ({ data, title }: PredictiveChartProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8884d8"
              strokeWidth={2}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#82ca9d"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PredictiveChart;
