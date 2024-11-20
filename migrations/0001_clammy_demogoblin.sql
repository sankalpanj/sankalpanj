CREATE TABLE `Members` (
	`id` text PRIMARY KEY NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`email` text NOT NULL,
	`phoneNumber` text,
	`membershipId` text NOT NULL,
	`membershipType` text NOT NULL,
	`joinDate` text NOT NULL,
	`status` text DEFAULT 'Active',
	`addressLine1` text,
	`addressLine2` text,
	`city` text,
	`state` text,
	`postalCode` text,
	`country` text,
	`role` text,
	`assignedProjects` text,
	`dateOfBirth` text,
	`profilePicture` text,
	`skills` text,
	`donationFrequency` text,
	`lastDonationDate` text,
	`totalDonations` real DEFAULT 0,
	`createdAt` text DEFAULT 'CURRENT_TIMESTAMP',
	`updatedAt` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Members_email_unique` ON `Members` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Members_membershipId_unique` ON `Members` (`membershipId`);