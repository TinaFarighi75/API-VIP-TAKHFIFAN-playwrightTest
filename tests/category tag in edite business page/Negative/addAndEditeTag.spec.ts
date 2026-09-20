import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";

test.describe("validate add and delete tags of category in edite business page @regression @smoke @Negative @add-and-delete-tags-of-category-in-edite-business-page", () => {
  const notValidTag = 800000;
  test("send request with invalid token", async ({
    authTokenAdmin,
    CategoryTagsInEditeBusinessApi,
  }) => {
    const HaveTagCategoryId = vendorTags[0].categoryId;
    const invalidToken = "invalidToken";
    await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
      invalidToken,
      HaveTagCategoryId,
      { tag_ids: [1] },
    );
    const status = await CategoryTagsInEditeBusinessApi.getStatus();
    expect(status).toBe(401);
    const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse401();
    expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });

  test("send request with invalid business id", async ({
    authTokenAdmin,
    CategoryTagsInEditeBusinessApi,
  }) => {
    const invalidBusinessId = "cat";
    await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
      authTokenAdmin,
      invalidBusinessId,
      { tag_ids: [1] },
    );
    const status = await CategoryTagsInEditeBusinessApi.getStatus();
    expect(status).toBe(404);
    const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse404();
    expect(res.message).toBe(
      `Couldn't find Business with 'id'=${invalidBusinessId}`,
    );
  });
  test("send request without send any category tag key", async ({
    authTokenAdmin,
    CategoryTagsInEditeBusinessApi,
  }) => {
    const businessId = vendorTags[0].businessId; // دقت کنید که اینجا باید businessId بفرستید نه categoryId

    await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
      authTokenAdmin,
      businessId,
      "" as any,
    );

    const status = await CategoryTagsInEditeBusinessApi.getStatus();
    expect(status).toBe(400);

    const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();

    // به جای toEqual از toContain استفاده می‌کنیم چون آرایه شامل ارورهای دیگر هم هست
    expect(res.msg).toContain("category_tag_ids الزامی است.");

    console.log("✅ Received expected validation error among others.");
  });
  test("send request with not valid tags for category of vendor", async ({
    authTokenAdmin,
    CategoryTagsInEditeBusinessApi,
  }) => {
    const businessId = vendorTags[0].businessId;
    const firstTagId = 8;
    const secondTagId = 10;

    await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
      authTokenAdmin,
      businessId,
      [firstTagId, secondTagId],
    );

    const status = await CategoryTagsInEditeBusinessApi.getStatus();
    expect(status).toBe(400);

    const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();

    
    expect(res.msg).toEqual(
    ["شناسه تگ‌ها نامعتبر است."]
    );

  });
   test("send request with not valid tag for category of vendor", async ({
    authTokenAdmin,
    CategoryTagsInEditeBusinessApi,
  }) => {
    const businessId = vendorTags[0].businessId;
    const firstTagId = 8;


    await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
      authTokenAdmin,
      businessId,
      [firstTagId],
    );

    const status = await CategoryTagsInEditeBusinessApi.getStatus();
    expect(status).toBe(400);

    const res = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();

    
    expect(res.msg).toEqual(
  [
        "تگ انتخاب‌شده مربوط به دسته‌بندی این کسب‌وکار نیست."
    ]
    );

  });
});
