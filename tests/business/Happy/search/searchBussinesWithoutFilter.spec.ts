
//tests/create vendor/happy/searchBussinesWithoutFilter.spec.ts

import { test, expect } from "../../../../utils/fixtures";
import { users } from "../../../../test-data/user-data.js";

test("check mobile number is assign to vendor @smoke @vendor @vendor-merchant @regression", async ({
  businessApi,
  authTokenAdmin,
}) => {
  const userTest = users[4];

  await businessApi.searchBusinessSearchMobileNumberIsNewOrNotRequest(
    authTokenAdmin,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  );

  const status = await businessApi.getStatus();
  expect(status).toBe(200);

  const response = await businessApi.getsearchBusinessSearchMobileNumberIsNotNewResponse();

  expect(response.current_page).toBe(1);
  expect(response.per_page).toBe(30);
  expect(response.total_entries).toBeGreaterThan(10000);
  expect(response.data.length).toBeGreaterThan(10);

});
