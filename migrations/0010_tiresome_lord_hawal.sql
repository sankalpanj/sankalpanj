ALTER TABLE `contacts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-30T12:32:03.908Z';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-30T12:32:03.906Z';--> statement-breakpoint
ALTER TABLE `members` ADD `stripe_plan_id` text DEFAULT '';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-30T12:32:03.907Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-30T12:32:03.907Z';