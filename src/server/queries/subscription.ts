import { db } from "@/db/db";
import { userSubscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getUserSubscription = async (userId: string) => {
  const subscription = await db.query.userSubscriptionTable.findFirst({
    where: eq(userSubscriptionTable.userId, userId),
  });

  return subscription || null;
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
