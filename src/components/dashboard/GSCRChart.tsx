
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const GSCRChart = () => {
  const chartData = [
    { date: '05/15', rating: 1580 },
    { date: '05/22', rating: 1595 },
    { date: '05/29', rating: 1570 },
    { date: '06/05', rating: 1615 },
    { date: '06/12', rating: 1630 },
    { date: '06/19', rating: 1625 },
    { date: '06/26', rating: 1645 },
  ];

  const chartConfig = {
    rating: {
      label: "GSCR Rating",
      color: "#16a34a",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-green-700">
          📈 Your GSCR (Global Speed Chess Rating) Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Current Rating</p>
            <p className="text-2xl font-bold text-green-700">1645</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Personal Best</p>
            <p className="text-2xl font-bold text-green-600">1645</p>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="h-80">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 20', 'dataMax + 20']} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line 
              type="monotone" 
              dataKey="rating" 
              stroke="var(--color-rating)" 
              strokeWidth={3}
              dot={{ fill: "var(--color-rating)", strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GSCRChart;
