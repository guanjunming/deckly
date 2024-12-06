import { db } from "@/db/db";
import { cardTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getCardsByDeckId = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.deckId, deckId))
    .orderBy(asc(cardTable.id));

  return cards;
};
