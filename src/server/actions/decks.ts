"use server";

import { db } from "@/db/db";
import { cardTable, deckTable } from "@/db/schema";
import { deckSchema } from "@/schemas/decks";
import { z } from "zod";
import { getCurrentUserId } from "../queries/users";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const addDeck = async (values: z.infer<typeof deckSchema>) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const { success, data } = deckSchema.safeParse(values);

  if (!success) {
    return { ok: false, message: "Invalid fields." };
  }

  await db.insert(deckTable).values({ ...data, userId: userId });

  revalidatePath("/decks");

  return { ok: true, message: "Deck has been created." };
};

export const renameDeck = async (
  deckId: number,
  values: z.infer<typeof deckSchema>,
) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  const { success, data } = deckSchema.safeParse(values);

  if (!success) {
    return { ok: false, message: "Invalid fields." };
  }

  const { rowCount } = await db
    .update(deckTable)
    .set({ ...data })
    .where(and(eq(deckTable.id, deckId), eq(deckTable.userId, userId)));

  if (rowCount === 0) {
    return { ok: false, message: "Deck does not exist." };
  }

  revalidatePath("/decks");

  return { ok: true, message: "Deck has been renamed." };
};

export const deleteDeck = async (deckId: number) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { ok: false, message: "Unauthorized! Please sign in again." };
  }

  try {
    let cardCount;
    let deckName;

    await db.transaction(async (trx) => {
      const { rowCount } = await trx
        .delete(cardTable)
        .where(eq(cardTable.deckId, deckId));

      cardCount = rowCount;

      const result = await trx
        .delete(deckTable)
        .where(and(eq(deckTable.id, deckId), eq(deckTable.userId, userId)))
        .returning();

      if (!result.length) {
        throw new Error("Failed to delete deck.");
      }
      deckName = result[0].name;
    });

    revalidatePath("/decks");

    return {
      ok: true,
      message: `${cardCount} cards deleted from ${deckName}.`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, message: "Something went wrong!" };
    }
    throw error;
  }
};
