CREATE TABLE `children` (
	`id` text PRIMARY KEY NOT NULL,
	`memberId` text NOT NULL,
	`childrenData` text NOT NULL,
	FOREIGN KEY (`memberId`) REFERENCES `Members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`spouse_name` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`telephone` text NOT NULL,
	`spouse_telephone` text,
	`email` text NOT NULL,
	`spouse_email` text,
	`date_of_birth` text NOT NULL,
	`spouse_date_of_birth` text,
	`anniversary` text,
	`created_at` text DEFAULT '2025-01-15T07:23:31.097Z' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Members` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`spouse_name` text,
	`address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip` text NOT NULL,
	`telephone_no` text NOT NULL,
	`spouse_telephone_no` text,
	`email` text NOT NULL,
	`spouse_email` text,
	`date_of_birth` text NOT NULL,
	`spouse_date_of_birth` text,
	`anniversary` text
);
