import { db } from "@/db/db";
import { userSubscriptionTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserSubscription = async (userId: string) => {
  const subscription = await db.query.userSubscriptionTable.findFirst({
    where: eq(userSubscriptionTable.userId, userId),
  });

  return subscription;
};
