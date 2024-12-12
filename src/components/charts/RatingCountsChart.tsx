"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AllTierType } from "@/data/subscriptionTiers";
import ChartHeader from "./ChartHeader";
import ChartContentWrapper from "./ChartContentWrapper";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { formatDecimal } from "@/lib/utils";

const chartConfig = {
  "0": {
    label: "Again",
    color: "#b73351",
  },
  "1": {
    label: "Hard",
    color: "#fdcb8d",
  },
  "2": {
    label: "Good",
    color: "#c5e691",
  },
  "3": {
    label: "Easy",
    color: "#33865f",
  },
} satisfies ChartConfig;

const makeChartData = (data: Record<string, Record<number, number>>) => {
  const chartData = [];

  for (const [stateKey, ratingCounts] of Object.entries(data)) {
    const row: Record<string, number | string> = { state: stateKey };
    for (let i = 0; i < 4; i++) {
      row[i] = ratingCounts[i] || 0;
    }
    chartData.push(row);
  }

  return chartData;
};

export const RatingCountsChart = ({
  data,
  subscriptionTier,
}: {
  data: Record<string, Record<number, number>>;
  subscriptionTier: AllTierType;
}) => {
  const chartData = makeChartData(data);

  return (
    <Card className="flex flex-col">
      <ChartHeader description="The number of times you have pressed each button">
        Answer Buttons
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
                dataKey="state"
                tickMargin={5}
                tickFormatter={(value) => {
                  if (value === "NEW") return "New";
                  else if (value === "LEARN") return "Learning";
                  else return "Review";
                }}
              />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    hideLabel
                    className=""
                    formatter={(value, name, item, index) => (
                      <>
                        <div
                          className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-1 text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            {formatTooltip(name, item.payload)}
                          </span>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Bar dataKey="0" fill="var(--color-0)" radius={2} />
              <Bar dataKey="1" fill="var(--color-1)" radius={2} />
              <Bar dataKey="2" fill="var(--color-2)" radius={2} />
              <Bar dataKey="3" fill="var(--color-3)" radius={2} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </ChartContentWrapper>
    </Card>
  );
};

const formatTooltip = (name: NameType, payload: any) => {
  let total = 0;

  for (let i = 0; i < 4; i++) {
    total += payload[i];
  }

  const percent = (payload[name] / total) * 100;
  return `(${formatDecimal(percent, 2)}%)`;
};
