import { test, expect } from "../../../utils/fixtures.js";
import { expectedLocationsResponse } from "../../../test-data/province-data";

test("check location list @smoke @location @location-merchant @regression", async ({
  locationApi,
  authTokenAdmin,
}) => {
  const apiResponse = await locationApi.locationProvinceRequest(
    authTokenAdmin,
    "province"
  );

  expect(apiResponse.status()).toBe(200);

  const response = await locationApi.getLocationsProvinceResponse();

  expect(Array.isArray(response.locations)).toBe(true);
  expect(response.locations).toHaveLength(31);
  expect(response.locations[0]).toMatchObject({
    id: 3892,
    name: "آذربایجان شرقی",
  });
  expect(response).toEqual(expectedLocationsResponse);
});
