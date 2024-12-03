import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  uuid,
  timestamp,
  pgEnum,
  bigserial,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const rolesEnum = pgEnum("roles", ["BASIC", "PREMIUM"]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password"),
  createdAt,
  role: rolesEnum("role").notNull().default("BASIC"),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  decks: many(decksTable),
}));

export const decksTable = pgTable("decks", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt,
});

export const decksRelations = relations(decksTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [decksTable.userId],
    references: [usersTable.id],
  }),
}));
