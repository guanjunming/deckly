import { db } from "@/db/db";
import { activeDeckTable, deckTable } from "@/db/schema";
import { and, asc, count, eq } from "drizzle-orm";
import { gatherCards } from "./cards";

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

export const getDeckInfo = async (deckId: number, userId: string) => {
  const deck = await db.query.deckTable.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: and(eq(deckTable.id, deckId), eq(deckTable.userId, userId)),
  });

  if (!deck) {
    return null;
  }

  const queueCards = await gatherCards(deckId);

  return { deck, queueCards };
};

export const getAllDecksInfo = async (userId: string) => {
  const decks = await db.query.deckTable.findMany({
    columns: {
      id: true,
      name: true,
    },
    where: eq(deckTable.userId, userId),
    orderBy: asc(deckTable.name),
  });

  if (decks.length === 0) {
    return [];
  }

  const decksInfo = await Promise.all(
    decks.map(async (deck) => {
      const queueCards = await gatherCards(deck.id);
      return { deck, queueCards };
    }),
  );

  return decksInfo;
};

export const getDeckCount = async (userId: string) => {
  const counts = await db
    .select({ deckCount: count() })
    .from(deckTable)
    .where(eq(deckTable.userId, userId));

  return counts[0]?.deckCount ?? 0;
};

export const getActiveDeckId = async (userId: string) => {
  const result = await db.query.activeDeckTable.findFirst({
    columns: {
      deckId: true,
    },
    where: eq(activeDeckTable.userId, userId),
  });

  return result?.deckId || 0;
};
