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
  MINIMUM_EASE_FACTOR,
  STEPS_INTERVAL,
} from "@/data/constants";
import { db } from "@/db/db";
import { cardTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const answerCard = async (card: Card, rating: Rating) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const intervals = getScheduledIntervals(card);

  if (card.state === "NEW" || card.state === "LEARN") {
    if (card.state === "NEW") {
      card.state = "LEARN";
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
      card.dueDate = getReviewCardDueDate(EASY_INTERVAL);
    }
  } else if (card.state === "REVIEW") {
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

  revalidatePath("/learn");

  return { ok: true, message: "Card has been updated." };
};
