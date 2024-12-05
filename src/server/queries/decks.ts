import { db } from "@/db/db";
import { deckTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllDecks = async (userId: string) => {
  const decks = await db
    .select()
    .from(deckTable)
    .where(eq(deckTable.userId, userId))
    .orderBy(asc(deckTable.id));

  return decks;
};
