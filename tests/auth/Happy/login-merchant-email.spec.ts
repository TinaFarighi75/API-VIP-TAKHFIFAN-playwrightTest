//tests/auth/happy/login-merchant-email.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data";

test("login by email and valid data-MERCHANT @smoke @auth @auth-merchant @regression", async ({ authApi }) => {
  const userTest = users[2];

  //ارسال درخواست لاگین با ایمیل
  await authApi.loginRequest(userTest.email, userTest.password);
 
  // برررسی استاتوس کد
  const status = await authApi.getStatus();
  expect(status).toEqual(200);

  // بررسی ریسپانس درست
  const response = await authApi.getValidLoginResponselogin();

  const createdAt = new Date(response.created_at).getTime();
  const expireAt = new Date(response.expires_at).getTime();

  expect(response.uuid.length).toBeGreaterThan(0);
  expect(typeof response.uuid).toBe("string");

  expect(response.token.length).toBeGreaterThan(0);
  expect(typeof response.token).toBe("string");

  expect(response.renderer_token).toBe(null)

  expect(response.user.email).toEqual(userTest.email);
  expect(typeof response.user.email).toBe("string");
  expect(response.user.role).toEqual(userTest.role);
  expect(response.user.name).toEqual(userTest.name);
  expect(typeof response.user.id).toBe("number");
  expect(response.user.id).not.toBeNaN();
  expect(typeof response.user.is_super_business).toBe("boolean");
  expect(response.user.is_super_business).toBeFalsy();

  expect(createdAt).toBeLessThanOrEqual(expireAt);

  expect(typeof response.last_activity).toBe("string");
  expect(response.last_activity.length).toBeGreaterThan(0);

  expect(response.business.id).toEqual(userTest.businessId);
  expect(response.business.v3_id).toEqual(userTest.vendorId);
  expect(response.business.name).toEqual(userTest.businessName);

  expect(response.sub_businesses).toEqual([]);

  expect(response.ip.length).toBeGreaterThan(0);
  expect(response.token_type).toEqual(1);
  expect(response.token_type_translation).toEqual("عادی");

  expect(typeof response.login_url).toBe("string");
  expect(response.login_url).toContain("/panel/redirect/?");
});
