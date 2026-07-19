
//tests/auth/Negative/login-email.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data";


test.describe("login by email validation @auth @negative-auth @negative", () => {

  test("Do not send email", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(undefined, userTest.passwordTest);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("اطلاعات ورودی صحیح نیست");
  });

  test("Do not send password", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, undefined);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });

  test("Send a blank email", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest("", userTest.passwordTest);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("اطلاعات ورودی صحیح نیست");
  });

  test("Send a blank password", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, "");

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });

  test.fixme("Sending a request with an empty body", async ({ authApi }) => {
    await authApi.loginRequest(undefined, undefined);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ورود ایمیل و پسورد الزامی است");
  });
  // check in workspace takhfifan
  test.skip("send request when vpn is on", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, userTest.passwordTest);

    const status = await authApi.getStatus();
    expect(status).toBe(403);
    const response = await authApi.getInvalidResponse403();
    expect(response.error).toBe("")
    expect(response.message).toBe("")
  });

  test("login with wrong email format", async ({ authApi }) => {
    await authApi.loginRequest("tinagmail.com", "11111");
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });
  test("login with incorrect password", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, "1514545454655");
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });
  test("log in with user and password who not register yet", async ({
    authApi,
  }) => {
    const userTest = users[1];
    await authApi.loginRequest(userTest.email, userTest.passwordTest);
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });
  test.fixme("login with wrong url", async ({ authApi }) => {
    const userTest = users[0];
    await authApi.loginRequest(
      userTest.email,
      userTest.passwordTest,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/authentication/login2",
    );
    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse404()
    expect(response.message).toBe("Not found")
  });
});

