"use client";

import { Card, CardContent } from "@/components/ui/card";
import ChartHeader from "./ChartHeader";
import { appendS, formatTimeForStats } from "@/lib/utils";

const TodayProgressCard = ({
  progress,
}: {
  progress: {
    totalNew: number;
    totalLearning: number;
    totalReview: number;
    totalTime: number;
  };
}) => {
  const { totalNew, totalLearning, totalReview, totalTime } = progress;
  const totalCards = totalNew + totalLearning + totalReview;
  const averageTime = totalCards > 0 ? totalTime / totalCards : 0;

  return (
    <Card className="flex flex-col">
      <ChartHeader>Today</ChartHeader>
      <CardContent className="grid flex-grow place-content-center text-center">
        {totalCards > 0 ? (
          <>
            <div>{`Studied ${totalCards} ${appendS("card", totalCards)} in ${formatTimeForStats(totalTime)} today`}</div>
            <div>{`(${formatTimeForStats(averageTime)}/card)`}</div>
            <div>{`New: ${totalNew}, Learn: ${totalLearning}, Review: ${totalReview}`}</div>
          </>
        ) : (
          <div>No cards have been studied today.</div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayProgressCard;
