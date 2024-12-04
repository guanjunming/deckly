import { Card } from "@/components/ui/card";
import { getAllDecks } from "@/server/queries/decks";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";
import CreateDeckButton from "@/components/decks/CreateDeckButton";
import { Button } from "@/components/ui/button";

import DeckCard from "@/components/decks/DeckCard";

const DecksPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const decks = await getAllDecks(userId);

  return (
    <div className="mx-auto flex h-screen max-w-screen-lg flex-col px-5">
      <div className="flex flex-col">
        <div className="mt-5 flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Your Decks</h1>
          <CreateDeckButton />
        </div>

        {decks.length > 0 ? (
          <Card className="mt-5 p-5">
            <div className="flex gap-10 border-b pb-2 font-semibold">
              <div className="ml-2 flex-1">Deck</div>
              <div className="mr-10 flex gap-4 text-center">
                <div className="w-14">New</div>
                <div className="w-14">Learn</div>
                <div className="w-14">Due</div>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-1">
              {decks.map((deck) => {
                return <DeckCard key={deck.id} id={deck.id} name={deck.name} />;
              })}
            </div>
          </Card>
        ) : (
          <div className="mt-32 text-center">
            <h1 className="mb-4 text-4xl font-semibold">You have no decks</h1>
            <Button size="lg" className="rounded-full">
              Create new deck
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecksPage;
