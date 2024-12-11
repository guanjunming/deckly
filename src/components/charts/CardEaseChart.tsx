"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHeader from "./ChartHeader";

const chartConfig = {
  ease: {
    label: "Ease",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const makeChartData = (cardEase: Record<number, number>) => {
  const minEase = Math.min(...Object.keys(cardEase).map(parseFloat));
  const maxEase = Math.max(...Object.keys(cardEase).map(parseFloat)) + 0.05;

  const chartData: { ease: number; count: number }[] = [];

  for (let ease = Math.floor(minEase * 5) / 5; ease <= maxEase; ease += 0.05) {
    const roundedEase = Math.round(ease * 100) / 100;
    chartData.push({
      ease: roundedEase,
      count: cardEase[roundedEase] || 0,
    });
  }

  return chartData;
};

export const CardEaseChart = ({
  data,
}: {
  data: { cardEase: Record<number, number>; averageEase: number };
}) => {
  const chartData = makeChartData(data.cardEase);
  console.log(JSON.stringify(chartData));
  return (
    <Card>
      <ChartHeader description="The lower the ease, the more frequently a card will appear">
        Card Ease
      </ChartHeader>
      <CardContent className="p-6 pl-0">
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="ease"
              tickMargin={10}
              tickFormatter={(value) => {
                return `${Math.round(value * 100)}%`;
              }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="var(--color-ease)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="justify-center">
        <div>{`Average ease: ${Math.round(data.averageEase * 100)}%`}</div>
      </CardFooter>
    </Card>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: number;
}) => {
  if (active && payload && payload.length) {
    const ease = payload[0].payload.ease;
    const count = payload[0].value;

    return (
      <div className="rounded border bg-card p-2 shadow">
        <p>{`${count} cards with ${Math.round(ease * 100)}% ease`}</p>
      </div>
    );
  }
  return null;
};
