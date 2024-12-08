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

export const activeDeckTable = pgTable(
  "active_decks",
  {
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => userTable.id),
    deckId: bigint("deck_id", { mode: "number" })
      .notNull()
      .references(() => deckTable.id),
  },
  (table) => {
    return [primaryKey({ columns: [table.userId, table.deckId] })];
  },
);
