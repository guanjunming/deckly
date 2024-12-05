import DeckBrowser from "@/components/cards/DeckBrowser";
import { getAllDeckNames } from "@/server/queries/decks";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const AddCardsPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const decks = await getAllDeckNames(userId);

  return (
    <div className="h-screen">
      <DeckBrowser decks={decks} />
    </div>
  );
};

export default AddCardsPage;
