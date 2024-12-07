import { db } from "@/db/db";
import { deckTable } from "@/db/schema";
import { and, asc, eq } from "drizzle-orm";

export const getAllDecks = async (userId: string) => {
  const decks = await db
    .select()
    .from(deckTable)
    .where(eq(deckTable.userId, userId))
    .orderBy(asc(deckTable.name));

  return decks;
};

export const getDeckById = async (deckId: number, userId: string) => {
  const deck = await db.query.deckTable.findFirst({
    where: and(eq(deckTable.id, deckId), eq(deckTable.userId, userId)),
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
    .orderBy(asc(deckTable.name));

  return result;
};
