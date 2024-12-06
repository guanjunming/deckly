export type Card = {
  id: number;
  deckId: number;
  state: "NEW" | "LEARN" | "REVIEW";
  front: string;
  back: string;
  createdAt: Date;
  updatedAt: Date;
  deck: string;
};
