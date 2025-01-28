CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`member_id` text NOT NULL,
	`paypal_transaction_id` text NOT NULL,
	`amount` text NOT NULL,
	`status` text NOT NULL,
	`payment_date` text NOT NULL,
	`membership_start_date` text NOT NULL,
	`membership_end_date` text NOT NULL,
	`created_at` text DEFAULT '2025-01-22T06:55:53.027Z' NOT NULL,
	`updated_at` text DEFAULT '2025-01-22T06:55:53.027Z' NOT NULL,
	FOREIGN KEY (`member_id`) REFERENCES `members`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T06:55:53.026Z';