ALTER TABLE `contacts` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-29T16:52:02.193Z';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-29T16:52:02.191Z';--> statement-breakpoint
ALTER TABLE `members` ADD `stripe_customer_id` text DEFAULT '';--> statement-breakpoint
ALTER TABLE `members` ADD `stripe_subscription_id` text DEFAULT '';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-29T16:52:02.192Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-29T16:52:02.192Z';