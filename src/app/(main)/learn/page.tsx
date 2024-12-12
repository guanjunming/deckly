import LearnContent from "@/components/learn/LearnContent";
import { Button } from "@/components/ui/button";
import { getQueuedCard } from "@/server/queries/study";
import { getCurrentUserId } from "@/server/queries/users";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiSealCheckFill } from "react-icons/pi";

const LearnPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const queuedCardRes = await getQueuedCard(userId);

  if (!queuedCardRes) {
    return (
      <div className="mx-auto mt-28 flex max-w-[500px] flex-col items-center gap-2">
        <PiSealCheckFill className="h-14 w-14 text-green-500" />
        <div className="text-center text-4xl font-semibold">
          Congratulations! You have finished this deck for now.
        </div>
        <Button size="lg" className="mt-5 rounded-full" asChild>
          <Link href="/decks">Continue</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card">
      <LearnContent queuedCardRes={queuedCardRes} />
    </div>
  );
};

export default LearnPage;
