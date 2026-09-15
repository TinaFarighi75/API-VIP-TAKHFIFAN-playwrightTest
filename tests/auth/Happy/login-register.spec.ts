// tests/auth/happy/login-register.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { fakerFA as faker } from "@faker-js/faker";

test("check user is new to join takhfifan vip @smoke @auth @register @regression", async ({authApi}) => {

  const timestamp = Date.now().toString(); 
  const mobile = "09" + timestamp.slice(-9); // 9 رقم آخر timestamp را برمی‌دارد

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;

  
  const registrationResponse = await authApi.loginRegisterUserRequest(mobile, fullName, true);

 
  const status = await authApi.getStatus(); 

  // اگر وضعیت 200 نبود، خطا را لاگ کن و تست را Fail کن
  if (status !== 200) {
    console.error("Registration failed with status:", status);
    // سعی کن بدنه پاسخ خطا را بخوانی (اگر JSON بود .json() و اگر متن بود .text())
    try {
      const errorBody = await registrationResponse.text(); // یا registrationResponse.json()
      console.error("Error Body:", errorBody);
      throw new Error(`Registration failed: ${status} - ${errorBody}`);
    } catch (e) {
      console.error("Could not parse error body:", e);
      throw new Error(`Registration failed: ${status}`);
    }
  }

  // اگر وضعیت 200 بود، ادامه بده
  expect(status).toBe(200);

  // بررسی پاسخ نهایی دریافت کاربر ثبت‌نام شده
  const response = await authApi.getValidRegisterUser();
  expect(response).toHaveProperty("otp_token");
  expect(response.otp_token.length).toBeGreaterThan(0);
  expect(typeof response.otp_token).toBe("string");
});
