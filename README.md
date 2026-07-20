# API VIP Playwright Test Suite

This repository contains a Playwright-based API test suite for the VIP Takhfifan platform. It is designed to validate authentication flows, OTP verification, logout, and vendor search behavior using the Playwright test runner.

## Key Features

- API test automation with `@playwright/test`
- Authentication scenarios for admin and merchant users
- OTP login and validation coverage
- Vendor search validation for mobile number and business name
- Reusable fixtures for API clients and test users
- HTML reporter support via Playwright

## Prerequisites

- Node.js 18 or newer
- npm

## Install Dependencies

```bash
npm install
```

## Run Tests

The project currently does not define custom npm scripts, so run tests with the Playwright CLI directly:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/auth/Happy/login-admin-email.spec.ts
```

To run only one suite or tag, use Playwright filters:

```bash
npx playwright test --grep @auth
```

## Project Structure

```text
.
├── dockerfile
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── test-data/
│   └── user-data.ts
├── tests/
│   ├── auth/
│   │   ├── Happy/
│   │   └── Negative/
│   └── create vendor/
│       ├── Happy/
│       └── Negative/
└── utils/
    ├── fixtures.ts
    ├── auth/
    │   ├── auth.ts
    │   └── auth-type.ts
    └── create vendor/
        ├── createVendor.ts
        └── createVendor-type.ts
```

## Test Suites

### `tests/auth`

- `Happy/`: Positive authentication scenarios
  - login-admin-email.spec.ts
  - login-merchant-email.spec.ts
  - login-register.spec.ts
  - login-via-otp.spec.ts
  - check-otp.spec.ts
  - logout.spec.ts

- `Negative/`: Failure/edge case authentication scenarios
  - login-email.spec.ts
  - login-via-otp.spec.ts
  - check-otp.spec.ts
  - logout.spec.ts
  - overThanLimit.spec.ts

### `tests/create vendor`

- `Happy/`: Vendor search success and validation scenarios
  - searchBussinesWithoutFilter.spec.ts
  - searchMobileIsNew.spec.ts
  - searchMobileIsNotNew.spec.ts
  - searchNameVendorIsNew.spec.ts
  - searchNameVendorIsNotNew.spec.ts

- `Negative/`: Vendor search failure and invalid scenarios
  - searchMobileBussines.spec.ts

## Fixtures & Helpers

- `utils/fixtures.ts`: sets up shared fixtures for API clients and reusable auth tokens.
- `utils/auth/auth.ts`: authentication helper methods for login, logout, OTP, and register flows.
- `utils/create vendor/createVendor.ts`: vendor search helper methods to validate mobile and name filters.
- `test-data/user-data.ts`: sample test users for admin and merchant authentication.

## Configuration

- `playwright.config.ts`
  - `testDir`: `./tests`
  - `fullyParallel`: `true`
  - `reporter`: `html`
  - `trace`: `on-first-retry`
  - project name: `Api-Testing`

## Notes

- The API base URL is currently hard-coded in the helper classes to the staging endpoint `https://stgiran-vip.takhfifan.com/api/v1`.
- If you need custom environment configuration, add support for `.env` variables in `playwright.config.ts` and replace the hard-coded base URL in `utils/auth/auth.ts` and `utils/create vendor/createVendor.ts`.
- Expand `package.json` scripts for convenience, for example:

```json
"scripts": {
  "test": "npx playwright test",
  "test:report": "npx playwright show-report"
}
```

## Getting Started

1. Install dependencies: `npm install`
2. Run the full suite: `npx playwright test`
3. Open the HTML report after the run: `npx playwright show-report`

---

If you want, I can also add a set of `npm` scripts to `package.json` for easier local execution.
