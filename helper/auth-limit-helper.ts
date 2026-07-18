//helper/auth-limit-helper.ts

import { Auth } from "../utils/auth/auth";
import { OverThanLimit } from "../utils/auth/auth-type";

function extractMessage(body: any): string | undefined {
  return body?.msg || body?.message || body?.error?.msg;
}

export async function hitCheckOtpUntilExpectedLimit(
  authApi: Auth,
  otpToken: string,
  wrongCode: string,
  expectedMsg: string,
  maxAttempts = 300
) {
  let lastBody: any = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const response = await authApi.loginCheckOtpRequest(otpToken, wrongCode);
    const status = response.status();
    const body = await response.json().catch(() => null);
    const msg = extractMessage(body);

    lastBody = body;

    console.log(
      `[${new Date().toISOString()}] check_otp attempt ${attempt}, status: ${status}, msg: ${msg}`
    );

    if (msg === expectedMsg) {
      return body;
    }
  }

  throw new Error(
    `Expected over-than-limit response was not returned after ${maxAttempts} attempts. Last body: ${JSON.stringify(
      lastBody
    )}`
  );
}

export async function expectLimitedCheckOtp(
  authApi: Auth,
  otpToken: string,
  wrongCode: string,
  expectedMsg: string
): Promise<OverThanLimit> {
  const startedAt = Date.now();

  const response = await authApi.loginCheckOtpRequest(otpToken, wrongCode);
  const status = response.status();
  const body = await response.json().catch(() => null);
  const msg = extractMessage(body);

  console.log(
    `[${new Date().toISOString()}] expectLimitedCheckOtp, duration: ${
      Date.now() - startedAt
    }ms, status: ${status}, msg: ${msg}`
  );

  if (status !== 400) {
    throw new Error(
      `Expected status 400 but got ${status}. Body: ${JSON.stringify(body)}`
    );
  }

  if (msg !== expectedMsg) {
    throw new Error(
      `Expected msg "${expectedMsg}" but got "${msg}". Body: ${JSON.stringify(body)}`
    );
  }

  return body as OverThanLimit;
}

export async function expectNotLimitedCheckOtp(
  authApi: Auth,
  otpToken: string,
  wrongCode: string,
  expectedMsg: string
): Promise<void> {
  const response = await authApi.loginCheckOtpRequest(otpToken, wrongCode);
  const status = response.status();
  const body = await response.json().catch(() => null);
  const msg = extractMessage(body);

  console.log(
    `[${new Date().toISOString()}] expectNotLimitedCheckOtp, status: ${status}, msg: ${msg}`
  );

  if (msg === expectedMsg) {
    throw new Error(
      `Expected user not to be limited, but over-than-limit response was returned. Body: ${JSON.stringify(
        body
      )}`
    );
  }
}

export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}
