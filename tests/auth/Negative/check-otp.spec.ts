//tests/auth/Negative/check-otp.spec.ts

import { test, expect } from "../../../utils/fixtures";
import { users } from "../../../test-data/user-data";

test.describe("check OTP validation @auth @negative-auth @negative", async () => {


  test("Send wrong code", async ({ authApi, authloginRequestViaOtp }) => {
    await authApi.loginCheckOtpRequest(authloginRequestViaOtp, "sv233");
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual("کدیکبار مصرف صحیح نیست");
  });

  test(" Do not Send  body", async ({
    authApi,
    authloginRequestViaOtp,
  }) => {
    await authApi.loginCheckOtpRequest(undefined, undefined);
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    // expect(response.msg).toEqual("");
  });
  test(" Do not Send  otp-token", async ({
    authApi,
    authloginRequestViaOtp,
  }) => {
    const userTest = users[4];

    await authApi.loginCheckOtpRequest(undefined, userTest.passwordTest);
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual(
      "تعداد تلاش‌های ناموفق بیش از حد مجاز است. لطفا ۱۵ دقیقه دیگر مجددا تلاش کنید",
    );
  });

  test("Do not Send code", async ({
    authApi,
    authloginRequestViaOtp,
  }) => {

    await authApi.loginCheckOtpRequest(
      authloginRequestViaOtp,
      undefined,
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    // const response = await authApi.getInvalidResponse400();
    // expect(response.msg).toEqual("");
  });

  test("Send wrong otp-token", async ({ authApi, authloginRequestViaOtp }) => {
    const userTest = users[4];
    await authApi.loginCheckOtpRequest(
      "712408fghjkljuyiop[dasjdj505cd9b490541ae380a",
      userTest.passwordTest,
    );
    const status = await authApi.getStatus();
    expect(status).toBe(400);
    const response = await authApi.getInvalidResponse400();
    expect(response.msg).toEqual("کدیکبار مصرف صحیح نیست");
  });
  test("Send wrong url",async({authApi,authloginRequestViaOtp})=>{

    const userTest = users[4]
    await authApi.loginCheckOtpRequest(authloginRequestViaOtp,userTest.passwordTest,"https://stgiran-vip.takhfifan.com/api/v1/user_panel/authentication/check_otp22")

    const status = await authApi.getStatus();
    expect(status).toBe(404);
    // const response = await authApi.getInvalidResponse404();
    // expect(response.message).toEqual("");
  })
  
  test.skip("send request when vpn is on",async({authApi,authloginRequestViaOtp})=>{ 
    const userTest = users[4]

    await authApi.loginCheckOtpRequest(authloginRequestViaOtp,userTest.passwordTest)


    const status = await authApi.getStatus();
    expect(status).toBe(403);
    const response = await authApi.getInvalidResponse403();
    // expect(response.message).toEqual("");


  })
});

