import { db } from "@/db/db";
import { decksTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export const getAllDecks = async (userId: string) => {
  const decks = await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId))
    .orderBy(asc(decksTable.id));

  return decks;
};
