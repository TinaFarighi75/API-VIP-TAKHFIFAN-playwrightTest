//tests/auth/happy/logout.spec.ts

import { test, expect } from "../../../utils/auth/auth-fixtures";
import { users } from "../../../test-data/user-data";

test("log out admin @smoke @auth @auth-admin @regression", async ({ authApi, authTokenAdmin, authUUIDAdmin }) => {



  await authApi.logoutRequest(authTokenAdmin, authUUIDAdmin);

  const status = await authApi.getStatus();

  const response = await authApi.getValidLogOutResponse();

  expect(status).toBe(200);

  expect(response.msg).toEqual("Deleted successfully")
});

test("log out merchant @smoke @auth @auth-merchant @regression", async ({ authApi, authTokeMerchant, authUUIDMerchant }) => {

 

  await authApi.logoutRequest(authTokeMerchant,authUUIDMerchant );

  const status = await authApi.getStatus();

  const response = await authApi.getValidLogOutResponse();

  expect(status).toBe(200);

  expect(response.msg).toEqual("Deleted successfully")
});
