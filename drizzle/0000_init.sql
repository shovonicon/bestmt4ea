CREATE TABLE `admin_recovery_codes` (
	`id` text PRIMARY KEY NOT NULL,
	`admin_user_id` text NOT NULL,
	`code_hash` text NOT NULL,
	`used_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`admin_user_id`) REFERENCES `admin_users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `admin_recovery_codes_admin_idx` ON `admin_recovery_codes` (`admin_user_id`);--> statement-breakpoint
CREATE TABLE `admin_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`totp_secret` text,
	`totp_enabled_at` integer,
	`role` text DEFAULT 'admin' NOT NULL,
	`disabled_at` integer,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_email_unique` ON `admin_users` (`email`);--> statement-breakpoint
CREATE TABLE `audit_log` (
	`id` text PRIMARY KEY NOT NULL,
	`admin_user_id` text,
	`action` text NOT NULL,
	`entity` text,
	`entity_id` text,
	`meta` text,
	`ip_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `audit_log_created_idx` ON `audit_log` (`created_at`);--> statement-breakpoint
CREATE TABLE `coupons` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`type` text NOT NULL,
	`value` integer NOT NULL,
	`max_redemptions` integer,
	`redemptions` integer DEFAULT 0 NOT NULL,
	`expires_at` integer,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coupons_code_unique` ON `coupons` (`code`);--> statement-breakpoint
CREATE TABLE `crypto_payments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`currency` text DEFAULT 'USDT' NOT NULL,
	`network` text DEFAULT 'TRC20' NOT NULL,
	`wallet_address` text NOT NULL,
	`expected_amount` text NOT NULL,
	`received_amount` text,
	`txid` text,
	`sender_address` text,
	`receiver_address` text,
	`status` text DEFAULT 'WAITING' NOT NULL,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`detected_at` integer,
	`confirmed_at` integer,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `crypto_payments_txid_unique` ON `crypto_payments` (`txid`);--> statement-breakpoint
CREATE INDEX `crypto_payments_order_idx` ON `crypto_payments` (`order_id`);--> statement-breakpoint
CREATE INDEX `crypto_payments_status_idx` ON `crypto_payments` (`status`);--> statement-breakpoint
CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`phone` text,
	`email_verified_at` integer,
	`last_login_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);--> statement-breakpoint
CREATE TABLE `download_events` (
	`id` text PRIMARY KEY NOT NULL,
	`entitlement_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`product_file_id` text NOT NULL,
	`license_build_id` text,
	`ip_hash` text,
	`ua_hash` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`entitlement_id`) REFERENCES `entitlements`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `download_events_entitlement_idx` ON `download_events` (`entitlement_id`);--> statement-breakpoint
CREATE INDEX `download_events_customer_idx` ON `download_events` (`customer_id`);--> statement-breakpoint
CREATE TABLE `email_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`to_email` text NOT NULL,
	`template` text NOT NULL,
	`provider_message_id` text,
	`status` text NOT NULL,
	`error` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `email_logs_to_idx` ON `email_logs` (`to_email`);--> statement-breakpoint
CREATE TABLE `entitlements` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`product_id` text NOT NULL,
	`order_id` text,
	`source` text DEFAULT 'purchase' NOT NULL,
	`created_at` integer NOT NULL,
	`revoked_at` integer,
	`expires_at` integer,
	`download_limit` integer,
	`downloads_used` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entitlements_customer_product_unique` ON `entitlements` (`customer_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `entitlements_customer_idx` ON `entitlements` (`customer_id`);--> statement-breakpoint
CREATE TABLE `license_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`account_number` text NOT NULL,
	`broker` text,
	`account_type` text DEFAULT 'demo' NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`deactivated_at` integer,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `license_accounts_license_idx` ON `license_accounts` (`license_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `license_accounts_license_number_unique` ON `license_accounts` (`license_id`,`account_number`);--> statement-breakpoint
CREATE TABLE `license_builds` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`product_version_id` text,
	`account_number` text NOT NULL,
	`expiration_date` integer,
	`r2_key` text,
	`build_status` text DEFAULT 'PENDING' NOT NULL,
	`error` text,
	`created_at` integer NOT NULL,
	`built_at` integer,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_version_id`) REFERENCES `product_versions`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `license_builds_license_idx` ON `license_builds` (`license_id`);--> statement-breakpoint
CREATE INDEX `license_builds_status_idx` ON `license_builds` (`build_status`);--> statement-breakpoint
CREATE TABLE `license_events` (
	`id` text PRIMARY KEY NOT NULL,
	`license_id` text NOT NULL,
	`action` text NOT NULL,
	`actor_type` text NOT NULL,
	`actor_id` text,
	`meta` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`license_id`) REFERENCES `licenses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `license_events_license_idx` ON `license_events` (`license_id`);--> statement-breakpoint
CREATE TABLE `licenses` (
	`id` text PRIMARY KEY NOT NULL,
	`entitlement_id` text NOT NULL,
	`customer_id` text NOT NULL,
	`product_id` text NOT NULL,
	`license_key` text NOT NULL,
	`status` text DEFAULT 'PENDING' NOT NULL,
	`max_accounts` integer DEFAULT 1 NOT NULL,
	`starts_at` integer,
	`expires_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`revoked_at` integer,
	FOREIGN KEY (`entitlement_id`) REFERENCES `entitlements`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `licenses_key_unique` ON `licenses` (`license_key`);--> statement-breakpoint
CREATE INDEX `licenses_customer_idx` ON `licenses` (`customer_id`);--> statement-breakpoint
CREATE INDEX `licenses_entitlement_idx` ON `licenses` (`entitlement_id`);--> statement-breakpoint
CREATE INDEX `licenses_status_idx` ON `licenses` (`status`);--> statement-breakpoint
CREATE TABLE `login_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token_hash` text NOT NULL,
	`code_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`consumed_at` integer,
	`ip_hash` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `login_tokens_token_hash_unique` ON `login_tokens` (`token_hash`);--> statement-breakpoint
CREATE INDEX `login_tokens_email_idx` ON `login_tokens` (`email`);--> statement-breakpoint
CREATE TABLE `order_items` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`product_id` text NOT NULL,
	`plan_id` text,
	`plan_label` text,
	`duration_days` integer,
	`max_accounts` integer DEFAULT 1 NOT NULL,
	`title_snapshot` text NOT NULL,
	`unit_price_cents` integer NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`plan_id`) REFERENCES `product_plans`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `order_items_order_idx` ON `order_items` (`order_id`);--> statement-breakpoint
CREATE INDEX `order_items_product_idx` ON `order_items` (`product_id`);--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_number` text NOT NULL,
	`customer_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`subtotal_cents` integer NOT NULL,
	`discount_cents` integer DEFAULT 0 NOT NULL,
	`total_cents` integer NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`coupon_id` text,
	`created_at` integer NOT NULL,
	`paid_at` integer,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`coupon_id`) REFERENCES `coupons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);--> statement-breakpoint
CREATE INDEX `orders_customer_idx` ON `orders` (`customer_id`);--> statement-breakpoint
CREATE INDEX `orders_status_idx` ON `orders` (`status`);--> statement-breakpoint
CREATE TABLE `payment_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text NOT NULL,
	`reference` text NOT NULL,
	`kind` text NOT NULL,
	`detail` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `payment_events_reference_idx` ON `payment_events` (`reference`);--> statement-breakpoint
CREATE TABLE `payments` (
	`id` text PRIMARY KEY NOT NULL,
	`order_id` text NOT NULL,
	`provider` text DEFAULT 'stripe' NOT NULL,
	`invoice_id` text NOT NULL,
	`transaction_id` text,
	`payment_method` text,
	`amount_cents` integer NOT NULL,
	`status` text DEFAULT 'initiated' NOT NULL,
	`raw_payload` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `payments_invoice_unique` ON `payments` (`invoice_id`);--> statement-breakpoint
CREATE INDEX `payments_order_idx` ON `payments` (`order_id`);--> statement-breakpoint
CREATE TABLE `performance_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`myfxbook_account_id` text,
	`url` text,
	`widget_html` text,
	`account_type` text,
	`active` integer DEFAULT true NOT NULL,
	`last_synced_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `performance_accounts_product_idx` ON `performance_accounts` (`product_id`);--> statement-breakpoint
CREATE TABLE `performance_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`captured_at` integer NOT NULL,
	`balance_cents` integer,
	`equity_cents` integer,
	`profit_cents` integer,
	`growth_pct` text,
	`drawdown_pct` text,
	`profit_factor` text,
	`win_rate_pct` text,
	`open_trades` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `performance_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `performance_snapshots_account_idx` ON `performance_snapshots` (`account_id`);--> statement-breakpoint
CREATE INDEX `performance_snapshots_captured_idx` ON `performance_snapshots` (`captured_at`);--> statement-breakpoint
CREATE TABLE `product_faqs` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `product_faqs_product_idx` ON `product_faqs` (`product_id`);--> statement-breakpoint
CREATE TABLE `product_files` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`version_id` text,
	`r2_key` text NOT NULL,
	`filename` text NOT NULL,
	`version` text,
	`released_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`version_id`) REFERENCES `product_versions`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `product_files_product_idx` ON `product_files` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_files_version_idx` ON `product_files` (`version_id`);--> statement-breakpoint
CREATE TABLE `product_plans` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`code` text NOT NULL,
	`label` text NOT NULL,
	`price_cents` integer NOT NULL,
	`duration_days` integer,
	`max_accounts` integer DEFAULT 1 NOT NULL,
	`badge` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_plans_product_code_unique` ON `product_plans` (`product_id`,`code`);--> statement-breakpoint
CREATE INDEX `product_plans_product_idx` ON `product_plans` (`product_id`);--> statement-breakpoint
CREATE TABLE `product_versions` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`version` text NOT NULL,
	`released_at` integer,
	`is_current` integer DEFAULT false NOT NULL,
	`r2_key` text,
	`sha256` text,
	`changelog` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_versions_product_version_unique` ON `product_versions` (`product_id`,`version`);--> statement-breakpoint
CREATE INDEX `product_versions_product_idx` ON `product_versions` (`product_id`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`type` text NOT NULL,
	`title` text NOT NULL,
	`summary` text,
	`description` text,
	`platform` text DEFAULT 'MT5' NOT NULL,
	`currency` text DEFAULT 'USD' NOT NULL,
	`is_free` integer DEFAULT false NOT NULL,
	`active` integer DEFAULT true NOT NULL,
	`image_key` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);--> statement-breakpoint
CREATE INDEX `products_type_idx` ON `products` (`type`);--> statement-breakpoint
CREATE TABLE `rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`window_start` integer NOT NULL,
	`count` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `refunds` (
	`id` text PRIMARY KEY NOT NULL,
	`payment_id` text NOT NULL,
	`amount_cents` integer NOT NULL,
	`reason` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`provider_refund_id` text,
	`created_at` integer NOT NULL,
	`processed_at` integer,
	FOREIGN KEY (`payment_id`) REFERENCES `payments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `refunds_payment_idx` ON `refunds` (`payment_id`);--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` text PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`customer_id` text,
	`reviewer_name` text,
	`rating` integer NOT NULL,
	`body` text NOT NULL,
	`hidden_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `reviews_customer_product_unique` ON `reviews` (`customer_id`,`product_id`);--> statement-breakpoint
CREATE INDEX `reviews_product_idx` ON `reviews` (`product_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`token_hash` text NOT NULL,
	`subject_type` text NOT NULL,
	`subject_id` text NOT NULL,
	`mfa_verified` integer DEFAULT false NOT NULL,
	`ua_hash` text,
	`ip_hash` text,
	`created_at` integer NOT NULL,
	`expires_at` integer NOT NULL,
	`revoked_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_hash_unique` ON `sessions` (`token_hash`);--> statement-breakpoint
CREATE INDEX `sessions_subject_idx` ON `sessions` (`subject_type`,`subject_id`);--> statement-breakpoint
CREATE TABLE `trades` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`myfxbook_trade_id` text,
	`symbol` text,
	`type` text,
	`lots` text,
	`open_price` text,
	`close_price` text,
	`open_time` integer,
	`close_time` integer,
	`profit_cents` integer,
	`commission_cents` integer,
	`swap_cents` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`account_id`) REFERENCES `performance_accounts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `trades_account_idx` ON `trades` (`account_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `trades_account_trade_unique` ON `trades` (`account_id`,`myfxbook_trade_id`);--> statement-breakpoint
CREATE TABLE `webhook_events` (
	`id` text PRIMARY KEY NOT NULL,
	`provider` text DEFAULT 'stripe' NOT NULL,
	`dedupe_key` text NOT NULL,
	`invoice_id` text,
	`payload` text,
	`created_at` integer NOT NULL,
	`processed_at` integer,
	`result` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `webhook_events_dedupe_unique` ON `webhook_events` (`dedupe_key`);