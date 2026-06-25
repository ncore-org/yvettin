import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display YVETTIN logo', async ({ page }) => {
    await expect(page.getByRole('link', { name: /yvettin/i })).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Ženy' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Muži' })).toBeVisible();
  });

  test('should display hero banner', async ({ page }) => {
    await expect(page.getByText('YVETTIN')).toBeVisible();
    await expect(page.getByText('Jar/Leto 2025')).toBeVisible();
  });

  test('should navigate to women page', async ({ page }) => {
    await page.getByRole('link', { name: 'Ženy' }).first().click();
    await expect(page).toHaveURL(/.*zeny.*/);
    await expect(page.getByText('NOVÁ KOLEKCIA')).toBeVisible();
  });

  test('should navigate to men page', async ({ page }) => {
    await page.getByRole('link', { name: 'Muži' }).first().click();
    await expect(page).toHaveURL(/.*muzi.*/);
    await expect(page.getByText('NOVÁ KOLEKCIA')).toBeVisible();
  });
});
