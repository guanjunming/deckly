import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export const getCurrentUserId = async () => {
  const session = await auth();

  return session?.user.id;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
