import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export const getCurrentUserId = async () => {
  const session = await auth();

  return session?.user.id;
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};
