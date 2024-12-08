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
