import { Card } from "@/components/ui/card";
import { getCurrentUserId } from "@/server/queries/users";
import { Circle } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { BsFilePlus } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { getDeckInfo } from "@/server/queries/decks";
import StudyNowButton from "@/components/decks/StudyNowButton";

const StudyDeckPage = async ({
  params,
}: {
  params: Promise<{ deckId: number }>;
}) => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const { deckId } = await params;

  const deckInfo = await getDeckInfo(deckId, userId);

  if (!deckInfo) return notFound();

  const { deck, queueCards } = deckInfo;

  return (
    <div className="mx-auto max-w-[940px] px-6 pt-12">
      <Card className="flex flex-col gap-7 p-6">
        <div className="border-b pb-3 text-2xl font-semibold">{deck.name}</div>

        <div className="flex justify-center gap-6 rounded-3xl bg-muted p-7">
          <div className="relative flex items-center justify-center">
            <Circle width={150} height={150} className="text-zinc-200" />
            <div className="absolute text-6xl font-bold">
              {queueCards.new.length +
                queueCards.learning.length +
                queueCards.review.length}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5">
            <div className="flex min-w-24 flex-col">
              <div className="flex items-center justify-center">
                <BsFilePlus size={30} />
                <div className="ml-1 text-4xl font-bold text-blue-500">
                  {queueCards.new.length}
                </div>
              </div>
              <div className="flex justify-center font-medium">New</div>
            </div>
            <div className="flex min-w-24 flex-col">
              <div className="flex items-center justify-center">
                <IoBookOutline size={30} />
                <div className="ml-1 text-4xl font-bold text-red-500">
                  {queueCards.learning.length}
                </div>
              </div>
              <div className="flex justify-center font-medium">Learning</div>
            </div>
            <div className="flex min-w-24 flex-col">
              <div className="flex items-center justify-center">
                <GoClock size={30} />
                <div className="ml-1 text-4xl font-bold text-green-500">
                  {queueCards.review.length}
                </div>
              </div>
              <div className="flex justify-center font-medium">To Review</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <StudyNowButton deckId={deck.id} />
        </div>
      </Card>
    </div>
  );
};

export default StudyDeckPage;
