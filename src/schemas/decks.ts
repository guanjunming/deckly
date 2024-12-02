import { z } from "zod";

export const deckSchema = z.object({
  name: z.string().min(1, { message: "Deck name is required." }),
});
