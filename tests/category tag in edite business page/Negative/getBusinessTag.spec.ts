import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";

test.describe("validate tags of business in edite business page @regression @smoke @happy @get-tags-of-business-in-edite-business-page", () => {
    test("send request with invalid token", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
       const businessId = vendorTags[0].businessId;
        const invalidToken = "invalidToken";
        
        await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(invalidToken, businessId);
        
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(401);

        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse401();
       expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");

    });
    test("send request with not existed business id", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
        const notExistedBusinessId = 199999999;
        
        await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, notExistedBusinessId);
        
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(404);

        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse404();
        expect(res.message).toBe(`Couldn't find Business with 'id'=${notExistedBusinessId}`);
    });
    test("send request with wrong business id", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
        const wrongBusinessId = "business-id";
        
        await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, wrongBusinessId);
        
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(404);

        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse404();
        expect(res.message).toBe(`Couldn't find Business with 'id'=${wrongBusinessId}`);
    }); 


});