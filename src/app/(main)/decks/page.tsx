import { Card } from "@/components/ui/card";
import { getAllDecksInfo } from "@/server/queries/decks";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";
import CreateDeckButton from "@/components/decks/CreateDeckButton";
import DeckCard from "@/components/decks/DeckCard";
import { canCreateDeck } from "@/server/queries/subscription";

const DecksPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const decksInfo = await getAllDecksInfo(userId);

  const canCreate = await canCreateDeck(userId);

  return (
    <div className="mx-auto flex max-w-[940px] flex-col px-3 py-6">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your decks</h1>
          <CreateDeckButton canCreateDeck={canCreate} />
        </div>

        {decksInfo.length > 0 ? (
          <Card className="mt-5 p-5">
            <div className="flex gap-5 border-b pb-2 font-semibold">
              <div className="ml-2 flex-1">Deck</div>

              <div className="mr-2 flex items-center gap-2">
                <div className="flex items-center gap-4 text-center">
                  <div className="w-14">New</div>
                  <div className="w-14">Learn</div>
                  <div className="w-14">Due</div>
                </div>
                <div className="h-full w-8"></div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              {decksInfo.map((deckInfo) => {
                return (
                  <DeckCard
                    key={deckInfo.deck.id}
                    id={deckInfo.deck.id}
                    name={deckInfo.deck.name}
                    newCount={deckInfo.queueCards.new.length}
                    learnCount={deckInfo.queueCards.learning.length}
                    dueCount={deckInfo.queueCards.review.length}
                  />
                );
              })}
            </div>
          </Card>
        ) : (
          <div className="mt-32 text-center">
            <h1 className="mb-4 text-4xl font-semibold">You have no decks</h1>
            <div className="text-xl text-accent-foreground">
              Start learning by creating a new deck.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecksPage;
