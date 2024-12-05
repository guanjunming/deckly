import { z } from "zod";

export const cardSchemaBase = z.object({
  front: z.string().min(1, "The front field is empty."),
  back: z.string().optional(),
});

export const cardAddSchema = z
  .object({
    deckId: z.number().positive("Invalid deck."),
  })
  .merge(cardSchemaBase);
