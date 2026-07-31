import { describe } from "node:test";
import { test, expect } from "../../../utils/fixtures.js";

test.describe("check takhfifan payment validation @takhfifan-payment @negative-takhfifan-payment @negative @regression", () => {
  test("send by wrong token", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      "wrong_token",
      100000,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(401);
    const response = await takhfifanPaymentApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
  test("send without any token", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      undefined,
      100000,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(401);
    const response = await takhfifanPaymentApi.getInvalidResponse401();
    expect(response.error).toBe("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });
  test("send by wrong url", async ({ takhfifanPaymentApi, authTokenAdmin }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      100776,
      "https://stgiran-vip.takhfifan.com/api/v1/user_panel/payment/takhfifan",
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(404);
    // const response = await takhfifanPaymentApi.getInvalidResponse404();
    // expect(response.message).toBe("");
  });
  test.skip("send when vpn is on", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(403);
    // const response = await takhfifanPaymentApi.getInvalidResponse403();
    // expect(response.message).toBe("");
  });

  test("send by wrong business_id", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      1051507767,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(404);
    const response = await takhfifanPaymentApi.getInvalidResponse404();
    expect(response.message).toBe(
      "Couldn't find Business with 'id'=1051507767",
    );
  });

  test("send by wrong type amount", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      "fghjkl;",
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("مبلغ باید عدد صحیح و بدون اعشار باشد");
  });
  test("send by wrong type business_id", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      "gfvhbjkml",
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("شناسه کسب و کار باید عدد صحیح باشد");
  });
  test("send api without any body", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      undefined,
      undefined,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("وارد کردن شناسه کسب و کار الزامی است");
  });
  test("send api without amount", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      undefined,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("وارد کردن مبلغ الزامی است");
  });
  test("send api without business_id", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000,
      undefined,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("وارد کردن شناسه کسب و کار الزامی است");
  });
  test("send api with amount less than 10T", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      99999,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("حداقل مبلغ می تواند ۱۰ هزار تومان باشد");
  });
  test("send api with amount more than 100MT", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      10000000000,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("حداکثر مبلغ می تواند ۱۰۰ میلیون تومان باشد");
  });
  test("send api with Decimal digits amount", async ({
    takhfifanPaymentApi,
    authTokenAdmin,
  }) => {
    await takhfifanPaymentApi.takhfifanPaymentRequest(
      authTokenAdmin,
      100000.5,
      100776,
    );
    const status = await takhfifanPaymentApi.getStatus();
    expect(status).toBe(400);
    const response = await takhfifanPaymentApi.getInvalidResponse400();
    expect(response.msg).toBe("مبلغ باید عدد صحیح و بدون اعشار باشد");
  });
});
