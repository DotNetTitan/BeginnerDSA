import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('navigates home via logo', async ({ page }) => {
    await page.goto('/learn/big-o');
    await page.getByRole('link', { name: /zero to dsa/i }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('404 page shows for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
