 //utils/create vendor/ createVendor-fixtures.ts

import { test as base } from "@playwright/test";
import { Vendor } from "../create vendor/createVendor";

type MyFixtures = {
  createVendorApi: Vendor;
  authTokenAdmin: string;
  authTokeMerchant: string;
  authUUIDAdmin: string;
  authUUIDMerchant: string;
  authloginRequestViaOtp: string;
};
export const test = base.extend<MyFixtures>({
  createVendorApi: async ({ request }, use) => {
    const vendor = new Vendor(request);
    await use(vendor);
  }
   }
)