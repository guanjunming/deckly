import { relations } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  uuid,
  timestamp,
  pgEnum,
  bigserial,
  bigint,
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
  cards: many(cardsTable),
}));

export const decksTable = pgTable("decks", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  createdAt,
});

export const deckRelations = relations(decksTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [decksTable.userId],
    references: [usersTable.id],
  }),
  cards: many(cardsTable),
}));

export const cardStateEnum = pgEnum("card_state", ["NEW", "LEARN", "REVIEW"]);

export const cardsTable = pgTable("cards", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  deckId: bigint("deck_id", { mode: "number" })
    .notNull()
    .references(() => decksTable.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  state: cardStateEnum("state").notNull().default("NEW"),
  front: text("front").notNull(),
  back: text("back"),
  createdAt,
  updatedAt,
});

export const cardRelations = relations(cardsTable, ({ one }) => ({
  deck: one(decksTable, {
    fields: [cardsTable.deckId],
    references: [decksTable.id],
  }),
  user: one(usersTable, {
    fields: [cardsTable.userId],
    references: [usersTable.id],
  }),
}));
