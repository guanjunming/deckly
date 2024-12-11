"use server";

import { db } from "@/db/db";
import { z } from "zod";
import { getCurrentUserId } from "../queries/users";
import { eq, and, inArray } from "drizzle-orm";
import { cardAddSchema, cardSchemaBase } from "@/schemas/cards";
import { getDeckById } from "../queries/decks";
import { cardTable } from "@/db/schema";
import { canAddCard } from "../queries/subscription";

export const addCard = async (values: z.infer<typeof cardAddSchema>) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const { success, data } = cardAddSchema.safeParse(values);
  if (!success) {
    return { ok: false, message: "Invalid fields." };
  }

  const deck = await getDeckById(data.deckId, userId);
  if (!deck) {
    return { ok: false, message: "User deck not found." };
  }

  const canAdd = await canAddCard(data.deckId, userId);
  if (!canAdd) {
    return {
      ok: false,
      message:
        "Card limit reached for this deck! Upgrade to Premium to add more.",
    };
  }

  await db.insert(cardTable).values({ ...data, userId });

  return { ok: true, message: "Card added." };
};

export const updateCard = async (
  cardId: number,
  values: z.infer<typeof cardSchemaBase>,
) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const { success, data } = cardSchemaBase.safeParse(values);
  if (!success) {
    return { ok: false, message: "Invalid fields." };
  }

  const result = await db
    .update(cardTable)
    .set({ ...data })
    .where(and(eq(cardTable.id, cardId), eq(cardTable.userId, userId)));

  if (result.rowCount === 0) {
    return { ok: false, message: "Card does not exist." };
  }

  return { ok: true, message: "Card has been updated." };
};

export const deleteCards = async (cardIds: number[]) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const { rowCount } = await db
    .delete(cardTable)
    .where(and(inArray(cardTable.id, cardIds), eq(cardTable.userId, userId)));

  if (rowCount && rowCount > 0) {
    return {
      ok: true,
      message: `${rowCount} card${rowCount > 1 ? "s" : ""} deleted.`,
    };
  }

  return { ok: false, message: "Failed to delete cards." };
};
