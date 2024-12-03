"use server";

import { db } from "@/db/db";
import { decksTable } from "@/db/schema";
import { deckSchema } from "@/schemas/decks";
import { z } from "zod";
import { getCurrentUserId } from "../queries/users";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addDeck = async (values: z.infer<typeof deckSchema>) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized!" };
  }

  const { success, data } = deckSchema.safeParse(values);

  if (!success) {
    return { ok: false, message: "Invalid fields" };
  }

  await db.insert(decksTable).values({ ...data, userId: userId });

  revalidatePath("/decks");

  return { ok: true, message: "Create deck successfully" };
};

export const updateDeck = async (
  deckId: number,
  values: z.infer<typeof deckSchema>,
) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized!" };
  }

  const { success, data } = deckSchema.safeParse(values);

  if (!success) {
    return { ok: false, message: "Invalid fields" };
  }

  const { rowCount } = await db
    .update(decksTable)
    .set({ ...data })
    .where(and(eq(decksTable.id, deckId), eq(decksTable.userId, userId)));

  if (rowCount === 0) {
    return { ok: false, message: "Deck does not exist" };
  }

  return { ok: true, message: "Update deck successfully" };
};

export const deleteDeck = async (deckId: number) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized!" };
  }

  const { rowCount } = await db
    .delete(decksTable)
    .where(and(eq(decksTable.id, deckId), eq(decksTable.userId, userId)));

  if (rowCount === 0) {
    return { ok: false, message: "Deck does not exist" };
  }

  return { ok: true, message: "Delete deck successfully" };
};
