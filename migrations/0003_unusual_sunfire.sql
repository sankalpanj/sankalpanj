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
--> statement-breakpoint
DROP TABLE `form`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_children` (
	`id` text PRIMARY KEY NOT NULL,
	`memberId` text NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`date_of_birth` text NOT NULL,
	FOREIGN KEY (`memberId`) REFERENCES `Members`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_children`("id", "memberId", "name", "age", "date_of_birth") SELECT "id", "memberId", "name", "age", "date_of_birth" FROM `children`;--> statement-breakpoint
DROP TABLE `children`;--> statement-breakpoint
ALTER TABLE `__new_children` RENAME TO `children`;--> statement-breakpoint
PRAGMA foreign_keys=ON;