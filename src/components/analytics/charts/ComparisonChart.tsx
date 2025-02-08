import React from "react";
import { Card } from "../../ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ComparisonChartProps {
  data: Array<{
    name: string;
    user: number;
    average: number;
  }>;
  title: string;
}

const ComparisonChart = ({ data, title }: ComparisonChartProps) => {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="user" fill="#8884d8" name="Your Score" />
            <Bar dataKey="average" fill="#82ca9d" name="Class Average" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ComparisonChart;
