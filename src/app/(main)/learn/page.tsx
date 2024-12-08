import LearnContent from "@/components/learn/LearnContent";
import { getQueuedCard } from "@/server/queries/study";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const LearnPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const queuedCard = await getQueuedCard(userId);

  if (!queuedCard) {
    return <div>Congratulations! You have finished this deck for now.</div>;
  }

  return <LearnContent queuedCard={queuedCard} />;
};

export default LearnPage;
