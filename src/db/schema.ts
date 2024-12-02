import {
  pgTable,
  varchar,
  text,
  uuid,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["BASIC", "PREMIUM"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  role: rolesEnum("role").notNull().default("BASIC"),
});
