import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Zero To DSA/);
  });

  test('displays stats', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Modules')).toBeVisible();
    await expect(page.getByText('Problems')).toBeVisible();
  });

  test('shows topic grid', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Big O & Complexity')).toBeVisible();
  });
});
