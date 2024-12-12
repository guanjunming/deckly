import { db } from "@/db/db";
import { getAllCards } from "./cards";
import { deckProgressTable, reviewLogTable } from "@/db/schema";
import { getTodayDate } from "@/lib/utils";
import { and, count, eq, sum } from "drizzle-orm";

export const getAllProgressToday = async (userId: string) => {
  const today = getTodayDate();

  const result = await db
    .select({
      totalNew: sum(deckProgressTable.newStudied),
      totalLearning: sum(deckProgressTable.learningStudied),
      totalReview: sum(deckProgressTable.reviewStudied),
      totalTime: sum(deckProgressTable.timeStudied),
    })
    .from(deckProgressTable)
    .where(
      and(
        eq(deckProgressTable.userId, userId),
        eq(deckProgressTable.studyDate, today),
      ),
    );

  const progress = result[0];

  return {
    totalNew: Number(progress.totalNew),
    totalLearning: Number(progress.totalLearning),
    totalReview: Number(progress.totalReview),
    totalTime: Number(progress.totalTime),
  };
};

const getRatingStats = async (userId: string) => {
  const result = await db
    .select({
      state: reviewLogTable.state,
      rating: reviewLogTable.rating,
      count: count(),
    })
    .from(reviewLogTable)
    .where(eq(reviewLogTable.userId, userId))
    .groupBy(reviewLogTable.state, reviewLogTable.rating);

  return result;
};

export const getStatsData = async (userId: string) => {
  const todayProgress = await getAllProgressToday(userId);
  const cards = await getAllCards(userId);
  const ratingData = await getRatingStats(userId);

  const cardCount: Record<string, number> = {};
  const cardEase: Record<number, number> = {};
  const cardInterval: Record<number, number> = {};
  const ratingCount: Record<string, Record<number, number>> = {};

  let totalEase = 0;
  let easeCount = 0;
  let totalInterval = 0;
  let intervalCount = 0;

  const length = cards.length;
  for (let i = 0; i < length; i++) {
    const card = cards[i];
    cardCount[card.state] = (cardCount[card.state] || 0) + 1;

    if (card.easeFactor > 0) {
      cardEase[card.easeFactor] = (cardEase[card.easeFactor] || 0) + 1;
      totalEase += card.easeFactor;
      easeCount++;
    }

    if (card.interval > 0) {
      cardInterval[card.interval] = (cardInterval[card.interval] || 0) + 1;
      totalInterval += card.interval;
      intervalCount++;
    }
  }

  const averageEase = easeCount > 0 ? totalEase / easeCount : 0;
  const averageInterval = intervalCount > 0 ? totalInterval / intervalCount : 0;

  for (let id = 0; id < ratingData.length; id++) {
    const row = ratingData[id];

    if (!ratingCount[row.state]) {
      ratingCount[row.state] = {};
    }
    ratingCount[row.state][row.rating] = row.count;
  }

  return {
    todayProgress,
    cardCountData: {
      cardCount,
      totalCount: cards.length,
    },
    cardEaseData: {
      cardEase,
      averageEase: Math.round(averageEase * 100),
    },
    cardIntervalData: {
      cardInterval,
      averageInterval: Math.floor(averageInterval),
    },
    ratingCountData: ratingCount,
  };
};
