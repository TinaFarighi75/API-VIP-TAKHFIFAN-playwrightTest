import { test, expect } from "../../../utils/fixtures.js";

test("check takhfifan payment with amount 10T @takhfifan-payment ", async ({
  takhfifanPaymentApi,
  authTokenAdmin,
}) => {
  const apiResponse = await takhfifanPaymentApi.takhfifanPaymentRequest(
    authTokenAdmin,100000,100776

  );

  expect(apiResponse.status()).toBe(200);

  const response = await takhfifanPaymentApi.getTakhfifanPaymentResponse();

  expect(response).toHaveProperty("msg");
  expect(response).toHaveProperty("id");
  expect(typeof response.msg).toBe("string");
  expect(typeof response.id).toBe("number");
  expect(response.msg.length).toBeGreaterThan(0);
  expect(response.id).toBeGreaterThan(0);
  expect(response).toEqual({
    msg: "created successfully",
    id: expect.any(Number),
  });
});
test("check takhfifan payment with amount 100MT @takhfifan-payment ", async ({
  takhfifanPaymentApi,
  authTokenAdmin,
}) => {
  const apiResponse = await takhfifanPaymentApi.takhfifanPaymentRequest(
    authTokenAdmin,1000000000,100776

  );

  expect(apiResponse.status()).toBe(200);

  const response = await takhfifanPaymentApi.getTakhfifanPaymentResponse();

  expect(response).toHaveProperty("msg");
  expect(response).toHaveProperty("id");
  expect(typeof response.msg).toBe("string");
  expect(typeof response.id).toBe("number");
  expect(response.msg.length).toBeGreaterThan(0);
  expect(response.id).toBeGreaterThan(0);
  expect(response).toEqual({
    msg: "created successfully",
    id: expect.any(Number),
  });
});
test("check takhfifan payment with amount between 10T and 100MT @takhfifan-payment ", async ({
  takhfifanPaymentApi,
  authTokenAdmin,
}) => {
  const apiResponse = await takhfifanPaymentApi.takhfifanPaymentRequest(
    authTokenAdmin,200000,100776

  );

  expect(apiResponse.status()).toBe(200);

  const response = await takhfifanPaymentApi.getTakhfifanPaymentResponse();

  expect(response).toHaveProperty("msg");
  expect(response).toHaveProperty("id");
  expect(typeof response.msg).toBe("string");
  expect(typeof response.id).toBe("number");
  expect(response.msg.length).toBeGreaterThan(0);
  expect(response.id).toBeGreaterThan(0);
  expect(response).toEqual({
    msg: "created successfully",
    id: expect.any(Number),
  });
});