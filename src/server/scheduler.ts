import {
  AGAIN_INTERVAL,
  EASY_INTERVAL,
  EASY_MULTIPLIER,
  GRADUATING_INTERVAL,
  HARD_MULTIIPLIER,
  STEPS_INTERVAL,
} from "@/data/constants";

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
  let goodInterval = GRADUATING_INTERVAL;
  if (learningStep < STEPS_INTERVAL.length) {
    goodInterval = STEPS_INTERVAL[learningStep + 1];
  }

  // easy
  const easyInterval = EASY_INTERVAL;

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
    again: againInterval,
    hard: hardInterval,
    good: goodInterval,
    easy: easyInterval,
  };
};
