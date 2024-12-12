"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import ChartHeader from "./ChartHeader";
import { appendS } from "@/lib/utils";
import { AllTierType } from "@/data/subscriptionTiers";
import ChartContentWrapper from "./ChartContentWrapper";

const chartConfig = {
  interval: {
    label: "Interval",
    color: "#529ac7",
  },
} satisfies ChartConfig;

const makeChartData = (cardInterval: Record<number, number>) => {
  const intervals = Object.keys(cardInterval).map(Number);
  const minInterval = Math.min(...intervals);
  const maxInterval = Math.max(...intervals);

  const chartData = [];

  for (let i = minInterval; i <= maxInterval; i++) {
    chartData.push({
      interval: i,
      count: cardInterval[i] || 0,
    });
  }

  return chartData;
};

export const CardIntervalChart = ({
  data,
  subscriptionTier,
}: {
  data: { cardInterval: Record<number, number>; averageInterval: number };
  subscriptionTier: AllTierType;
}) => {
  const chartData = makeChartData(data.cardInterval);

  return (
    <Card className="flex flex-col">
      <ChartHeader description="Delays until review cards are shown again">
        Review Intervals
      </ChartHeader>
      <ChartContentWrapper
        subscriptionTier={subscriptionTier}
        hasData={chartData.length > 0}
      >
        <CardContent className="py-3 pl-0">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="interval" tickMargin={5} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="var(--color-interval)" radius={2} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="justify-center pb-3">
          <div>{`Average interval: ${data.averageInterval} ${appendS("day", data.averageInterval)}`}</div>
        </CardFooter>
      </ChartContentWrapper>
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
    const interval = payload[0].payload.interval;
    const count = payload[0].value;

    return (
      <div className="rounded border bg-card p-2 shadow">
        <p>{`${count} ${appendS("card", count)} with a ${interval} day interval`}</p>
      </div>
    );
  }
  return null;
};
