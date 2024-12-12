"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AllTierType } from "@/data/subscriptionTiers";
import ChartHeader from "./ChartHeader";
import ChartContentWrapper from "./ChartContentWrapper";
import { differenceInDays, subDays } from "date-fns";
import { formatDecimal } from "@/lib/utils";

const chartConfig = {
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

const makeChartData = (data: Record<string, Record<string, number>>) => {
  const chartData = [];

  const today = new Date();

  for (let i = 0; i < 31; i++) {
    const date = subDays(today, i);

    const dateString = date.toISOString().split("T")[0];
    const counts = data[dateString] || {};

    chartData.push({
      date: dateString,
      new: counts["NEW"] || 0,
      learn: counts["LEARN"] || 0,
      review: counts["REVIEW"] || 0,
    });
  }

  return chartData.reverse();
};

export const ReviewsChart = ({
  data,
  subscriptionTier,
}: {
  data: {
    reviewCount: Record<string, Record<string, number>>;
    totalCount: number;
  };

  subscriptionTier: AllTierType;
}) => {
  const chartData = makeChartData(data.reviewCount);

  const daysStudied = Object.values(data.reviewCount).length;
  const percentStudied = (daysStudied / 31) * 100;

  return (
    <Card className="flex flex-col">
      <ChartHeader description="The number of questions you have answered in the last 1 month">
        Reviews
      </ChartHeader>
      <ChartContentWrapper
        subscriptionTier={subscriptionTier}
        hasData={daysStudied > 0}
      >
        <CardContent className="py-3 pl-0">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickMargin={5}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${differenceInDays(date, new Date())}`;
                }}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="new"
                stackId="a"
                fill="var(--color-new)"
                radius={[0, 0, 2, 2]}
              />
              <Bar
                dataKey="learn"
                stackId="a"
                fill="var(--color-learn)"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="review"
                stackId="a"
                fill="var(--color-review)"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col justify-center pb-3">
          <div>{`Days studied: ${daysStudied} of 31 (${formatDecimal(percentStudied)}%)`}</div>
          <div>{`Total: ${data.totalCount} reviews`}</div>
        </CardFooter>
      </ChartContentWrapper>
    </Card>
  );
};
