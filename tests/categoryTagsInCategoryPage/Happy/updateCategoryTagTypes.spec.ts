import { test, expect } from "../../../utils/fixtures";
import { faker } from "@faker-js/faker";
import { vendorTags } from "../../../test-data/vendor-tag-data";
import { deleteTagTypeWithCleanup } from "../../../helper/categoryTag-helper";

test.describe("update category tags in category pages  @smoke @update-category-tags-in-category-page @regression", () => {
  const msgSuccessCreate = "created successfully";
  const msgSucessUpdate = "Updated successfully";
  const msgSucessDelete = "Deleted successfully";
  const categoryId = vendorTags[0].categoryId;

  test.describe("Complex Update Category Tags", () => {
    let tagTypeIdToCleanup: number | null = null;
    let tagToEditId: number;
    let tagToDestroyId: number;
    let updatedTypeName: string;
    let updatedTypeEnName: string;

    // ۱. مرحله Setup: ساخت اولیه و Assert کردن پیام موفقیت ساخت
    test.beforeEach(async ({ authTokenAdmin, categoryTagsApi }) => {
      const uniqueSuffix = faker.string.alphanumeric(10);
      updatedTypeName = `updated type name ${uniqueSuffix}`;
      updatedTypeEnName = `updated-type-en-${uniqueSuffix}`;
      const initialTags = [
        { name: "tag to edit", en_name: "tag-to-edit" },
        { name: "tag to destroy", en_name: "tag-to-destroy" },
      ];

      // اجرای درخواست ساخت
      await categoryTagsApi.createTagTypeRequest(
        authTokenAdmin,
        categoryId,
        "complex test type",
        "complex-test-type-en",
        initialTags,
      );

      // --- Assertion برای مرحله ساخت (CREATE) ---
      const createStatus = await categoryTagsApi.getStatus();
      expect(createStatus).toBe(200);

      const createResponse =
        await categoryTagsApi.getValidCreateTagTypeResponse();
      expect(createResponse.msg).toEqual(msgSuccessCreate);

      // بازیابی اطلاعات برای پیدا کردن IDها جهت تست‌های بعدی
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
      const initialData = await categoryTagsApi.getValidCategoryResponse();

      const tagType = initialData.data.attributes.category_tag_types.find(
        (item) => item.name === "complex test type",
      )!;

      tagTypeIdToCleanup = tagType.id;
      tagToEditId = tagType.category_tags.find(
        (t) => t.name === "tag to edit",
      )!.id;
      tagToDestroyId = tagType.category_tags.find(
        (t) => t.name === "tag to destroy",
      )!.id;
    });

    // ۲. مرحله Teardown: حذف ایمن با هلپر (Detach سپس Delete)
    test.afterEach(async ({ authTokenAdmin, categoryTagsApi }) => {
      if (tagTypeIdToCleanup) {
        console.log(`Cleaning up tag type ID: ${tagTypeIdToCleanup}`);

        // --- Assertion برای مرحله حذف (DELETE) ---
        // هلپر خودش وضعیت‌های میانی را چک می‌کند و در صورت خطا throw می‌کند
        const deleteResponse = await deleteTagTypeWithCleanup(
          categoryTagsApi,
          authTokenAdmin,
          tagTypeIdToCleanup,
        );
        expect(deleteResponse.msg).toEqual(msgSucessDelete);

        tagTypeIdToCleanup = null;
      }
    });

    // ۳. بدنه اصلی تست: تمرکز روی عملیات Update و Assert پیام آن
    test("complex update lifecycle: edit, create, and destroy in one request", async ({
      authTokenAdmin,
      categoryTagsApi,
    }) => {
      // آماده‌سازی پی‌لود ترکیبی
      const complexPayload = [
        { id: tagToEditId, name: "updated tag name" }, // Edit
        { name: "new fusion tag" }, // Create
        { id: tagToDestroyId, _destroy: true }, // Destroy
      ];

      // اجرای درخواست آپدیت
      await categoryTagsApi.updateTagTypeRequest(
        authTokenAdmin,
        tagTypeIdToCleanup!,
        updatedTypeName,
        updatedTypeEnName,
        complexPayload,
      );

      // --- Assertion برای مرحله آپدیت (UPDATE) ---
      const updateStatus = await categoryTagsApi.getStatus();
      expect(updateStatus).toBe(200);

      const updateResponse =
        await categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
      expect(updateResponse.msg).toEqual(msgSucessUpdate);

      // ۴. مرحله تایید نهایی (Verification): چک کردن اینکه آیا تغییرات واقعاً در دیتابیس اعمال شده‌اند
      await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
      const updatedData = await categoryTagsApi.getValidCategoryResponse();
      const updatedTagType = updatedData.data.attributes.category_tag_types.find(
        (t) => t.id === tagTypeIdToCleanup,
      )!;

      // تایید وجود تگ ویرایش شده
      expect(updatedTagType.category_tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "updated tag name" }),
        ]),
      );

      // تایید وجود تگ جدید
      expect(updatedTagType.category_tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: "new fusion tag" }),
        ]),
      );

      // تایید حذف شدن تگ قدیمی
      const foundDestroyedTag = updatedTagType.category_tags.find(
        (t) => t.id === tagToDestroyId,
      );
      expect(foundDestroyedTag).toBeUndefined();
    });
  });

  test.describe("step by step update category tags", () => {
    // تابع کمکی برای ساخت شناسه منحصر‌به‌فرد حتی در اجرای موازی
    const getUniqueId = () =>
      `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    // --- بخش اول: سناریوهای پیچیده (Lifecycle) ---
    test.describe("Complex Update Category Tags", () => {
      let tagTypeIdToCleanup: number | null = null;
      let tagToEditId: number;
      let tagToDestroyId: number;

      test.beforeEach(async ({ authTokenAdmin, categoryTagsApi }) => {
        const uniqueSuffix = getUniqueId();
        const initialTags = [
          { name: `tag-edit-${uniqueSuffix}`, en_name: `tag-to-edit-${uniqueSuffix}` },
          { name: `tag-destroy-${uniqueSuffix}`, en_name: `tag-to-destroy-${uniqueSuffix}` },
        ];

        await categoryTagsApi.createTagTypeRequest(
          authTokenAdmin,
          categoryId,
          `complex type ${uniqueSuffix}`,
          `complex-type-${uniqueSuffix}`,
          initialTags,
        );

        const createStatus = await categoryTagsApi.getStatus();
        expect(createStatus).toBe(200);

        const createResponse = await categoryTagsApi.getValidCreateTagTypeResponse();
        expect(createResponse.msg).toEqual(msgSuccessCreate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const initialData = await categoryTagsApi.getValidCategoryResponse();

        const tagType = initialData.data.attributes.category_tag_types.find(
          (item) => item.name === `complex type ${uniqueSuffix}`,
        )!;

        tagTypeIdToCleanup = tagType.id;
        tagToEditId = tagType.category_tags.find(
          (t) => t.name === `tag-edit-${uniqueSuffix}`,
        )!.id;
        tagToDestroyId = tagType.category_tags.find(
          (t) => t.name === `tag-destroy-${uniqueSuffix}`,
        )!.id;
      });

      // Teardown: حذف ایمن با هلپر (Detach سپس Delete)
      test.afterEach(async ({ authTokenAdmin, categoryTagsApi }) => {
        if (tagTypeIdToCleanup) {
          console.log(`Cleaning up complex tag type ID: ${tagTypeIdToCleanup}`);

          const deleteResponse = await deleteTagTypeWithCleanup(
            categoryTagsApi,
            authTokenAdmin,
            tagTypeIdToCleanup,
          );
          expect(deleteResponse.msg).toEqual(msgSucessDelete);

          tagTypeIdToCleanup = null;
        }
      });

      test("complex update lifecycle: edit, create, and destroy in one request", async ({
        authTokenAdmin,
        categoryTagsApi,
      }) => {
        const uniqueSuffix = getUniqueId();
        const complexPayload = [
          { id: tagToEditId, name: `updated tag name ${uniqueSuffix}` },
          { name: `new fusion tag ${uniqueSuffix}` },
          { id: tagToDestroyId, _destroy: true },
        ];

        await categoryTagsApi.updateTagTypeRequest(
          authTokenAdmin,
          tagTypeIdToCleanup!,
          `updated type name ${uniqueSuffix}`,
          `updated-type-en-${uniqueSuffix}`,
          complexPayload,
        );

        const updateStatus = await categoryTagsApi.getStatus();
        expect(updateStatus).toBe(200);

        const updateResponse = await categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
        expect(updateResponse.msg).toEqual(msgSucessUpdate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const updatedData = await categoryTagsApi.getValidCategoryResponse();
        const updatedTagType = updatedData.data.attributes.category_tag_types.find(
          (t) => t.id === tagTypeIdToCleanup,
        )!;

        expect(updatedTagType.category_tags).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ name: `updated tag name ${uniqueSuffix}` }),
            expect.objectContaining({ name: `new fusion tag ${uniqueSuffix}` }),
          ]),
        );

        const foundDestroyedTag = updatedTagType.category_tags.find(
          (t) => t.id === tagToDestroyId,
        );
        expect(foundDestroyedTag).toBeUndefined();
      });
    });

    // --- بخش دوم: تست‌های تخصصی (Single Field Updates) ---
    test.describe("Category Tags - Specialized Update Tests @regression", () => {
      let tagTypeIdToCleanup: number | null = null;
      let tagToEditId: number;
      let currentTypeName: string;
      let currentTypeEnName: string;

      test.beforeEach(async ({ authTokenAdmin, categoryTagsApi }) => {
        const uniqueSuffix = getUniqueId();
        currentTypeName = `base test type ${uniqueSuffix}`;
        currentTypeEnName = `base-test-en-${uniqueSuffix}`;

        const initialTags = [
          { name: `original name ${uniqueSuffix}`, en_name: `original-en-${uniqueSuffix}` },
        ];

        await categoryTagsApi.createTagTypeRequest(
          authTokenAdmin,
          categoryId,
          currentTypeName,
          currentTypeEnName,
          initialTags,
        );

        const createStatus = await categoryTagsApi.getStatus();
        expect(createStatus).toBe(200);

        const response = await categoryTagsApi.getValidCreateTagTypeResponse();
        expect(response.msg).toEqual(msgSuccessCreate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const initialData = await categoryTagsApi.getValidCategoryResponse();
        const tagType = initialData.data.attributes.category_tag_types.find(
          (item) => item.name === currentTypeName,
        )!;

        tagTypeIdToCleanup = tagType.id;
        tagToEditId = tagType.category_tags[0].id;
      });

      // Teardown: حذف ایمن با هلپر (Detach سپس Delete)
      test.afterEach(async ({ authTokenAdmin, categoryTagsApi }) => {
        if (tagTypeIdToCleanup) {
          const deleteResponse = await deleteTagTypeWithCleanup(
            categoryTagsApi,
            authTokenAdmin,
            tagTypeIdToCleanup,
          );
          expect(deleteResponse.msg).toEqual(msgSucessDelete);

          tagTypeIdToCleanup = null;
        }
      });

      // تست ۱: فقط آپدیت نام (name)
      test("should only update the 'name' attribute", async ({ authTokenAdmin, categoryTagsApi }) => {
        const newName = `updated name ${getUniqueId()}`;

        await categoryTagsApi.updateTagTypeRequest(
          authTokenAdmin,
          tagTypeIdToCleanup!,
          newName,
          currentTypeEnName,
          [],
        );

        expect(await categoryTagsApi.getStatus()).toBe(200);
        const response = await categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
        expect(response.msg).toEqual(msgSucessUpdate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const data = await categoryTagsApi.getValidCategoryResponse();
        const updatedType = data.data.attributes.category_tag_types.find(
          (t) => t.id === tagTypeIdToCleanup,
        )!;

        expect(updatedType.name).toBe(newName);
        expect(updatedType.en_name).toBe(currentTypeEnName);
      });

      // تست ۲: فقط آپدیت نام انگلیسی (en_name)
      test("should only update the 'en_name' attribute", async ({ authTokenAdmin, categoryTagsApi }) => {
        const newEnName = `updated-en-name-${getUniqueId()}`;

        await categoryTagsApi.updateTagTypeRequest(
          authTokenAdmin,
          tagTypeIdToCleanup!,
          currentTypeName,
          newEnName,
          [],
        );

        expect(await categoryTagsApi.getStatus()).toBe(200);
        const response = await categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
        expect(response.msg).toEqual(msgSucessUpdate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const data = await categoryTagsApi.getValidCategoryResponse();
        const updatedType = data.data.attributes.category_tag_types.find(
          (t) => t.id === tagTypeIdToCleanup,
        )!;

        expect(updatedType.en_name).toBe(newEnName);
        expect(updatedType.name).toBe(currentTypeName);
      });

      // تست ۳: فقط آپدیت تگ‌های داخلی (category_tags)
      test("should only update the internal 'category_tags' attributes", async ({ authTokenAdmin, categoryTagsApi }) => {
        const newTagName = `internal tag ${getUniqueId()}`;
        const complexPayload = [{ id: tagToEditId, name: newTagName }];

        await categoryTagsApi.updateTagTypeRequest(
          authTokenAdmin,
          tagTypeIdToCleanup!,
          currentTypeName,
          currentTypeEnName,
          complexPayload,
        );

        expect(await categoryTagsApi.getStatus()).toBe(200);
        const response = await categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
        expect(response.msg).toEqual(msgSucessUpdate);

        await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);
        const data = await categoryTagsApi.getValidCategoryResponse();
        const updatedType = data.data.attributes.category_tag_types.find(
          (t) => t.id === tagTypeIdToCleanup,
        )!;

        const updatedTag = updatedType.category_tags.find(
          (t) => t.id === tagToEditId,
        );
        expect(updatedTag?.name).toBe(newTagName);
        expect(updatedType.name).toBe(currentTypeName);
      });
    });
  });
test("can not delete tag when tag assign in vendor", async ({
  authTokenAdmin,
  categoryTagsApi,
}) => {
  const tagTypeIdStage = 266;
  const tagsPayload = [{ id: 486, _destroy: true }];

  // ارسال پارامترها طبق امضای صحیح متد
  await categoryTagsApi.updateTagTypeRequest(
    authTokenAdmin,
    tagTypeIdStage,
    "نام گروه تستی",      
    "en-group-name",    
    tagsPayload          
  );

  const status = await categoryTagsApi.getStatus();
  expect(status).toBe(400);

  const response = await categoryTagsApi.getInvalidResponse400();
  expect(response.msg).toEqual([
    "این تگ در وندورها استفاده شده است. برای حذف، ابتدا آن را از وندورها حذف کنید.",
  ]);
});

    
  })
