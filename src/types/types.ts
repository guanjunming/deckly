export type Card = {
  id: number;
  deckId: number;
  state: "NEW" | "LEARN" | "REVIEW";
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
  learningStep: number;
  interval: number;
  easeFactor: number;
  dueDate: Date | null;
};

export enum Rating {
  Again,
  Hard,
  Good,
  Easy,
}

export type ScheduledIntervals = {
  again: number;
  hard: number;
  good: number;
  easy: number;
};

export type QueuedCardRes = {
  deckName: string;
  card: Card;
  intervals: ScheduledIntervals;
  newCount: number;
  learningCount: number;
  reviewCount: number;
};
