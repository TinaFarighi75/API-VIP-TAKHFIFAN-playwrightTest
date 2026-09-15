import { test, expect } from "../../../utils/fixtures.js";

test.describe("category list validation @vendor @negative-vendor @negative @category @negative-category", async () => {
  test("send by wrong token", async ({authTokenAdmin,categoryApi}) => {
    await categoryApi.categoryRequest("wrong_token");
    const status = await categoryApi.getStatus();
    expect(status).toBe(200);
  });
  test.fixme("send without any token", async ({ authTokenAdmin,categoryApi }) => {
    await categoryApi.categoryRequest(undefined);
    const status = await categoryApi.getStatus();
    expect(status).toBe(401);

  });
  test("send by wrong url", async ({authTokenAdmin,categoryApi}) => {
    await categoryApi.categoryRequest(authTokenAdmin,"https://stgiran-vip.takhfifan.com/api/categoriesfghjk");
    const status = await categoryApi.getStatus();
    expect(status).toBe(404);
    // const response = await authApi.getInvalidResponse404();
    // expect(response.message).toBe("");
  });
});
