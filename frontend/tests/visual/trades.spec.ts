import { test, expect } from '@playwright/test';

test.describe('Trades Page Visual Tests', () => {
  test('should match visual snapshot for the trades landing state', async ({ page }) => {
    await page.goto('/trades');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toHaveText('Trades');
    await expect(page).toHaveScreenshot('trades-page.png', { fullPage: true });
  });
});
