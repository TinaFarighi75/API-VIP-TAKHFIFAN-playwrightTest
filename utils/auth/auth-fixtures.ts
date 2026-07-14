import { test as base } from "@playwright/test";
import { users } from "../../test-data/user-data";
import { Auth } from "../auth/auth";

type MyFixtures = {
  authApi: Auth;
  authTokenAdmin: string;
  authTokeMerchant: string;
  authUUIDAdmin: string;
  authUUIDMerchant: string;
  authloginRequestViaOtp: string;
};
export const test = base.extend<MyFixtures>({
  authApi: async ({ request }, use) => {
    const auth = new Auth(request);
    await use(auth);
  },

  authTokenAdmin: async ({ authApi }, use) => {
    const defaultUser = users[0];
    await authApi.loginRequest(defaultUser.username, defaultUser.password);
    const loginData = await authApi.getValidLoginResponselogin();
    await use(loginData.token);
  },
  authUUIDAdmin: async ({ authApi }, use) => {
    const defaultUser = users[0];
    await authApi.loginRequest(defaultUser.username, defaultUser.password);
    const loginData = await authApi.getValidLoginResponselogin();
    await use(loginData.uuid);
  },
  authTokeMerchant: async ({ authApi }, use) => {
    const defaultUser = users[2];
    await authApi.loginRequest(defaultUser.username, defaultUser.password);
    const loginData = await authApi.getValidLoginResponselogin();
    await use(loginData.token);
  },
  authUUIDMerchant: async ({ authApi }, use) => {
    const defaultUser = users[2];
    await authApi.loginRequest(defaultUser.username, defaultUser.password);
    const loginData = await authApi.getValidLoginResponselogin();
    await use(loginData.uuid);
  },
  authloginRequestViaOtp: async ({ authApi }, use) => {
    const defaultUser = users[4];
    await authApi.loginRequestViaOtp(defaultUser.mobile);
    const loginData = await authApi.getValidLogInResponseViaOtp();
    await use(loginData.otp_token);
  },
});

export { expect } from "@playwright/test";
