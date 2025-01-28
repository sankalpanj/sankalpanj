ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:12:07.675Z';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "membership_start_date" TO "membership_start_date" text DEFAULT '';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "membership_end_date" TO "membership_end_date" text DEFAULT '';--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "payment_date" TO "payment_date" text DEFAULT '';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T09:12:07.676Z';--> statement-breakpoint
ALTER TABLE `payments` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT '2025-01-22T09:12:07.676Z';