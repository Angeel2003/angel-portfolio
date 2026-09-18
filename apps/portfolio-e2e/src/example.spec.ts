import { expect, test } from '@playwright/test';

test('shows portfolio hero', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Frontend Developer especializado en Angular',
    }),
  ).toBeVisible();
});