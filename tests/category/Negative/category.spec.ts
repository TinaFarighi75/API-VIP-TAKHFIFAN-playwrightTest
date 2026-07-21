import { test, expect } from "../../../utils/fixtures.js";

test.describe("category list validation @vendor @negative-vendor @negative @category @negative-category", async () => {
  test.fixme("send by wrong token", async ({ authApi, categoryApi }) => {
    await categoryApi.categoryRequest("wrong_token");
    const status = await authApi.getStatus();
    expect(status).toBe(401);
    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
  test.fixme("send without any token", async ({ authApi, categoryApi }) => {
    await categoryApi.categoryRequest(undefined);
    const status = await authApi.getStatus();
    expect(status).toBe(401);
    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
    test.fixme("send by wrong url", async ({ authApi, categoryApi ,authTokenAdmin}) => {
    await categoryApi.categoryRequest(authTokenAdmin,"https://stgiran-vip.takhfifan.com/api/categories2");
    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse404();
    expect(response.message).toBe("");
  });
});
