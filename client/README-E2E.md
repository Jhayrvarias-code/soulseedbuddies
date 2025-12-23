E2E Tests (Playwright)

Install Playwright locally in the `client` folder:

```bash
cd client
npm install -D @playwright/test
npx playwright install
```

Run tests:

```bash
npm run test:e2e
```

Notes:

- Ensure the dev frontend (`npm run dev`) and backend (`server/npm run dev`) are running before running tests.
- Tests open a real browser, so they require an X server on Linux or will run headless by default.
