import { getAllCards } from "./cards";

export const getStatsData = async (userId: string) => {
  const cards = await getAllCards(userId);

  const cardCount: Record<string, number> = {};
  const cardEase: Record<number, number> = {};
  const cardInterval: Record<number, number> = {};

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

  return {
    cardCountData: {
      cardCount: cardCount,
      totalCount: cards.length,
    },
    cardEaseData: {
      cardEase: cardEase,
      averageEase: Math.round(averageEase * 100),
    },
    cardIntervalData: {
      cardInterval: cardInterval,
      averageInterval: Math.floor(averageInterval),
    },
  };
};
