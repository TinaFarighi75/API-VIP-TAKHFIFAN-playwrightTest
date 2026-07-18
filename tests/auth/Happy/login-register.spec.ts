//tests/auth/happy/login-register.spec.ts

import { test, expect } from "../../../utils/auth/auth-fixtures";

import { fakerFA as faker } from "@faker-js/faker";

test("check user is new to join takhfifan vip @smoke @auth @register @regression", async ({authApi,}) => {
  const mobile = "09" + faker.string.numeric(9);
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;

  await authApi.loginRegisterUserRequest(mobile, fullName, true);

  const status = await authApi.getStatus();
  expect(status).toBe(200);

  const response = await authApi.getValidRegisterUser();
  expect(response).toHaveProperty("otp_token");
  expect(response.otp_token.length).toBeGreaterThan(0);
  expect(typeof response.otp_token).toBe("string");
  
});
