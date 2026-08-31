import { test, expect } from "../../../utils/fixtures";
import { faker } from "@faker-js/faker";

test.describe("Category Tags Lifecycle & Operations @regression @smoke @create-category-tags-in-category-page", () => {
  const msgSuccessCreate = "created successfully";
  const msgSuccessDelete = "Deleted successfully";
  const categoryId = 547;
  const secondaryCategoryId = 546; // شناسه دسته‌بندی دوم برای سناریوی تکرارپذیری

  test("create category tags life cycle", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      categoryId,
      "test tag type",
      "test tag type en",
      [
        {
          name: "test tag 1",
          en_name: "test tag 1 en",
        },
        {
          name: "test tag 2",
          en_name: "test tag 2 en",
        },
      ],
    );

    const statusCreate = await categoryTagsApi.getStatus();
    expect(statusCreate).toBe(200);

    const responseCreate = await categoryTagsApi.getValidCreateTagTypeResponse();
    expect(responseCreate.msg).toEqual(msgSuccessCreate);

    // check category tags in category page
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
          name: "test tag type",
          en_name: "test tag type en",
          category_tags: expect.arrayContaining([
            expect.objectContaining({
              name: "test tag 1",
              en_name: "test tag 1 en",
            }),
            expect.objectContaining({
              name: "test tag 2",
              en_name: "test tag 2 en",
            }),
          ]),
        }),
      ]),
    );

    const foundTagType = responseCategory.data.attributes.category_tag_types.find(
      (item) =>
        item.name === "test tag type" && item.en_name === "test tag type en",
    );

    expect(foundTagType).toBeDefined();
    const tagTypeId = foundTagType!.id;

    await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeId);

    const statusDelete = await categoryTagsApi.getStatus();
    expect(statusDelete).toBe(200);

    const responseDelete =
      await categoryTagsApi.getValidResponseForDeleteTagTypeRequest();

    expect(responseDelete.msg).toEqual(msgSuccessDelete);
  });

  test("create category tags with dynamic fake data and verify existence @regression", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    // ۱. تولید نام و رشته‌ها بدون پرانتز
    const randomNumber = faker.number.int({ min: 1000, max: 99999 });
    
    // name: فیک به همراه شماره
    const baseName = `فیک ${randomNumber}`;
    
    // en_name: مقدار name به همراه en
    const baseEnName = `${baseName} en`;

    // ساخت دیتای کتگوری تگ‌ها بر اساس الگوی مدنظر
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

    const responseCreate = await categoryTagsApi.getValidCreateTagTypeResponse();
    expect(responseCreate.msg).toEqual(msgSuccessCreate);

    // ۳. بررسی و تأیید ایجاد تگ‌ها در صفحه کتگوری
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();

    expect(responseCategory.data.id).toEqual(String(categoryId));
    expect(
      responseCategory.data.attributes.category_tag_types.length,
    ).toBeGreaterThan(0);

    // بررسی وجود دقیق ساختار و مقادیر در ریسپانس
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

    // پیدا کردن آبجکت ایجاد شده
    const foundTagType = responseCategory.data.attributes.category_tag_types.find(
      (item) =>
        item.name === baseName && item.en_name === baseEnName,
    );

    expect(foundTagType).toBeDefined();
    expect(foundTagType?.id).toBeTruthy();

    // ۴. لاگ کردن دیتای ساخته‌شده در خروجی کنسول
    console.log("✅ Created Tag Type Data:");
    console.log(JSON.stringify(foundTagType, null, 2));
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

    let tagTypeIdA:  number | undefined;
    let tagTypeIdB: number | undefined;

    try {
      // ۲. ایجاد تگ‌تایپ در دسته‌بندی اول (categoryId: 547)
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

      // ۳. بررسی و اعتبارسنجی تگ بر اساس نام در دسته‌بندی اول
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
      const categoryResA = await categoryTagsApi.getValidCategoryResponse();
      expect(categoryResA.data.id).toEqual(String(categoryId));

      // بررسی بر اساس Name و EnName و ساختار فرزندان
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

      // ۴. ایجاد دقیقاً همان نام در دسته‌بندی دوم (secondaryCategoryId: 546)
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

      // ۵. بررسی و اعتبارسنجی تگ بر اساس نام در دسته‌بندی دوم
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, secondaryCategoryId);
      const categoryResB = await categoryTagsApi.getValidCategoryResponse();
      expect(categoryResB.data.id).toEqual(String(secondaryCategoryId));

      // بررسی بر اساس Name و EnName و ساختار فرزندان در دسته‌بندی دوم
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

      console.log("✅ Verified tag type names exist identically in both categories:", {
        categoryA_name: tagA?.name,
        categoryB_name: tagB?.name,
        categoryA_id: categoryId,
        categoryB_id: secondaryCategoryId,
      });
    } finally {
      // ۷. پاکسازی دیتاها جهت حفظ ایزولاسیون تست‌ها
      if (tagTypeIdA) {
        await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeIdA);
        const statusDelA = await categoryTagsApi.getStatus();
        expect(statusDelA).toBe(200);
      }
      if (tagTypeIdB) {
        await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeIdB);
        const statusDelB = await categoryTagsApi.getStatus();
        expect(statusDelB).toBe(200);
      }
    }
  });
});
