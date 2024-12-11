import { CardCountsChart } from "@/components/charts/CardCountsChart";
import { getAllCards } from "@/server/queries/cards";
import { getCurrentUserId } from "@/server/queries/users";
import { Card } from "@/types/types";
import { redirect } from "next/navigation";

const processData = (cards: Card[]) => {
  const cardCount: Record<string, number> = {};

  const length = cards.length;
  for (let i = 0; i < length; i++) {
    cardCount[cards[i].state] = (cardCount[cards[i].state] || 0) + 1;
  }

  return {
    cardCountData: {
      cardCount: cardCount,
      totalCount: cards.length,
    },
  };
};

const StatsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const cards = await getAllCards(userId);

  const processedData = processData(cards);
  console.log(processedData);
  return (
    <div className="p-6">
      <div className="grid w-full gap-x-4 gap-y-4 xl:grid-cols-2 2xl:grid-cols-3">
        <CardCountsChart data={processedData.cardCountData} />
      </div>
    </div>
  );
};

export default StatsPage;
