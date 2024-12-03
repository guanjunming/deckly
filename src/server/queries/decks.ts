import { db } from "@/db/db";
import { decksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllDecks = async (userId: string) => {
  const decks = await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId));

  return decks;
};
