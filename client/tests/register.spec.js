const { test, expect } = require("@playwright/test");

// Simple E2E test to exercise registration form
test("register flow", async ({ page }) => {
  await page.goto("http://localhost:5173/register");

  await page.fill('input[placeholder="First Name"]', "E2E");
  await page.fill('input[placeholder="Last Name"]', "Tester");
  await page.fill('input[type="date"]', "2000-01-01");
  await page.fill('input[placeholder="Email"]', "e2e+test@example.com");
  await page.fill('input[placeholder="Password"]', "Password123");
  await page.fill('input[placeholder="Repeat Password"]', "Password123");

  await page.click('button:has-text("Register")');

  // after register, we expect navigation to /login
  await expect(page).toHaveURL(/.*\/login/);
});
