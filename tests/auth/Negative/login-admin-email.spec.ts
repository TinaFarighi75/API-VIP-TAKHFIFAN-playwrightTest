import { test, expect } from "../../../utils/auth/auth-fixtures";
import { users } from "../../../test-data/user-data";

test.describe("Admin login validation", () => {
    
  test("Do not send email-ADMIN", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(undefined, userTest.passwordTest);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponseByInvalidData();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("اطلاعات ورودی صحیح نیست");
  });

  test("Do not send password-ADMIN", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, undefined);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponseByInvalidData();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });

  test("Send a blank email-ADMIN", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest("", userTest.passwordTest);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponseByInvalidData();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("اطلاعات ورودی صحیح نیست");
  });

  test("Send a blank password-ADMIN", async ({ authApi }) => {
    const userTest = users[0];

    await authApi.loginRequest(userTest.email, "");

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponseByInvalidData();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ایمیل یا رمز عبور اشتباه است");
  });
  test.fixme("Sending a request with an empty body", async ({ authApi }) => {
    await authApi.loginRequest(undefined, undefined);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponseByInvalidData();

    expect(response).toHaveProperty("msg");
    expect(typeof response.msg).toBe("string");
    expect(response.msg).toEqual("ورود ایمیل و پسورد الزامی است");
  });
});
