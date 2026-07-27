import { describe } from "node:test";
import { test, expect } from "../../../utils/fixtures.js";

test.describe("check takhfifan payment validation @takhfifan-payment @negative-takhfifan-payment @negative @regression", () => {
  test("send by wrong token", async ({ authApi, takhfifanPaymentApi }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      "wrong_token",
      100000,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(401);
    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
  test("send without any token", async ({ authApi, takhfifanPaymentApi }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      undefined,
      100000,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(401);
    const response = await authApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
  test.fixme("send by wrong url", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      100776,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/payment/takhfifan"
    );
    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse404();
    expect(response.message).toBe("");
  });
  test.fixme("send when vpn is on", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(403);
    const response = await authApi.getInvalidResponse403();
    expect(response.message).toBe("");
  });
  test.fixme("send by wrong business_id", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      1007767
    );
    const status = await authApi.getStatus();
    expect(status).toBe(404);
    const response = await authApi.getInvalidResponse404();
    expect(response.message).toBe("");
  });

  test.fixme("send by wrong type amount", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      "100000",
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });   
  test.fixme("send by wrong type business_id", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      "100776"
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });   
  test.fixme("send api without any body", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      undefined,
      undefined
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
  test.fixme("send api without amount", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      undefined,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
  test.fixme("send api without business_id", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
        await takhfifanPaymentApi.takhfifanPaymentRequest(
          authTokenAdmin,
          100000,
          undefined
        );
        const status = await authApi.getStatus();
        expect(status).toBe(400);
        const response = await authApi.getInvalidResponse400();
        expect(response.msg).toBe("");
});
  test.fixme("send api with amount less than 10T", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      99999,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
  test.fixme("send api with amount more than 100MT", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      10000000000,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
  test.fixme("send api with Decimal digits amount", async ({ authApi, takhfifanPaymentApi ,authTokenAdmin}) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000.5,
      100776
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toBe("");
  });
});                 