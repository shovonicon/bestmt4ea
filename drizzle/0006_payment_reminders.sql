ALTER TABLE `orders` ADD `reminder_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` ADD `last_reminder_at` integer;--> statement-breakpoint
-- Orders already unpaid when this ships are the old backlog. Mark them as having
-- had all three reminders so the daily job never emails them. Admins can still
-- send a reminder by hand from the Orders page.
UPDATE `orders` SET `reminder_count` = 3 WHERE `status` = 'pending';
