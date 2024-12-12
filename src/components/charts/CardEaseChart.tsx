"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import ChartHeader from "./ChartHeader";
import { appendS } from "@/lib/utils";
import ChartContentWrapper from "./ChartContentWrapper";
import { AllTierType } from "@/data/subscriptionTiers";

const chartConfig = {
  ease: {
    label: "Ease",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const makeChartData = (cardEase: Record<number, number>) => {
  const ease = Object.keys(cardEase).map(parseFloat);
  const minEase = Math.min(...ease);
  const maxEase = Math.max(...ease);

  const chartData = [];

  for (let ease = Math.floor(minEase * 5) / 5; ease <= maxEase; ease += 0.05) {
    const easeVal = Math.round(ease * 100) / 100;
    chartData.push({
      ease: easeVal,
      count: cardEase[easeVal] || 0,
    });
  }

  return chartData;
};

export const CardEaseChart = ({
  data,
  subscriptionTier,
}: {
  data: { cardEase: Record<number, number>; averageEase: number };
  subscriptionTier: AllTierType;
}) => {
  const chartData = makeChartData(data.cardEase);

  return (
    <Card className="flex flex-col">
      <ChartHeader description="The lower the ease, the more frequently a card will appear">
        Card Ease
      </ChartHeader>

      <ChartContentWrapper
        subscriptionTier={subscriptionTier}
        hasData={chartData.length > 0}
      >
        <CardContent className="py-3 pl-0">
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
        <CardFooter className="justify-center pb-3">
          <div>{`Average ease: ${data.averageEase}%`}</div>
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
    const ease = payload[0].payload.ease;
    const count = payload[0].value;

    return (
      <div className="rounded border bg-card p-2 shadow">
        <p>{`${count} ${appendS("card", count)} with ${Math.round(ease * 100)}% ease`}</p>
      </div>
    );
  }
  return null;
};
