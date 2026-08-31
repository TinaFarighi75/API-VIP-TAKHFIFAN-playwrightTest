import { test, expect } from "../../../utils/fixtures";

test.describe("validate get catgory tags in category page @regression @smoke @negative-get-category-tags-in-category-page",()=>{
    test("send request without any token",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getCategoryRequest(undefined, 547); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(401);
        const res = await categoryTagsApi.getInvalidResponse401()
        expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
    })
    test.fixme("send request with token who not access",async({authTokeMerchant,categoryTagsApi})=>{
        await categoryTagsApi.getCategoryRequest(authTokeMerchant, 547); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(403);
        const res = await categoryTagsApi.getInvalidResponse403()
        expect(res.error).toEqual(true)
        expect(res.message).toEqual("Forbidden")
    })
    test("send request with wrong category id",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getCategoryRequest(authTokenAdmin, "category-id"); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("شناسه دسته‌بندی نامعتبر است.")


    })
    test("send request with not existed category id",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getCategoryRequest(authTokenAdmin, 100000); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("دسته‌بندی مورد نظر یافت نشد.")

    })
    test("send request getTagsOfCategoryRequest without any token",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getTagsOfCategoryRequest(undefined, 547);
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(401);
        const res = await categoryTagsApi.getInvalidResponse401()
        expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
    })
    test.fixme("send request getTagsOfCategoryRequest with token who not access",async({authTokeMerchant,categoryTagsApi})=>{
        await categoryTagsApi.getTagsOfCategoryRequest(authTokeMerchant, 547);
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(403);
        const res = await categoryTagsApi.getInvalidResponse403()
        expect(res.error).toEqual(true)
        expect(res.message).toEqual("Forbidden")
    })
    test("send request getTagsOfCategoryRequest with not existed category id",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, 100000); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("دسته‌بندی مورد نظر یافت نشد.")

    })
    test("send request getTagsOfCategoryRequest with wrong category id",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, "category-id"); 
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("شناسه دسته‌بندی نامعتبر است.")


    })
    test("send request get tags of category with query params without any token",async({authTokenAdmin,categoryTagsApi})=>{
        await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      undefined,
      { category_id: 547 },
    );
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(401);
        const res = await categoryTagsApi.getInvalidResponse401()
        expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
    })
    test.fixme("send request get tags of category with query params with token who not access",async({authTokeMerchant,categoryTagsApi})=>{
          await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      authTokeMerchant,
      { category_id: 547 },
    );
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(403);
        const res = await categoryTagsApi.getInvalidResponse403()
        expect(res.error).toEqual(true)
        expect(res.message).toEqual("Forbidden")
    })
    test("send request get tags of category with query params with wrong category id",async({authTokenAdmin,categoryTagsApi})=>{
               await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      authTokenAdmin,
      { category_id: "category_id" },
    );
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("شناسه دسته‌بندی نامعتبر است.")


    })
    test("send request get tags of category with query params with not existed category id",async({authTokenAdmin,categoryTagsApi})=>{
                 await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      authTokenAdmin,
      { category_id: 100000 },
    );
        const status = await categoryTagsApi.getStatus()
        expect(status).toBe(400)
        const res = await categoryTagsApi.getInvalidResponse400()
        expect(res.msg).toEqual("دسته‌بندی مورد نظر یافت نشد.")

    })

})