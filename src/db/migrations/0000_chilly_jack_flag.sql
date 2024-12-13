CREATE TYPE "public"."card_state" AS ENUM('NEW', 'LEARN', 'REVIEW');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('STANDARD', 'PREMIUM');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "active_decks" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"deck_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cards" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"deck_id" bigint NOT NULL,
	"user_id" uuid NOT NULL,
	"state" "card_state" DEFAULT 'NEW' NOT NULL,
	"front" text DEFAULT '' NOT NULL,
	"back" text DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"learning_step" integer DEFAULT 0 NOT NULL,
	"interval" integer DEFAULT 0 NOT NULL,
	"ease_factor" real DEFAULT 0 NOT NULL,
	"due_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "deck_progress" (
	"user_id" uuid NOT NULL,
	"deck_id" bigint NOT NULL,
	"study_date" date NOT NULL,
	"new_studied" integer DEFAULT 0 NOT NULL,
	"learning_studied" integer DEFAULT 0 NOT NULL,
	"review_studied" integer DEFAULT 0 NOT NULL,
	"time_studied" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "deck_progress_user_id_deck_id_study_date_pk" PRIMARY KEY("user_id","deck_id","study_date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "decks" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "review_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"card_id" bigint NOT NULL,
	"deck_id" bigint NOT NULL,
	"rating" smallint NOT NULL,
	"state" "card_state" NOT NULL,
	"interval" integer NOT NULL,
	"ease_factor" real NOT NULL,
	"time_taken" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"stripe_subscription_item_id" text NOT NULL,
	"stripe_subscription_id" text NOT NULL,
	"stripe_customer_id" text NOT NULL,
	"tier" "subscription_tier" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_subscriptions_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "active_decks" ADD CONSTRAINT "active_decks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_deck_id_decks_id_fk" FOREIGN KEY ("deck_id") REFERENCES "public"."decks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cards" ADD CONSTRAINT "cards_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deck_progress" ADD CONSTRAINT "deck_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "decks" ADD CONSTRAINT "decks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "review_logs" ADD CONSTRAINT "review_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
