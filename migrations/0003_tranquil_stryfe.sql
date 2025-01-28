ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:10:42.958Z';--> statement-breakpoint
ALTER TABLE `members` ADD `membership_start_date` text DEFAULT '2025-01-22T09:10:42.958Z';--> statement-breakpoint
ALTER TABLE `members` ADD `membership_end_date` text DEFAULT '2025-01-22T09:10:42.958Z';--> statement-breakpoint
ALTER TABLE `members` ADD `amount` text DEFAULT '0';--> statement-breakpoint
ALTER TABLE `members` ADD `status` text DEFAULT 'pending';--> statement-breakpoint
ALTER TABLE `members` ADD `payment_date` text DEFAULT '2025-01-22T09:10:42.958Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:10:42.959Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-22T09:10:42.959Z';