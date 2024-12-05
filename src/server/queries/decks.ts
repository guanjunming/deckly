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

export const getDeckById = async (deckId: number) => {
  const deck = await db.query.deckTable.findFirst({
    where: eq(deckTable.id, deckId),
  });

  return deck;
};

export const getAllDeckNames = async (userId: string) => {
  const result = await db
    .select({
      id: deckTable.id,
      name: deckTable.name,
    })
    .from(deckTable)
    .where(eq(deckTable.userId, userId))
    .orderBy(asc(deckTable.id));

  return result;
};
