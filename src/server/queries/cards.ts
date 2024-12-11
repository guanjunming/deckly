import { NEW_PER_DAY, REVIEWS_PER_DAY } from "@/data/constants";
import { db } from "@/db/db";
import { cardTable, deckProgressTable } from "@/db/schema";
import { getTodayDate } from "@/lib/utils";
import { asc, eq, and, lte, sql, count } from "drizzle-orm";

export const getAllCards = async (userId: string) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.userId, userId));

  return cards;
};

export const getCardsByDeckId = async (deckId: number) => {
  const cards = await db
    .select()
    .from(cardTable)
    .where(eq(cardTable.deckId, deckId))
    .orderBy(asc(cardTable.id));

  return cards;
};

export const gatherCards = async (deckId: number) => {
  const [learningCards, reviewCards, newCards] = await Promise.all([
    gatherLearningCards(deckId),
    gatherReviewCards(deckId),
    gatherNewCards(deckId),
  ]);

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
  const today = getTodayDate();

  const deckProgress = await db
    .select()
    .from(deckProgressTable)
    .where(
      and(
        eq(deckProgressTable.deckId, deckId),
        eq(deckProgressTable.studyDate, today),
      ),
    )
    .limit(1);

  const newCardsStudied = deckProgress[0]?.newStudied || 0;
  const remainingNewCards = Math.max(NEW_PER_DAY - newCardsStudied, 0);

  if (remainingNewCards === 0) {
    return [];
  }

  const cards = await db
    .select()
    .from(cardTable)
    .where(and(eq(cardTable.deckId, deckId), eq(cardTable.state, "NEW")))
    .orderBy(asc(cardTable.id))
    .limit(remainingNewCards);

  return cards;
};

export const getCardCountInDeck = async (deckId: number) => {
  const counts = await db
    .select({ cardCount: count() })
    .from(cardTable)
    .where(eq(cardTable.deckId, deckId));

  return counts[0]?.cardCount ?? 0;
};
