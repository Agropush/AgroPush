import { test, expect } from '@playwright/test';

test.describe('Landing Page Visual Tests', () => {
  test('should match visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('landing-page.png', { fullPage: true });
  });
});