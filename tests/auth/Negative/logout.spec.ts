//tests/auth/Negative/logout.spec.ts


import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data";

test.describe("logout validation @auth @negative-auth @negative", () => {

  test.fixme("wrong url", async ({ authApi, authTokenAdmin, authUUIDAdmin }) => {
    await authApi.logoutRequest(
      authTokenAdmin,
      authUUIDAdmin,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/user_session/logout222",
    );

    const status = await authApi.getStatus();
    expect(status).toBe(404);

    const response = await authApi.getInvalidResponse404();
    expect(response.message).toBe("Not Found");
  });

  test.fixme("log out without token", async ({ authApi, authUUIDAdmin }) => {
    await authApi.logoutRequest(undefined, authUUIDAdmin);

    const status = await authApi.getStatus();
    expect(status).toBe(401);

    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });

  test.fixme("log out without body", async ({ authApi, authTokenAdmin }) => {
    await authApi.logoutRequest(authTokenAdmin, undefined);

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });

  test("log out with wrong token", async ({ authApi,authTokenAdmin,authUUIDAdmin}) => {
    await authApi.logoutRequest("Bearer 1699133b93569887dfd7368e950fad1f6f9160ed968b2f1f1172d1a61b7c766072029320d8374bde9f1d9d35e13e18184d5614eafd4ae21db97bbc723f5a4adc66", authUUIDAdmin);
    const status= await authApi.getStatus()
        expect(status).toBe(401);

    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");

  });
  test("log out with wrong uuid",async({authApi,authTokenAdmin,authUUIDAdmin})=>{
     await authApi.logoutRequest(authTokenAdmin, "4c99a999244-63a0-45b889-86d5-541eyy6998d2b1");

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("اطلاعاتی پیدا نشد");
  })
  test("log out with empty uuid",async({authApi,authTokenAdmin,authUUIDAdmin})=>{
    await authApi.logoutRequest(authTokenAdmin,"");

    const status = await authApi.getStatus();
    expect(status).toBe(400);

    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("اطلاعاتی پیدا نشد");
  })
  test("when vpn is on",async({authApi,authTokenAdmin,authUUIDAdmin})=>{
    await authApi.logoutRequest(authTokenAdmin,authUUIDAdmin)
    const status= await authApi.getStatus()
    expect(status).toBe(403)
    const response= await authApi.getInvalidResponse403()
    expect(response.error).toBe("")
    expect(response.message).toBe("")
  })
});
