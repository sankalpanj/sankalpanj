ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:36:47.885Z';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "amount" TO "amount" integer;--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "amount" TO "amount" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:36:47.887Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-22T09:36:47.887Z';