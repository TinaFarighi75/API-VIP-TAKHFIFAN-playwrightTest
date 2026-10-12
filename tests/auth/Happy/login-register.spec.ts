// tests/auth/happy/login-register.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { fakerFA as faker } from "@faker-js/faker";

const PERSIAN_NAME_REGEX = /^[\u0600-\u06FF\s\u200c]+$/;

const FALLBACK_FIRST_NAMES = [
  "علی",
  "سارا",
  "رضا",
  "مریم",
  "محمد",
  "زهرا",
  "حسین",
  "فاطمه",
];

const FALLBACK_LAST_NAMES = [
  "محمدی",
  "احمدی",
  "حسینی",
  "رضایی",
  "کریمی",
  "موسوی",
  "جعفری",
];

function isPersianName(value: string): boolean {
  return value.trim().length > 0 && PERSIAN_NAME_REGEX.test(value.trim());
}

function pickFallback(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)]!;
}

/**
 * fakerFA گاهی اسم غیرفارسی می‌دهد → API با 400 رد می‌کند.
 * از faker استفاده می‌کنیم، ولی فقط اسم فارسی را قبول می‌کنیم.
 */
function persianFullName(): string {
  let firstName = "";
  let lastName = "";

  for (let i = 0; i < 10; i++) {
    const candidateFirst = faker.person.firstName();
    const candidateLast = faker.person.lastName();

    if (isPersianName(candidateFirst)) firstName = candidateFirst.trim();
    if (isPersianName(candidateLast)) lastName = candidateLast.trim();

    if (firstName && lastName) break;
  }

  if (!firstName) firstName = pickFallback(FALLBACK_FIRST_NAMES);
  if (!lastName) lastName = pickFallback(FALLBACK_LAST_NAMES);

  return `${firstName} ${lastName}`;
}

test("check user is new to join takhfifan vip @smoke @auth @register @regression", async ({
  authApi,
}) => {
  const timestamp = Date.now().toString();
  const mobile = "09" + timestamp.slice(-9);

  const fullName = persianFullName();

  const registrationResponse = await authApi.loginRegisterUserRequest(
    mobile,
    fullName,
    true,
  );

  const status = await authApi.getStatus();

  if (status !== 200) {
    const errorBody = await registrationResponse.text();
    console.error("Registration failed with status:", status);
    console.error("Error Body:", errorBody);
    console.error("Used fullName:", fullName);
    throw new Error(`Registration failed: ${status} - ${errorBody}`);
  }

  expect(status).toBe(200);

  const response = await authApi.getValidRegisterUser();
  expect(response).toHaveProperty("otp_token");
  expect(response.otp_token.length).toBeGreaterThan(0);
  expect(typeof response.otp_token).toBe("string");
});
