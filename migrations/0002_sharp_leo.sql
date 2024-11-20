ALTER TABLE `Members` RENAME TO `form`;--> statement-breakpoint
CREATE TABLE `children` (
	`id` text PRIMARY KEY NOT NULL,
	`memberId` text NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`date_of_birth` text NOT NULL,
	FOREIGN KEY (`memberId`) REFERENCES `form`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP INDEX IF EXISTS `Members_email_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `Members_membershipId_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS "users_email_unique";--> statement-breakpoint
ALTER TABLE `form` ALTER COLUMN "city" TO "city" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `form` ALTER COLUMN "state" TO "state" text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `spouse_name` text;--> statement-breakpoint
ALTER TABLE `form` ADD `address` text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `zip` text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `telephone_no` text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `spouse_telephone_no` text;--> statement-breakpoint
ALTER TABLE `form` ADD `spouse_email` text;--> statement-breakpoint
ALTER TABLE `form` ADD `date_of_birth` text NOT NULL;--> statement-breakpoint
ALTER TABLE `form` ADD `spouse_date_of_birth` text;--> statement-breakpoint
ALTER TABLE `form` ADD `anniversary` text;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `firstName`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `lastName`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `phoneNumber`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `membershipId`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `membershipType`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `joinDate`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `addressLine1`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `addressLine2`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `postalCode`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `country`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `assignedProjects`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `dateOfBirth`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `profilePicture`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `skills`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `donationFrequency`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `lastDonationDate`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `totalDonations`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `createdAt`;--> statement-breakpoint
ALTER TABLE `form` DROP COLUMN `updatedAt`;