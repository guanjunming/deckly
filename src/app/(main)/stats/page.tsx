import { CardCountsChart } from "@/components/charts/CardCountsChart";
import { CardEaseChart } from "@/components/charts/CardEaseChart";
import { CardIntervalChart } from "@/components/charts/CardIntervalChart";
import TodayProgressCard from "@/components/charts/TodayProgressCard";
import { getStatsData } from "@/server/queries/stats";
import { getUserSubscriptionTier } from "@/server/queries/subscription";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const StatsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const currentTier = await getUserSubscriptionTier(userId);

  const statsData = await getStatsData(userId);

  console.log(statsData);
  return (
    <div className="p-6">
      <div className="grid w-full gap-x-4 gap-y-4 xl:grid-cols-2 2xl:grid-cols-3">
        <TodayProgressCard progress={statsData.todayProgress} />
        <CardCountsChart
          data={statsData.cardCountData}
          subscriptionTier={currentTier}
        />
        <CardEaseChart
          data={statsData.cardEaseData}
          subscriptionTier={currentTier}
        />
        <CardIntervalChart
          data={statsData.cardIntervalData}
          subscriptionTier={currentTier}
        />
      </div>
    </div>
  );
};

export default StatsPage;
