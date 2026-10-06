ALTER TABLE `customers` ADD COLUMN `tron_wallet_address` text;--> statement-breakpoint
ALTER TABLE `crypto_payments` ADD COLUMN `expected_sender` text;--> statement-breakpoint
CREATE UNIQUE INDEX `customers_tron_wallet_unique` ON `customers` (`tron_wallet_address`);
