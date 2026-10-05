PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_license_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`account_number` text NOT NULL,
	`broker` text,
	`account_type` text,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`deactivated_at` integer,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_license_accounts`("id", "license_id", "account_number", "broker", "account_type", "active", "created_at", "deactivated_at") SELECT "id", "license_id", "account_number", "broker", "account_type", "active", "created_at", "deactivated_at" FROM `license_accounts`;--> statement-breakpoint
DROP TABLE `license_accounts`;--> statement-breakpoint
ALTER TABLE `__new_license_accounts` RENAME TO `license_accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `license_accounts_license_idx` ON `license_accounts` (`license_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `license_accounts_license_number_unique` ON `license_accounts` (`license_id`,`account_number`);