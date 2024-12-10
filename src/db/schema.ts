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
  primaryKey,
  integer,
  real,
  date,
} from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at").notNull().defaultNow();
const updatedAt = timestamp("updated_at")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const userTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  password: text("password"),
  createdAt,
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
  front: text("front").notNull().default(""),
  back: text("back").notNull().default(""),
  createdAt,
  updatedAt,
  learningStep: integer("learning_step").notNull().default(0),
  interval: integer("interval").notNull().default(0),
  easeFactor: real("ease_factor").notNull().default(0),
  dueDate: timestamp("due_date"),
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

export const activeDeckTable = pgTable("active_decks", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => userTable.id),
  deckId: bigint("deck_id", { mode: "number" }).notNull(),
});

export const deckProgressTable = pgTable(
  "deck_progress",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => userTable.id),
    deckId: bigint("deck_id", { mode: "number" }).notNull(),
    studyDate: date("study_date").notNull(),
    newStudied: integer("new_studied").notNull().default(0),
    learningStudied: integer("learning_studied").notNull().default(0),
    reviewStudied: integer("review_studied").notNull().default(0),
    timeStudied: integer("time_studied").notNull().default(0),
  },
  (table) => {
    return [
      primaryKey({ columns: [table.userId, table.deckId, table.studyDate] }),
    ];
  },
);

export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "STANDARD",
  "PREMIUM",
]);

export const userSubscriptionTable = pgTable("user_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().unique(),
  stripeSubscriptionItemId: text("stripe_subscription_item_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  tier: subscriptionTierEnum("tier").notNull(),
  createdAt,
  updatedAt,
});
