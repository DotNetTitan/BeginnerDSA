import { test, expect } from '@playwright/test';

test.describe('Progress page', () => {
  test('loads progress page', async ({ page }) => {
    await page.goto('/progress');
    await expect(page.getByRole('heading', { name: /progress/i })).toBeVisible();
  });
});
