ALTER TABLE `customers` RENAME COLUMN `tron_wallet_address` TO `usdt_wallet_address`;--> statement-breakpoint
DROP INDEX `customers_tron_wallet_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `customers_usdt_wallet_unique` ON `customers` (`usdt_wallet_address`);
