//tests/create vendor/Negative/searchMobileBussines.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data.js";

test.describe("search mobile bussines validation  @vendor @negative-vendor @negative", async () => {
  test.fixme("Send by wrong mobile type", async ({
    authApi,
    authTokenAdmin,
    businessApi,
  }) => {
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
      "fghjkl dsfds",
    );

    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

  test.fixme("Send by wrong mobile length", async ({
    authApi,
    authTokenAdmin,
    businessApi,
  }) => {
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
      "0939806",
    );

    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

  test.fixme("Send without auth token", async ({
    authApi,
    authTokenAdmin,
    businessApi,
  }) => {
    const userTest = users[4];
    await businessApi.searchBusinessSearchMobileNumberIsNewOrNotRequest(
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
      userTest.mobile,
    );

    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

  test.fixme("Send by wrong url", async ({
    authApi,
    authTokenAdmin,
    businessApi,
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
      userTest.mobile,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/business/searc222h",
    );

    const status = await authApi.getStatus();
    expect(status).toBe(401);
    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
});

test.describe("search bussines name validation  @vendor @negative-vendor @negative", async () => {
  test.fixme("Send without auth token", async ({
    authApi,
    businessApi,
  }) => {
    const userTest = users[4];
    await businessApi.searchBusinessNameIsNewVendorOrNotRequest(
      undefined,
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

    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

    test.fixme("Sending with a very long name", async ({
    authApi,
    authTokenAdmin,
    businessApi,
  }) => {
    await businessApi.searchBusinessNameIsNewVendorOrNotRequest(
      authTokenAdmin,
      undefined,
      undefined,
      undefined,
      undefined,
      "        ",
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
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
      test.fixme("Send by only space name", async ({
    authApi,
    authTokenAdmin,
    businessApi,
  }) => {
    await businessApi.searchBusinessNameIsNewVendorOrNotRequest(
      authTokenAdmin,
      undefined,
      undefined,
      undefined,
      undefined,
      "لاتننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییییینننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننننن",
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
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
  
});
