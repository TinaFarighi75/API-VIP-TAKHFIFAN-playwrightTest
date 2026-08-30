//utils/auth/auth-fixtures.ts

import { test as base } from "@playwright/test";
import { users } from "../test-data/user-data"; 

import { Auth } from "./auth/auth";
import { Business } from "./business/business";
import{Category} from "./category/category";
import { Location } from "./location/location";
import{TakhfifanPayment} from "./takhfifan_payment/takhfifan_payment";
import{CategoryTags} from "./category tags  in category page/categoryTags";

type MyFixtures = {
  authApi: Auth;
  authTokenAdmin: string;
  authTokeMerchant: string;
  authUUIDAdmin: string;
  authUUIDMerchant: string;
  authloginRequestViaOtp: string;
  businessApi: Business;
  categoryApi:Category;
  locationApi:Location;
  takhfifanPaymentApi:TakhfifanPayment;
  categoryTagsApi:CategoryTags;
};
export const test = base.extend<MyFixtures>({
  authApi: async ({ request }, use) => {
    await use(new Auth(request));
  },

  businessApi: async ({ request }, use) => {
    await use(new Business(request));
  },
  categoryApi: async ({ request }, use) => {
    await use(new Category(request));
  },
  locationApi: async ({ request }, use) => {
    await use(new Location(request));
  },
  takhfifanPaymentApi: async ({ request }, use) => {
    await use(new TakhfifanPayment(request));
  },
  categoryTagsApi: async ({ request }, use) => {
    await use(new CategoryTags(request));
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
