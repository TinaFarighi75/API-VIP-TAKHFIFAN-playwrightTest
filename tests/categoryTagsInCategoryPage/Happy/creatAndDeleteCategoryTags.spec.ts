import { test, expect } from "../../../utils/fixtures";
import { faker } from "@faker-js/faker";
import { vendorTags } from "../../../test-data/vendor-tag-data";
import { deleteTagTypeWithCleanup } from "../../../helper/categoryTag-helper";

test.describe("Category Tags Lifecycle & Operations @regression @smoke @create-category-tags-in-category-page", () => {
  const msgSuccessCreate = "created successfully";
  const msgSuccessDelete = "Deleted successfully";
  const categoryId = vendorTags[0].categoryId;
  const secondaryCategoryId = vendorTags[1].categoryId;

  test("create category tags life cycle ", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    const randomNumber = faker.number.int({ min: 1000, max: 99999 });
    const tagTypeName = `test tag type ${randomNumber}`;
    const tagTypeEnName = `${tagTypeName} en`;
    const tags = [
      {
        name: `${tagTypeName} 1`,
        en_name: `${tagTypeName} 1 en`,
      },
      {
        name: `${tagTypeName} 2`,
        en_name: `${tagTypeName} 2 en`,
      },
    ];

    // ۱. ایجاد تگ‌تایپ
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      categoryId,
      tagTypeName,
      tagTypeEnName,
      tags,
    );

    const statusCreate = await categoryTagsApi.getStatus();
    expect(statusCreate).toBe(200);

    const responseCreate =
      await categoryTagsApi.getValidCreateTagTypeResponse();
    expect(responseCreate.msg).toEqual(msgSuccessCreate);

    // ۲. بررسی و تأیید وجود تگ‌تایپ در صفحه کتگوری
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();

    expect(responseCategory.data.id).toEqual(String(categoryId));
    expect(
      responseCategory.data.attributes.category_tag_types.length,
    ).toBeGreaterThan(0);
    expect(responseCategory.data.attributes.category_tag_types).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: tagTypeName,
          en_name: tagTypeEnName,
          category_tags: expect.arrayContaining([
            expect.objectContaining({
              name: tags[0].name,
              en_name: tags[0].en_name,
            }),
            expect.objectContaining({
              name: tags[1].name,
              en_name: tags[1].en_name,
            }),
          ]),
        }),
      ]),
    );

    const foundTagType =
      responseCategory.data.attributes.category_tag_types.find(
        (item) =>
          item.name === tagTypeName && item.en_name === tagTypeEnName,
      );

    expect(foundTagType).toBeDefined();
    const tagTypeId = foundTagType!.id;

    // ۳. تست منفی: حذف مستقیم قبل از حذف تگ‌های فرزند باید با خطای ۴۰۰ رد شود
    await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeId);

    const statusDelete = await categoryTagsApi.getStatus();
    expect(statusDelete).toBe(400);

    const responseDelete = await categoryTagsApi.getInvalidResponse400();
    expect(responseDelete.msg).toEqual([
      "این گروه دارای تگ است. برای حذف گروه، ابتدا تگ‌های آن را حذف کنید.",
    ]);

    // ۴. پاکسازی کامل تگ‌های فرزند و حذف موفق تگ‌تایپ
    await deleteTagTypeWithCleanup(categoryTagsApi, authTokenAdmin, tagTypeId);

    const statusCleanDelete = await categoryTagsApi.getStatus();
    expect(statusCleanDelete).toBe(200);

    const responseCleanDelete =
      await categoryTagsApi.getValidResponseForDeleteTagTypeRequest();
    expect(responseCleanDelete.msg).toEqual(msgSuccessDelete);

    // ۵. بررسی و تأیید عدم وجود تگ‌تایپ در لیست کتگوری پس از حذف
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
    const categoryAfterDelete = await categoryTagsApi.getValidCategoryResponse();

    const tagTypeStillExists =
      categoryAfterDelete.data.attributes.category_tag_types.some(
        (item) => item.id === tagTypeId || item.name === tagTypeName,
      );
    expect(tagTypeStillExists).toBe(false);
  });

  test("create category tags with dynamic fake data and verify existence @regression", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    // ۱. تولید نام و داده‌های فیک
    const randomNumber = faker.number.int({ min: 1000, max: 99999 });
    const baseName = `فیک ${randomNumber}`;
    const baseEnName = `${baseName} en`;

    const fakeTags = [
      {
        name: `${baseName} تگ 1`,
        en_name: `${baseName} تگ 1 en`,
      },
      {
        name: `${baseName} تگ 2`,
        en_name: `${baseName} تگ 2 en`,
      },
    ];

    let createdTagTypeId: number | undefined;

    try {
      // ۲. ارسال درخواست ایجاد تگ
      await categoryTagsApi.createTagTypeRequest(
        authTokenAdmin,
        categoryId,
        baseName,
        baseEnName,
        fakeTags,
      );

      const statusCreate = await categoryTagsApi.getStatus();
      expect(statusCreate).toBe(200);

      const responseCreate =
        await categoryTagsApi.getValidCreateTagTypeResponse();
      expect(responseCreate.msg).toEqual(msgSuccessCreate);

      // ۳. بررسی و تأیید وجود تگ‌ها در صفحه کتگوری
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);

      const statusCategory = await categoryTagsApi.getStatus();
      expect(statusCategory).toBe(200);

      const responseCategory = await categoryTagsApi.getValidCategoryResponse();

      expect(responseCategory.data.id).toEqual(String(categoryId));
      expect(
        responseCategory.data.attributes.category_tag_types.length,
      ).toBeGreaterThan(0);

      expect(responseCategory.data.attributes.category_tag_types).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: baseName,
            en_name: baseEnName,
            category_tags: expect.arrayContaining([
              expect.objectContaining({
                name: fakeTags[0].name,
                en_name: fakeTags[0].en_name,
              }),
              expect.objectContaining({
                name: fakeTags[1].name,
                en_name: fakeTags[1].en_name,
              }),
            ]),
          }),
        ]),
      );

      // پیدا کردن شناسه تگ‌تایپ ایجاد شده
      const foundTagType =
        responseCategory.data.attributes.category_tag_types.find(
          (item) => item.name === baseName && item.en_name === baseEnName,
        );

      expect(foundTagType).toBeDefined();
      expect(foundTagType?.id).toBeTruthy();
      createdTagTypeId = foundTagType!.id;

      console.log("✅ Created Tag Type Data:");
      console.log(JSON.stringify(foundTagType, null, 2));
    } finally {
      // ۴. پاکسازی داده و تأیید عدم وجود در کتگوری
      if (createdTagTypeId) {
        await deleteTagTypeWithCleanup(
          categoryTagsApi,
          authTokenAdmin,
          createdTagTypeId,
        );
        expect(await categoryTagsApi.getStatus()).toBe(200);

        // بررسی اینکه تگ دیگر در لیست کتگوری نیست
        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const categoryAfterDelete =
          await categoryTagsApi.getValidCategoryResponse();

        const tagStillExists =
          categoryAfterDelete.data.attributes.category_tag_types.some(
            (item) => item.id === createdTagTypeId || item.name === baseName,
          );
        expect(tagStillExists).toBe(false);
      }
    }
  });

  test("allow duplicate tag type name across different categories with fake data @regression", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    // ۱. تولید نام فیک یکسان برای هر دو دسته‌بندی
    const randomNumber = faker.number.int({ min: 1000, max: 99999 });
    const sharedName = `فیک تکراری ${randomNumber}`;
    const sharedEnName = `${sharedName} en`;

    const fakeTags = [
      {
        name: `${sharedName} تگ 1`,
        en_name: `${sharedName} تگ 1 en`,
      },
      {
        name: `${sharedName} تگ 2`,
        en_name: `${sharedName} تگ 2 en`,
      },
    ];

    let tagTypeIdA: number | undefined;
    let tagTypeIdB: number | undefined;

    try {
      // ۲. ایجاد تگ‌تایپ در دسته‌بندی اول (categoryId)
      await categoryTagsApi.createTagTypeRequest(
        authTokenAdmin,
        categoryId,
        sharedName,
        sharedEnName,
        fakeTags,
      );

      const statusCreateA = await categoryTagsApi.getStatus();
      expect(statusCreateA).toBe(200);
      const resA = await categoryTagsApi.getValidCreateTagTypeResponse();
      expect(resA.msg).toEqual(msgSuccessCreate);

      // ۳. بررسی و اعتبارسنجی وجود تگ در دسته‌بندی اول
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
      const categoryResA = await categoryTagsApi.getValidCategoryResponse();
      expect(categoryResA.data.id).toEqual(String(categoryId));

      expect(categoryResA.data.attributes.category_tag_types).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: sharedName,
            en_name: sharedEnName,
            category_tags: expect.arrayContaining([
              expect.objectContaining({
                name: fakeTags[0].name,
                en_name: fakeTags[0].en_name,
              }),
              expect.objectContaining({
                name: fakeTags[1].name,
                en_name: fakeTags[1].en_name,
              }),
            ]),
          }),
        ]),
      );

      const tagA = categoryResA.data.attributes.category_tag_types.find(
        (item) => item.name === sharedName && item.en_name === sharedEnName,
      );
      expect(tagA).toBeDefined();
      tagTypeIdA = tagA!.id;

      // ۴. ایجاد دقیقاً همان نام در دسته‌بندی دوم (secondaryCategoryId)
      await categoryTagsApi.createTagTypeRequest(
        authTokenAdmin,
        secondaryCategoryId,
        sharedName,
        sharedEnName,
        fakeTags,
      );

      const statusCreateB = await categoryTagsApi.getStatus();
      expect(statusCreateB).toBe(200);
      const resB = await categoryTagsApi.getValidCreateTagTypeResponse();
      expect(resB.msg).toEqual(msgSuccessCreate);

      // ۵. بررسی و اعتبارسنجی وجود تگ در دسته‌بندی دوم
      await categoryTagsApi.getCategoryRequest(
        authTokenAdmin,
        secondaryCategoryId,
      );
      const categoryResB = await categoryTagsApi.getValidCategoryResponse();
      expect(categoryResB.data.id).toEqual(String(secondaryCategoryId));

      expect(categoryResB.data.attributes.category_tag_types).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: sharedName,
            en_name: sharedEnName,
            category_tags: expect.arrayContaining([
              expect.objectContaining({
                name: fakeTags[0].name,
                en_name: fakeTags[0].en_name,
              }),
              expect.objectContaining({
                name: fakeTags[1].name,
                en_name: fakeTags[1].en_name,
              }),
            ]),
          }),
        ]),
      );

      const tagB = categoryResB.data.attributes.category_tag_types.find(
        (item) => item.name === sharedName && item.en_name === sharedEnName,
      );
      expect(tagB).toBeDefined();
      tagTypeIdB = tagB!.id;

      // ۶. تأیید نهایی برابری نام‌ها در هر دو کتگوری
      expect(tagA?.name).toEqual(tagB?.name);
      expect(tagA?.en_name).toEqual(tagB?.en_name);

      console.log(
        "✅ Verified tag type names exist identically in both categories:",
        {
          categoryA_name: tagA?.name,
          categoryB_name: tagB?.name,
          categoryA_id: categoryId,
          categoryB_id: secondaryCategoryId,
        },
      );
    } finally {
      // ۷. پاکسازی دیتاها و بررسی عدم وجود در هر کتگوری به صورت مجزا
      if (tagTypeIdA) {
        await deleteTagTypeWithCleanup(
          categoryTagsApi,
          authTokenAdmin,
          tagTypeIdA,
        );
        expect(await categoryTagsApi.getStatus()).toBe(200);

        // وریفای حذف از کتگوری اول
        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const catAResAfter = await categoryTagsApi.getValidCategoryResponse();
        const tagAExists =
          catAResAfter.data.attributes.category_tag_types.some(
            (item) => item.id === tagTypeIdA,
          );
        expect(tagAExists).toBe(false);
      }

      if (tagTypeIdB) {
        await deleteTagTypeWithCleanup(
          categoryTagsApi,
          authTokenAdmin,
          tagTypeIdB,
        );
        expect(await categoryTagsApi.getStatus()).toBe(200);

        // وریفای حذف از کتگوری دوم
        await categoryTagsApi.getCategoryRequest(
          authTokenAdmin,
          secondaryCategoryId,
        );
        const catBResAfter = await categoryTagsApi.getValidCategoryResponse();
        const tagBExists =
          catBResAfter.data.attributes.category_tag_types.some(
            (item) => item.id === tagTypeIdB,
          );
        expect(tagBExists).toBe(false);
      }
    }
  });

});
