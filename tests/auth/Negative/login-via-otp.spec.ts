//tests/auth/Negative/login-via-otp.spec.ts


import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data";

test.describe("login via otp validation @auth @negative-auth @negative", () => {
  test.fixme("Do not send body", async ({ authApi }) => {
    await authApi.loginRequestViaOtp(undefined);
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

  test("Send a blank mobile", async ({ authApi }) => {
    await authApi.loginRequestViaOtp("");
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("شماره موبایل صحیح نیست");
  });

  test("Send a wrong mobile", async ({ authApi }) => {
    await authApi.loginRequestViaOtp("0215464");
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("شماره موبایل صحیح نیست");
  });

  test.fixme("Send request by wrong url", async ({ authApi }) => {
    const userTest = users[4];
    await authApi.loginRequestViaOtp(
      userTest.mobile,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/authentication/login_via_otpp",
    );

    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse404();
    expect(response.message).toBe("");
  });

  test.fixme("Send request when vpn is on", async ({ authApi }) => {
    const userTest = users[4];
    await authApi.loginRequestViaOtp(userTest.mobile);

    const status = await authApi.getStatus();
    expect(status).toBe(403);
    const response = await authApi.getInvalidResponse403();
    expect(response.message).toBe("");
  });
  test("Send request by mobile who not register yet", async ({ authApi }) => {
    await authApi.loginRequestViaOtp("09178063494");

    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("کاربری با این مشخصات یافت نشد");
  });
});
