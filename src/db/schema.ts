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

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password"),
  createdAt,
  role: rolesEnum("role").notNull().default("BASIC"),
});

export const userRelations = relations(userTable, ({ many }) => ({
  decks: many(deckTable),
  cards: many(cardTable),
}));

export const deckTable = pgTable("decks", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  name: text("name").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  createdAt,
});

export const deckRelations = relations(deckTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [deckTable.userId],
    references: [userTable.id],
  }),
  cards: many(cardTable),
}));

export const cardStateEnum = pgEnum("card_state", ["NEW", "LEARN", "REVIEW"]);

export const cardTable = pgTable("cards", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  deckId: bigint("deck_id", { mode: "number" })
    .notNull()
    .references(() => deckTable.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  state: cardStateEnum("state").notNull().default("NEW"),
  front: text("front").notNull(),
  back: text("back"),
  createdAt,
  updatedAt,
});

export const cardRelations = relations(cardTable, ({ one }) => ({
  deck: one(deckTable, {
    fields: [cardTable.deckId],
    references: [deckTable.id],
  }),
  user: one(userTable, {
    fields: [cardTable.userId],
    references: [userTable.id],
  }),
}));
