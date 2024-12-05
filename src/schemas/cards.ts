import { z } from "zod";

export const cardSchemaBase = z.object({
  front: z.string().min(1, "The front field is empty."),
  back: z.string().optional(),
});

export const cardActionSchema = z
  .object({
    deckId: z.number().positive(),
  })
  .merge(cardSchemaBase);
