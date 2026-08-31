import { test, expect } from "../../../utils/fixtures";
import { faker } from "@faker-js/faker";

test.describe("Category Tags - Negative Delete Tests @regression @negative @negative-delete-category-tags-in-category-page", () => {
  const categoryId = 547;
  const msgSuccessCreate = "created successfully";
  const msgSuccessDelete = "Deleted successfully";

  const nonExistingTagTypeId = 99999999;
  const expectedNotFoundMsg = "تگ‌تایپ مورد نظر یافت نشد.";

  test("should fail when deleting a non-existing tag type ID ", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.deleteTagTypeRequest(
      authTokenAdmin,
      nonExistingTagTypeId,
    );

    const statusDelete = await categoryTagsApi.getStatus();
    const res = await categoryTagsApi.getInvalidResponse400();
    expect(res.msg).toEqual(expectedNotFoundMsg);
  });

  test("should fail when deleting an already deleted tag type (duplicate deletion)", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    // ۱. تولید داده‌ی داینامیک برای ایجاد تگ جدید
    const randomNumber = faker.number.int({ min: 1000, max: 99999 });
    const baseName = `فیک حذفی ${randomNumber}`;
    const baseEnName = `${baseName} en`;

    const fakeTags = [
      {
        name: `${baseName} تگ 1`,
        en_name: `${baseName} تگ 1 en`,
      },
    ];

    // ۲. ایجاد تگ‌تایپ
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      categoryId,
      baseName,
      baseEnName,
      fakeTags,
    );

    const statusCreate = await categoryTagsApi.getStatus();
    expect(statusCreate).toBe(200);

    const responseCreate = await categoryTagsApi.getInvalidResponse400();
    expect(responseCreate.msg).toEqual(msgSuccessCreate);

    // ۳. استخراج آیدی تگ ساخته‌شده از صفحه کتگوری
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
    const categoryResponse = await categoryTagsApi.getValidCategoryResponse();

    const createdTag = categoryResponse.data.attributes.category_tag_types.find(
      (item) => item.name === baseName && item.en_name === baseEnName,
    );

    expect(createdTag).toBeDefined();
    const tagTypeId = Number(createdTag!.id);

    // ۴. بار اول: حذف تگ (باید موفقیت‌آمیز باشد)
    await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeId);

    const statusFirstDelete = await categoryTagsApi.getStatus();
    expect(statusFirstDelete).toBe(200);
    const res = await categoryTagsApi.getValidResponseForDeleteTagTypeRequest();
    expect(res.msg).toEqual(msgSuccessDelete);

    const responseFirstDelete =
      await categoryTagsApi.getValidResponseForDeleteTagTypeRequest();
    expect(responseFirstDelete.msg).toEqual(msgSuccessDelete);

    // ۵. بار دوم: تلاش مجدد برای حذف همان تگ (باید با خطا مواجه شود)
    await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeId);

    const statusSecondDelete = await categoryTagsApi.getStatus();
    expect(statusSecondDelete).toBe(400);
    const ress = await categoryTagsApi.getInvalidResponse400();
    expect(ress.msg).toEqual(expectedNotFoundMsg);

    console.log(
      `✅ Successfully verified that tagTypeId ${tagTypeId} cannot be deleted twice. Second delete status:`,
      statusSecondDelete,
    );
  });

  test("send delete category tags with wrong tag type id", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, "tag-type-id");
    const status = await categoryTagsApi.getStatus();
    const res = await categoryTagsApi.getInvalidResponse400();
    expect(res.msg).toEqual("شناسه تگ‌تایپ نامعتبر است.");
  });
  test("send delete category tags without token", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.deleteTagTypeRequest(undefined, 21);
    const status = await categoryTagsApi.getStatus();
    const res = await categoryTagsApi.getInvalidResponse401();
    expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });

  test.fixme("send delete category tags with token who not access", async ({
    authTokeMerchant,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.deleteTagTypeRequest(undefined, 21);
    const status = await categoryTagsApi.getStatus();
    const res = await categoryTagsApi.getInvalidResponse403()
    expect(res.error).toEqual(true)
    expect(res.message).toEqual("Forbidden")
  });
});
