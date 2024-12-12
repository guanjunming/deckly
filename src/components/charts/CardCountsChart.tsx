"use client";

import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ChartHeader from "./ChartHeader";
import { AllTierType } from "@/data/subscriptionTiers";
import ChartContentWrapper from "./ChartContentWrapper";

const chartConfig = {
  count: {
    label: "Count",
  },
  new: {
    label: "New",
    color: "#6baed6",
  },
  learn: {
    label: "Learning",
    color: "#fd8d3c",
  },
  review: {
    label: "Review",
    color: "#74c476",
  },
} satisfies ChartConfig;

const makeChartData = (cardCount: Record<string, number>) => {
  return [
    { state: "new", count: cardCount["NEW"] || 0, fill: "var(--color-new)" },
    {
      state: "learn",
      count: cardCount["LEARN"] || 0,
      fill: "var(--color-learn)",
    },
    {
      state: "review",
      count: cardCount["REVIEW"] || 0,
      fill: "var(--color-review)",
    },
  ];
};

export const CardCountsChart = ({
  data,
  subscriptionTier,
}: {
  data: { cardCount: Record<string, number>; totalCount: number };
  subscriptionTier: AllTierType;
}) => {
  const chartData = makeChartData(data.cardCount);

  const newCount = data.cardCount["NEW"] || 0;
  const learnCount = data.cardCount["LEARN"] || 0;
  const reviewCount = data.cardCount["REVIEW"] || 0;
  const totalCount = data.totalCount;
  const newPercent = (newCount / totalCount) * 100;
  const learnPercent = (learnCount / totalCount) * 100;
  const reviewPercent = (reviewCount / totalCount) * 100;

  return (
    <Card className="flex flex-col">
      <ChartHeader>Card Counts</ChartHeader>
      <ChartContentWrapper
        subscriptionTier={subscriptionTier}
        hasData={totalCount > 0}
      >
        <CardContent className="flex flex-col justify-center p-3 pt-0">
          <ChartContainer
            config={chartConfig}
            className="aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie data={chartData} dataKey="count" nameKey="state" />
            </PieChart>
          </ChartContainer>
          <div className="flex flex-col items-center justify-center gap-1">
            <LegendContent
              color="#6baed6"
              label="New"
              count={newCount}
              percent={newPercent}
            />
            <LegendContent
              color="#fd8d3c"
              label="Learning"
              count={learnCount}
              percent={learnPercent}
            />
            <LegendContent
              color="#74c476"
              label="Review"
              count={reviewCount}
              percent={reviewPercent}
            />
            <LegendContent label="Total" count={totalCount} />
          </div>
        </CardContent>
      </ChartContentWrapper>
    </Card>
  );
};

const LegendContent = ({
  color,
  label,
  count,
  percent,
}: {
  color?: string;
  label: string;
  count: number;
  percent?: number;
}) => {
  return (
    <div className="flex">
      <div className="flex w-[150px] items-center gap-2.5">
        {color && (
          <div
            className="h-3.5 w-3.5 shrink-0 rounded-[2px]"
            style={{
              backgroundColor: color,
            }}
          />
        )}
        <div>{label}</div>
      </div>
      <div className="w-[60px] truncate text-right">{count}</div>
      <div className="ml-16 w-[60px] truncate text-right">
        {percent !== undefined &&
          `${percent.toFixed(percent % 1 === 0 ? 0 : 2)}%`}
      </div>
    </div>
  );
};
