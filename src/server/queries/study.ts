import { getScheduledIntervals } from "../scheduler";
import { getActiveDeckId, getDeckInfo } from "./decks";
import { QueuedCardRes } from "@/types/types";

export const getQueuedCard = async (
  userId: string,
): Promise<QueuedCardRes | null> => {
  const currentDeckId = await getActiveDeckId(userId);

  if (!currentDeckId) return null;

  const deckInfo = await getDeckInfo(currentDeckId, userId);

  if (!deckInfo) return null;

  const { deck, queueCards } = deckInfo;

  let queuedCard = null;
  const now = new Date();

  const { learning, review, new: newCards } = queueCards;

  // take next learning card if due
  if (
    learning.length > 0 &&
    learning[0].dueDate &&
    learning[0].dueDate <= now
  ) {
    queuedCard = learning[0];
  }

  // todo: to mix taking review and new card
  if (queuedCard === null && review.length > 0) {
    queuedCard = review[0];
  }

  if (queuedCard === null && newCards.length > 0) {
    queuedCard = newCards[0];
  }

  // if no review and new cards left, take next available learning card is any
  if (queuedCard === null && learning.length > 0) {
    queuedCard = learning[0];
  }

  if (queuedCard) {
    return {
      deckName: deck.name,
      card: queuedCard,
      intervals: getScheduledIntervals(queuedCard),
      newCount: newCards.length,
      learningCount: learning.length,
      reviewCount: review.length,
    };
  }

  return null;
};
