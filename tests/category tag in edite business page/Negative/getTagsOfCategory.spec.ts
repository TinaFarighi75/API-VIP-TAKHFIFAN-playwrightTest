import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";

test.describe("validate get tags of category in edite business page @regression @smoke @Negative @get-tags-of-category-in-edite-business-page", () => {

    test("send request with invalid token",async({authTokenAdmin,CategoryTagsInEditeBusinessApi})=>{
        const HaveTagCategoryId = vendorTags[0].categoryId;
        const invalidToken = "invalidToken";
        await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(invalidToken, HaveTagCategoryId);
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(401);
        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse401()
        expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
    })

    test("send request with not existed category id",async({authTokenAdmin,CategoryTagsInEditeBusinessApi})=>{
        const notExistedCategoryId = 100000;
        await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, notExistedCategoryId);
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(400);
        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse400()
        expect(res.msg).toBe("دسته‌بندی مورد نظر یافت نشد.")
    })

    test("send request with wrong category id",async({authTokenAdmin,CategoryTagsInEditeBusinessApi})=>{
        const wrongCategoryId = "category-id";
        await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, wrongCategoryId);
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(400);
        const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse400()
        expect(res.msg).toEqual("شناسه دسته‌بندی نامعتبر است.")
    }
    )
});