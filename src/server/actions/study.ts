"use server";

import { Card, Rating } from "@/types/types";
import { getCurrentUserId } from "../queries/users";
import {
  getLearningCardDueDate,
  getReviewCardDueDate,
  getScheduledIntervals,
} from "../scheduler";
import {
  EASE_FACTOR_AGAIN_DELTA,
  EASE_FACTOR_EASY_DELTA,
  EASE_FACTOR_HARD_DELTA,
  EASY_INTERVAL,
  GRADUATING_INTERVAL,
  INITIAL_EASE_FACTOR,
  MAX_ANSWER_TIME,
  MINIMUM_EASE_FACTOR,
  STEPS_INTERVAL,
} from "@/data/constants";
import { db } from "@/db/db";
import { cardTable, deckProgressTable, reviewLogTable } from "@/db/schema";
import { and, AnyColumn, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getTodayDate } from "@/lib/utils";

export const answerCard = async (
  card: Card,
  rating: Rating,
  timeTaken: number,
) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const intervals = getScheduledIntervals(card);
  let newStudied = 0;
  let learningStudied = 0;
  let reviewStudied = 0;
  const lastState = card.state;
  timeTaken = Math.min(timeTaken, MAX_ANSWER_TIME);

  if (card.state === "NEW" || card.state === "LEARN") {
    if (card.state === "NEW") {
      newStudied = 1;
      card.state = "LEARN";
    } else {
      learningStudied = 1;
    }

    if (rating === Rating.Again) {
      card.learningStep = 0;
      card.dueDate = getLearningCardDueDate(intervals.again);
    } else if (rating === Rating.Hard) {
      card.dueDate = getLearningCardDueDate(intervals.hard);
    } else if (rating === Rating.Good) {
      // still have steps remaining
      if (card.learningStep < STEPS_INTERVAL.length - 1) {
        card.dueDate = getLearningCardDueDate(intervals.good);
      } else {
        // graduate to review card
        card.state = "REVIEW";
        card.easeFactor = INITIAL_EASE_FACTOR;
        card.interval = GRADUATING_INTERVAL;
        card.dueDate = getReviewCardDueDate(intervals.good);
      }
      card.learningStep++;
    } else if (rating === Rating.Easy) {
      card.state = "REVIEW";
      card.easeFactor = INITIAL_EASE_FACTOR;
      card.interval = EASY_INTERVAL;
      card.dueDate = getReviewCardDueDate(intervals.easy);
    }
  } else if (card.state === "REVIEW") {
    reviewStudied = 1;

    if (rating === Rating.Again) {
      card.dueDate = getReviewCardDueDate(intervals.again);
      card.easeFactor = Math.max(
        card.easeFactor + EASE_FACTOR_AGAIN_DELTA,
        MINIMUM_EASE_FACTOR,
      );
    } else if (rating === Rating.Hard) {
      card.dueDate = getReviewCardDueDate(intervals.hard);
      card.easeFactor = Math.max(
        card.easeFactor + EASE_FACTOR_HARD_DELTA,
        MINIMUM_EASE_FACTOR,
      );
    } else if (rating === Rating.Good) {
      card.dueDate = getReviewCardDueDate(intervals.good);
    } else if (rating === Rating.Easy) {
      card.dueDate = getReviewCardDueDate(intervals.easy);
      card.easeFactor = card.easeFactor + EASE_FACTOR_EASY_DELTA;
    }
  }

  const result = await db
    .update(cardTable)
    .set({
      state: card.state,
      learningStep: card.learningStep,
      interval: card.interval,
      easeFactor: card.easeFactor,
      dueDate: card.dueDate,
    })
    .where(and(eq(cardTable.id, card.id), eq(cardTable.userId, userId)));

  if (result.rowCount === 0) {
    return { ok: false, message: "Card does not exist." };
  }

  await updateDeckStats(
    userId,
    card.deckId,
    newStudied,
    learningStudied,
    reviewStudied,
    timeTaken,
  );

  await addReviewLog(
    userId,
    card.id,
    card.deckId,
    rating,
    lastState,
    card.interval,
    card.easeFactor,
    timeTaken,
  );

  revalidatePath("/learn");

  return { ok: true, message: "Card updated." };
};

const updateDeckStats = async (
  userId: string,
  deckId: number,
  newStudied: number,
  learningStudied: number,
  reviewStudied: number,
  timeTaken: number,
) => {
  const today = getTodayDate();

  const increment = (column: AnyColumn, value: number) => {
    return sql`${column} + ${value}`;
  };

  await db
    .insert(deckProgressTable)
    .values({
      userId,
      deckId,
      studyDate: today,
      newStudied,
      learningStudied,
      reviewStudied,
      timeStudied: timeTaken,
    })
    .onConflictDoUpdate({
      target: [
        deckProgressTable.userId,
        deckProgressTable.deckId,
        deckProgressTable.studyDate,
      ],
      set: {
        newStudied: increment(deckProgressTable.newStudied, newStudied),
        learningStudied: increment(
          deckProgressTable.learningStudied,
          learningStudied,
        ),
        reviewStudied: increment(
          deckProgressTable.reviewStudied,
          reviewStudied,
        ),
        timeStudied: increment(deckProgressTable.timeStudied, timeTaken),
      },
    });
};

const addReviewLog = async (
  userId: string,
  cardId: number,
  deckId: number,
  rating: number,
  state: "NEW" | "LEARN" | "REVIEW",
  interval: number,
  easeFactor: number,
  timeTaken: number,
) => {
  await db.insert(reviewLogTable).values({
    userId,
    cardId,
    deckId,
    rating,
    state,
    interval,
    easeFactor,
    timeTaken,
  });
};
