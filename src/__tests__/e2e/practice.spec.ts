import { test, expect } from '@playwright/test';

test.describe('Practice page', () => {
  test('loads practice problems for a topic', async ({ page }) => {
    await page.goto('/practice/big-o');
    await expect(page.getByRole('heading', { name: /practice/i })).toBeVisible();
  });

  test('loads a specific problem', async ({ page }) => {
    await page.goto('/practice/big-o/constant-vs-linear');
    await expect(page.getByText('Constant vs Linear')).toBeVisible();
  });
});
