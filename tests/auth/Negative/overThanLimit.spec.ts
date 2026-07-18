//tests/auth/Negative/overThanLimit.spec.ts

import { test, expect } from "../../../utils/auth/auth-fixtures";
import {
  hitCheckOtpUntilExpectedLimit,
  expectLimitedCheckOtp,
  expectNotLimitedCheckOtp,
  sleep,
} from "../../../helper/auth-limit-helper";

test.describe.configure({ mode: "serial" });

test.describe("check_otp over-than-limit validation with cooldown", () => {
  test.setTimeout(200_000);

  const wrongCode = "12345"; // keep your actual wrong code
  const expectedMsg =
    "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفا ۱۵ دقیقه دیگر مجددا تلاش کنید";

  test("should return over-than-limit message after more than 200 invalid attempts", async ({
    authApi,
  }) => {
    const otpToken = "YOUR_DYNAMIC_OR_CURRENT_TOKEN";

    const result = await hitCheckOtpUntilExpectedLimit(
      authApi,
      otpToken,
      wrongCode,
      expectedMsg,
      300
    );

    expect(result).toBeTruthy();
  });

  test("should stay limited when user retries before 60 seconds", async ({
    authApi,
  }) => {
    const otpToken = "YOUR_DYNAMIC_OR_CURRENT_TOKEN";

    await hitCheckOtpUntilExpectedLimit(
      authApi,
      otpToken,
      wrongCode,
      expectedMsg,
      300
    );

    const limitedAt = Date.now();
    console.log(`Limited at: ${new Date(limitedAt).toISOString()}`);

    await sleep(30_000);

    console.log(
      `Checking limited state after ${Date.now() - limitedAt}ms from first limited response`
    );

    await expectLimitedCheckOtp(
      authApi,
      otpToken,
      wrongCode,
      expectedMsg
    );
  });

  test("should not return over-than-limit after cooldown window passes", async ({
    authApi,
  }) => {
    const otpToken = "YOUR_DYNAMIC_OR_CURRENT_TOKEN";

    await hitCheckOtpUntilExpectedLimit(
      authApi,
      otpToken,
      wrongCode,
      expectedMsg,
      300
    );

    const limitedAt = Date.now();
    console.log(`Limited at: ${new Date(limitedAt).toISOString()}`);

    await sleep(65_000);

    console.log(
      `Checking non-limited state after ${Date.now() - limitedAt}ms from first limited response`
    );

    await expectNotLimitedCheckOtp(
      authApi,
      otpToken,
      wrongCode,
      expectedMsg
    );
  });
});
