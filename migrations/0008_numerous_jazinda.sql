CREATE TABLE `contacts` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`message` text DEFAULT '',
	`created_at` text DEFAULT '2025-01-27T17:52:42.788Z' NOT NULL
);
--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-27T17:52:42.786Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-27T17:52:42.787Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-27T17:52:42.787Z';