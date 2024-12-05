import { db } from "@/db/db";
import { cardsTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllCardsByDeckId = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardsTable)
    .where(eq(cardsTable.deckId, deckId))
    .orderBy(asc(cardsTable.id));

  return cards;
};
