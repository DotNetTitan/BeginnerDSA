import { test, expect } from '@playwright/test';

test.describe('Learn page', () => {
  test('loads a topic page', async ({ page }) => {
    await page.goto('/learn/big-o');
    await expect(page.getByRole('heading', { name: /big o/i })).toBeVisible();
  });

  test('displays theory sections', async ({ page }) => {
    await page.goto('/learn/big-o');
    await expect(page.getByText('What is Big O?')).toBeVisible();
  });

  test('shows 404 for unknown topic', async ({ page }) => {
    await page.goto('/learn/nonexistent');
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
