DROP TABLE `Members`;--> statement-breakpoint
ALTER TABLE `members` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT '2025-01-22T06:55:32.962Z';--> statement-breakpoint
ALTER TABLE `children` ADD `member_id` text NOT NULL REFERENCES members(id);--> statement-breakpoint
ALTER TABLE `children` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `children` ADD `age` text NOT NULL;--> statement-breakpoint
ALTER TABLE `children` ADD `date_of_birth` text NOT NULL;--> statement-breakpoint
ALTER TABLE `children` DROP COLUMN `memberId`;--> statement-breakpoint
ALTER TABLE `children` DROP COLUMN `childrenData`;