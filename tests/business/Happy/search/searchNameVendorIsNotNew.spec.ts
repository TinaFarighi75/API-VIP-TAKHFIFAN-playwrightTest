import { test, expect } from "../../../../utils/fixtures";
import { users } from "../../../../test-data/user-data.js";

test("check bussiness name  is assign to vendor @smoke @vendor @vendor-merchant @regression", async ({
 
  businessApi,
  authTokenAdmin,
}) => {
  const userTest = users[4];

  await businessApi.searchBusinessNameIsNewVendorOrNotRequest(
    authTokenAdmin,
    undefined,
    undefined,
    undefined,
    undefined,
    userTest.businessName,
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

  const response = await businessApi.getsearchBusinessNameIsNotNewVendorResponse();

  expect(response.current_page).toBe(1);
  expect(response.per_page).toBe(30);
  expect(response.total_entries).toBe(1);
  expect(response.data).toHaveLength(1);
  expect(response.data[0]).toMatchObject({
    id: String(userTest.businessId),
    type: "business",
    attributes: {
      name: userTest.businessName,
      v3_id: userTest.vendorId,
    },
  });
})
