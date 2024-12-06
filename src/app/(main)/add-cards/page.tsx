import DeckBrowser from "@/components/cards/DeckBrowser";
import { getAllDeckNames } from "@/server/queries/decks";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const AddCardsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const deckNames = await getAllDeckNames(userId);

  const currentDeckId = deckNames.length > 0 ? deckNames[0].id : 0;

  return <DeckBrowser deckNames={deckNames} currentDeckId={currentDeckId} />;
};

export default AddCardsPage;
