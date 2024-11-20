ALTER TABLE `children` ADD `childrenData` text NOT NULL;--> statement-breakpoint
ALTER TABLE `children` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `children` DROP COLUMN `age`;--> statement-breakpoint
ALTER TABLE `children` DROP COLUMN `date_of_birth`;