import DeckBrowser from "@/components/cards/DeckBrowser";
import { getActiveDeckId, getAllDeckNames } from "@/server/queries/decks";
import { getCardsPerDeckLimit } from "@/server/queries/subscription";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const AddCardsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const deckNames = await getAllDeckNames(userId);

  let currentDeckId = await getActiveDeckId(userId);
  if (!deckNames.find((deck) => deck.id === currentDeckId)) {
    currentDeckId = deckNames.length > 0 ? deckNames[0].id : 0;
  }

  const cardLimit = await getCardsPerDeckLimit(userId);

  return (
    <DeckBrowser
      deckNames={deckNames}
      currentDeckId={currentDeckId}
      cardLimit={cardLimit}
    />
  );
};

export default AddCardsPage;
