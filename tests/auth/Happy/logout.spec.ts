import { test, expect } from "../../../utils/auth/auth-fixtures";
import { users } from "../../../test-data/user-data";

test("log out @smoke @auth @auth-admin @regression", async ({ authApi, authTokenAdmin, authUUIDAdmin }) => {

  const userTest = users[0];

  await authApi.logoutRequest(authTokenAdmin, authUUIDAdmin);

  const status = await authApi.getStatus();

  const response = await authApi.getValidLogOutResponse();

  expect(status).toBe(200);

  expect(response.msg).toEqual("Deleted successfully")
});

test("log out @smoke @auth @auth-merchant @regression", async ({ authApi, authTokeMerchant, authUUIDMerchant }) => {

  const userTest = users[2];

  await authApi.logoutRequest(authTokeMerchant,authUUIDMerchant );

  const status = await authApi.getStatus();

  const response = await authApi.getValidLogOutResponse();

  expect(status).toBe(200);

  expect(response.msg).toEqual("Deleted successfully")
});
