import { test, expect } from '@playwright/test';

test.describe('Exam page', () => {
  test('loads exam for a topic', async ({ page }) => {
    await page.goto('/exam/big-o');
    await expect(page.getByRole('heading', { name: /exam/i })).toBeVisible();
  });
});
