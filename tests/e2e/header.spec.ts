import { test, expect } from '@playwright/test';

/**
 * Header navigation contract.
 *
 * The mega menus are closed by opacity, which does not remove their links from
 * the tab order — `visibility: hidden` does. These tests pin the behaviour that
 * makes the header usable without a mouse.
 */

test.describe('desktop mega menus', () => {
  test.skip(({ isMobile }) => isMobile, 'the desktop nav is hidden below the lg breakpoint');

  test('a closed menu is hidden and cannot be focused into', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const panel = page.locator('[data-menu] .menu-panel').first();
    await expect(panel).toBeHidden();
  });

  test('ArrowDown moves focus into the menu', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const trigger = page.locator('[data-menu] [data-menu-toggle]').first();
    const firstLink = page.locator('[data-menu] .menu-panel a').first();

    /* Focusing the trigger opens its menu, so a keyboard user can always reach
       the panel contents rather than tabbing straight past them. */
    await trigger.focus();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await page.keyboard.press('ArrowDown');
    await expect(firstLink).toBeFocused();
  });

  test('Escape closes the menu and restores focus to the trigger', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const menu = page.locator('[data-menu]').first();
    const trigger = menu.locator('[data-menu-toggle]');

    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    await expect(menu).toHaveClass(/menu-open/);

    await page.keyboard.press('Escape');

    await expect(menu).not.toHaveClass(/menu-open/);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toBeFocused();
  });
});

test.describe('mobile menu', () => {
  test.skip(({ isMobile }) => !isMobile, 'the mobile menu only exists below the lg breakpoint');

  test('toggles its accessible name, expanded state and focus handling', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    const toggle = page.locator('[data-nav-toggle]');
    const nav = page.locator('[data-mobile-nav]');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-label', 'Open menu');
    await expect(nav).toBeHidden();

    await toggle.click();

    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(toggle).toHaveAttribute('aria-label', 'Close menu');
    await expect(nav).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toHaveAttribute('aria-label', 'Open menu');
    await expect(nav).toBeHidden();
    await expect(toggle).toBeFocused();
  });

  test('nav links are large enough to tap', async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await page.locator('[data-nav-toggle]').click();

    /* Only visible links: the submenu links live inside closed <details>, so
       their boxes are 0×0 until the section is expanded. */
    const links = page.locator('[data-mobile-nav] a:visible');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const box = await link.boundingBox();
      expect(box, `mobile nav link ${i} has no box`).not.toBeNull();
      expect(box!.height, `mobile nav link "${await link.innerText()}" is ${box!.height}px tall`)
        .toBeGreaterThanOrEqual(44);
    }
  });
});
