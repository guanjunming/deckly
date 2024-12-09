import DeckBrowser from "@/components/cards/DeckBrowser";
import { getActiveDeckId, getAllDeckNames } from "@/server/queries/decks";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const AddCardsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const deckNames = await getAllDeckNames(userId);

  let currentDeckId = await getActiveDeckId(userId);
  if (!currentDeckId) {
    currentDeckId = deckNames.length > 0 ? deckNames[0].id : 0;
  }

  return <DeckBrowser deckNames={deckNames} currentDeckId={currentDeckId} />;
};

export default AddCardsPage;
