import { test, expect } from "../../../../utils/fixtures";
import { fakerFA as faker } from "@faker-js/faker";

test("check mobile number is not assign to another vendor @smoke @vendor @vendor-merchant @regression", async ({
  authApi,
  businessApi,
  authTokenAdmin,
}) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  await businessApi.searchBusinessSearchMobileNumberIsNewOrNotRequest(
    authTokenAdmin,
    undefined,
    undefined,
    undefined,
    undefined,
    fullName,
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

  const status = await authApi.getStatus();
  expect(status).toBe(200);
  const response =
    await businessApi.getsearchBusinessSearchMobileNumberIsNewResponse();
  expect(response.data).toEqual([]);
  expect(response.current_page).toBe(1);
  expect(response.per_page).toBe(30);
  expect(response.total_entries).toBe(0);
});
