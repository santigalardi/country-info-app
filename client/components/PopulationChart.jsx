'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const PopulationChart = ({ data }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Population over time
      </h2>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis width={100} />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none' }}
            labelStyle={{ color: '#ffffff', fontWeight: 'bold' }}
            itemStyle={{ color: '#1D4ED8' }}
          />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#1D4ED8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PopulationChart;
