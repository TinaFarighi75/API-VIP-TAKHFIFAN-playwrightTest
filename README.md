# API VIP Playwright Test Suite

A professional Playwright API test repository for the VIP Takhfifan platform.

This project automates end-to-end API validation for core business workflows, including authentication, OTP flow, logout, and vendor search. It is built to support stable regression coverage and to make it easy for the team to add new API scenarios.

## What this repository covers

- Admin and merchant login flows
- Login via email/password
- Login via OTP and OTP verification
- Logout endpoint validation
- Vendor search and vendor validation by mobile number or business name
- Positive and negative test coverage
- Response validation using strongly typed helper methods

## Tech stack

- `@playwright/test` for API test execution
- TypeScript for typed fixtures and helper definitions
- Playwright APIRequestContext for HTTP requests
- HTML report generation via Playwright reporter

## Repository layout

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

## How tests are organized

- `tests/auth/Happy`: successful authentication scenarios.
- `tests/auth/Negative`: invalid login and OTP failure cases.
- `tests/create vendor/Happy`: valid vendor search and filter workflows.
- `tests/create vendor/Negative`: invalid vendor search conditions and missing auth cases.

Test files follow readable naming conventions and use Playwright tags such as `@smoke`, `@auth`, `@regression`, and `@vendor`.

## Fixtures and helper design

### `utils/fixtures.ts`

This file exports a custom Playwright `test` object extended with:

- `authApi`: API helper for authentication endpoints
- `vendorApi`: API helper for vendor search endpoints
- `authTokenAdmin`: pre-authenticated admin token fixture
- `authUUIDAdmin`: authenticated admin UUID fixture
- `authTokeMerchant`: pre-authenticated merchant token fixture
- `authUUIDMerchant`: authenticated merchant UUID fixture
- `authloginRequestViaOtp`: OTP token fixture for OTP login

### `utils/auth/auth.ts`

A reusable helper class for:

- `loginRequest`
- `logoutRequest`
- `loginRequestViaOtp`
- `loginCheckOtpRequest`
- `loginRegisterUserRequest`

It also contains typed result readers like:

- `getValidLoginResponselogin`
- `getValidLogOutResponse`
- `getValidLogInResponseViaOtp`
- `getValidCheckOtp`

### `utils/create vendor/createVendor.ts`

Vendor search helper methods validate:

- mobile-based vendor search
- name-based vendor search
- response mapping for expected API payload structure

### `test-data/user-data.ts`

Contains stable test users for:

- admin access
- merchant access
- OTP login workflows

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Run all tests

```bash
npx playwright test
```

### 3. Run a single test file

```bash
npx playwright test tests/auth/Happy/login-admin-email.spec.ts
```

### 4. Run tests by tag

```bash
npx playwright test --grep @auth
```

### 5. Show the HTML report

```bash
npx playwright show-report
```

## Playwright configuration

The suite uses `playwright.config.ts` with:

- `testDir: './tests'`
- `fullyParallel: true`
- `forbidOnly` enabled in CI
- `retries` enabled only on CI
- `reporter: 'html'`
- `trace: 'on-first-retry'`
- a single project named `Api-Testing`

## Important implementation notes

- The API base URL is currently hard-coded to the staging endpoint in the helpers:
  - `utils/auth/auth.ts`
  - `utils/create vendor/createVendor.ts`
- For production or environment-specific testing, add `.env` support and make base URLs configurable.
- There are still explicit `test.fixme` and `test.skip` placeholders in the repository; these identify known gaps and should be converted to active regression tests when the API behavior is finalized.

## Recommended package scripts

Add these to `package.json` for more convenient execution:

```json
"scripts": {
  "test": "npx playwright test",
  "test:ui": "npx playwright test --headed",
  "test:report": "npx playwright show-report"
}
```

## Suggested improvements

- Extract the staging base URL into configuration
- Add environment-based test accounts for staging and preprod
- Standardize request payload helpers for repeated query parameters
- Add a smoke pipeline for critical auth and vendor flows

## Contact

If you need help extending the suite or adding new API coverage, this README can be updated with additional domain-specific sections and test strategy notes.
