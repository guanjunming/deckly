import { FREE, subscriptionTiers } from "@/data/subscriptionTiers";
import { db } from "@/db/db";
import { userSubscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getDeckCount } from "./decks";
import { getCardCountInDeck } from "./cards";

export const getUserSubscription = async (userId: string) => {
  const subscription = await db.query.userSubscriptionTable.findFirst({
    where: eq(userSubscriptionTable.userId, userId),
  });

  return subscription || null;
};

export const getUserSubscriptionTier = async (userId: string) => {
  const subscription = await getUserSubscription(userId);
  return subscription?.tier || "FREE";
};

export const createUserSubscription = async (
  data: typeof userSubscriptionTable.$inferInsert,
) => {
  const result = await db.insert(userSubscriptionTable).values(data);

  if (result.rowCount !== null && result.rowCount > 0) {
    revalidatePath("/premium");
  }
};

export const updateUserSubscription = async (
  customerId: string,
  data: Partial<typeof userSubscriptionTable.$inferInsert>,
) => {
  const result = await db
    .update(userSubscriptionTable)
    .set(data)
    .where(eq(userSubscriptionTable.stripeCustomerId, customerId));

  if (result.rowCount !== null && result.rowCount > 0) {
    revalidatePath("/premium");
  }
};

export const deleteUserSubscription = async (customerId: string) => {
  const result = await db
    .delete(userSubscriptionTable)
    .where(eq(userSubscriptionTable.stripeCustomerId, customerId));

  if (result.rowCount !== null && result.rowCount > 0) {
    revalidatePath("/premium");
  }
};

export const getDecksLimit = async (userId: string) => {
  const tier = await getUserSubscriptionTier(userId);
  if (tier === "FREE") {
    return FREE.maxDecks;
  } else {
    return subscriptionTiers[tier].maxDecks;
  }
};

export const getCardsPerDeckLimit = async (userId: string) => {
  const tier = await getUserSubscriptionTier(userId);
  if (tier === "FREE") {
    return FREE.maxCardsPerDeck;
  } else {
    return subscriptionTiers[tier].maxCardsPerDeck;
  }
};

export const canCreateDeck = async (userId: string) => {
  const limit = await getDecksLimit(userId);
  if (limit === -1) {
    return true;
  }

  const deckCount = await getDeckCount(userId);
  return deckCount < limit;
};

export const canAddCard = async (deckId: number, userId: string) => {
  const limit = await getCardsPerDeckLimit(userId);
  if (limit === -1) {
    return true;
  }

  const countCount = await getCardCountInDeck(deckId);
  return countCount < limit;
};
