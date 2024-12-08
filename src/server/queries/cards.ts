import { NEW_PER_DAY, REVIEWS_PER_DAY } from "@/data/constants";
import { db } from "@/db/db";
import { cardTable } from "@/db/schema";
import { asc, eq, and, lte, sql } from "drizzle-orm";

export const getCardsByDeckId = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.deckId, deckId))
    .orderBy(asc(cardTable.id));

  return cards;
};

export const gatherCards = async (deckId: number) => {
  const learningCards = await gatherLearningCards(deckId);
  const reviewCards = await gatherReviewCards(deckId);
  const newCards = await gatherNewCards(deckId);

  return {
    learning: learningCards,
    review: reviewCards,
    new: newCards,
  };
};

const gatherLearningCards = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(and(eq(cardTable.deckId, deckId), eq(cardTable.state, "LEARN")))
    .orderBy(cardTable.dueDate);

  return cards;
};

const gatherReviewCards = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(
      and(
        eq(cardTable.deckId, deckId),
        eq(cardTable.state, "REVIEW"),
        lte(cardTable.dueDate, sql`CURRENT_TIMESTAMP`),
      ),
    )
    .orderBy(cardTable.dueDate)
    .limit(REVIEWS_PER_DAY);

  return cards;
};

const gatherNewCards = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(and(eq(cardTable.deckId, deckId), eq(cardTable.state, "NEW")))
    .orderBy(asc(cardTable.id))
    .limit(NEW_PER_DAY);

  return cards;
};
