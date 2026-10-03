PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_download_events` (
	`id` text PRIMARY KEY NOT NULL,
	`entitlement_id` text,
	`customer_id` text NOT NULL,
	`product_file_id` text NOT NULL,
	`license_build_id` text,
	`ip_hash` text,
	`ua_hash` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`entitlement_id`) REFERENCES `entitlements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_download_events`("id", "entitlement_id", "customer_id", "product_file_id", "license_build_id", "ip_hash", "ua_hash", "created_at") SELECT "id", "entitlement_id", "customer_id", "product_file_id", "license_build_id", "ip_hash", "ua_hash", "created_at" FROM `download_events`;--> statement-breakpoint
DROP TABLE `download_events`;--> statement-breakpoint
ALTER TABLE `__new_download_events` RENAME TO `download_events`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `download_events_entitlement_idx` ON `download_events` (`entitlement_id`);--> statement-breakpoint
CREATE INDEX `download_events_customer_idx` ON `download_events` (`customer_id`);