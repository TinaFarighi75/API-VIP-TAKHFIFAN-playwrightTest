import { test, expect } from "../../../utils/auth/auth-fixtures";
import { users } from "../../../test-data/user-data";

test("login via otp @smoke @auth @auth-merchant @regression", async ({ authApi }) => {

  const userTest = users[4];

  await authApi.loginRequestViaOtp(userTest.mobile);

  const response = await authApi.getValidLogInResponseViaOtp();

  const status = await authApi.getStatus();

  expect(status).toBe(200)
  expect(response).toHaveProperty("otp_token")
  expect(response.otp_token.length).toBeGreaterThan(0)
  expect(typeof response.otp_token).toBe("string")

});
