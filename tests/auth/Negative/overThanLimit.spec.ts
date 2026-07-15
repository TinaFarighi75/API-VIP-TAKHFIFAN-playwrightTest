import { test, expect } from "../../../utils/auth/auth-fixtures";
import { users } from "../../../test-data/user-data";
import {
  hitLoginLogoutUntilExpectedLimit,
  expectLimitedLogin,
  expectSuccessfulLogin,
  sleep,
} from "../../../helper/auth-limit-helper";

test.describe("over than limit validation with 60 seconds cooldown - login logout", () => {
  test("should return over-than-limit message after repeated login/logout", async ({
    authApi,
    authTokeMerchant,
    authUUIDMerchant,
  }) => {
    const expectedMsg =
      "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفا ۶۰ ثانیه دیگر مجددا تلاش کنید";

    const userTest = users[2];

    const result = await hitLoginLogoutUntilExpectedLimit(
      authApi,
      userTest.email,
      userTest.passwordTest,
      authTokeMerchant,
      authUUIDMerchant,
      expectedMsg
    );

    expect(result.msg).toBe(expectedMsg);
    expect(await authApi.getStatus()).toBe(400);
  });

  test("should extend cooldown when user retries before 60 seconds", async ({
    authApi,
    authTokeMerchant,
    authUUIDMerchant,
  }) => {
    const expectedMsg =
      "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفا ۶۰ ثانیه دیگر مجددا تلاش کنید";

    const userTest = users[2];

    await hitLoginLogoutUntilExpectedLimit(
      authApi,
      userTest.email,
      userTest.passwordTest,
      authTokeMerchant,
      authUUIDMerchant,
      expectedMsg
    );

    await sleep(20 * 1000);

    const retryResult = await expectLimitedLogin(
      authApi,
      userTest.email,
      userTest.passwordTest,
      expectedMsg
    );

    expect(retryResult.msg).toBe(expectedMsg);

    await sleep(50 * 1000);

    const stillLimitedResult = await expectLimitedLogin(
      authApi,
      userTest.email,
      userTest.passwordTest,
      expectedMsg
    );

    expect(stillLimitedResult.msg).toBe(expectedMsg);
    expect(await authApi.getStatus()).toBe(400);
  });

  test("should allow login after 60 seconds passes from the last limited attempt", async ({
    authApi,
    authTokeMerchant,
    authUUIDMerchant,
  }) => {
    const expectedMsg =
      "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفا ۶۰ ثانیه دیگر مجددا تلاش کنید";

    const userTest = users[2];

    await hitLoginLogoutUntilExpectedLimit(
      authApi,
      userTest.email,
      userTest.passwordTest,
      authTokeMerchant,
      authUUIDMerchant,
      expectedMsg
    );

    await sleep(20 * 1000);

    await expectLimitedLogin(
      authApi,
      userTest.email,
      userTest.passwordTest,
      expectedMsg
    );

    // Cooldown should be counted from the latest limited retry.
    await sleep(65 * 1000);

    await expectSuccessfulLogin(
      authApi,
      userTest.email,
      userTest.passwordTest
    );
  });
});
