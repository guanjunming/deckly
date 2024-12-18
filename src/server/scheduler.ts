import {
  AGAIN_INTERVAL,
  EASY_INTERVAL,
  EASY_MULTIPLIER,
  GRADUATING_INTERVAL,
  HARD_MULTIIPLIER,
  STEPS_INTERVAL,
} from "@/data/constants";
import { Card } from "@/types/types";
import { startOfDay, addSeconds } from "date-fns";
import { secondsInDay } from "date-fns/constants";

export const getLearningIntervals = (learningStep: number) => {
  // again
  const againInterval = STEPS_INTERVAL[0];

  // hard
  let hardInterval;
  if (learningStep === 0) {
    hardInterval = (STEPS_INTERVAL[0] + STEPS_INTERVAL[1]) / 2;
  } else {
    hardInterval = STEPS_INTERVAL[learningStep];
  }

  // good
  let goodInterval = GRADUATING_INTERVAL * secondsInDay;
  if (learningStep < STEPS_INTERVAL.length - 1) {
    goodInterval = STEPS_INTERVAL[learningStep + 1];
  }

  // easy
  const easyInterval = EASY_INTERVAL * secondsInDay;

  return {
    again: againInterval,
    hard: hardInterval,
    good: goodInterval,
    easy: easyInterval,
  };
};

export const getReviewIntervals = (
  currentInterval: number,
  easeFactor: number,
) => {
  // again
  const againInterval = AGAIN_INTERVAL;

  // hard
  let hardMinimum = 0;
  if (HARD_MULTIIPLIER > 1) {
    hardMinimum = currentInterval + 1;
  }
  const hardInterval = Math.max(
    Math.round(currentInterval * HARD_MULTIIPLIER),
    hardMinimum,
  );

  // good
  let goodMinimum = currentInterval + 1;
  if (HARD_MULTIIPLIER > 1) {
    goodMinimum = hardInterval + 1;
  }
  const goodInterval = Math.max(
    Math.round(currentInterval * easeFactor),
    goodMinimum,
  );

  // easy
  const easyMinimum = goodInterval + 1;
  const easyInterval = Math.max(
    Math.round(currentInterval * easeFactor * EASY_MULTIPLIER),
    easyMinimum,
  );

  return {
    again: againInterval * secondsInDay,
    hard: hardInterval * secondsInDay,
    good: goodInterval * secondsInDay,
    easy: easyInterval * secondsInDay,
  };
};

export const getScheduledIntervals = (card: Card) => {
  let intervals;

  if (card.state === "REVIEW") {
    intervals = getReviewIntervals(card.interval, card.easeFactor);
  } else {
    intervals = getLearningIntervals(card.learningStep);
  }

  return intervals;
};

export const getReviewCardDueDate = (delaySecs: number) => {
  const now = new Date();
  const due = addSeconds(now, delaySecs);
  return startOfDay(due);
};

export const getLearningCardDueDate = (delaySecs: number) => {
  const now = new Date();
  return addSeconds(now, delaySecs);
};
