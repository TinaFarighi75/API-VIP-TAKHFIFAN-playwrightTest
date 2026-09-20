import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";

test.describe(
  "validate add tag to business in edite business page @regression @smoke @happy @add-tag-to-business-in-edite-business-page",
  () => {
    const msgSuccess = "Updated successfully";
    const msgSuccess2 = "updated successfully";

    const HaveTagCategoryId = vendorTags[0].categoryId;
    const businessId = vendorTags[0].businessId;
    const newCategory = vendorTags[5].categoryId;
    const orgCategory = vendorTags[0].categoryId;

    test("add tag to business", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
      // ۱. به دست آوردن تگ‌های یک دسته‌بندی
      await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, HaveTagCategoryId);
      const listOfCategoryTagTypes =
        await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsRequest();

      const firstTagId =
        listOfCategoryTagTypes.data.attributes.category_tag_types[0].category_tags[0].id;
      const secondTagId =
        listOfCategoryTagTypes.data.attributes.category_tag_types[0].category_tags[1].id;

      expect(firstTagId).toBeDefined();
      expect(secondTagId).toBeDefined();

      // ۲. اختصاص تگ‌ها به بیزینس
      await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
        authTokenAdmin,
        businessId,
        [firstTagId, secondTagId]
      );

      const status = await CategoryTagsInEditeBusinessApi.getStatus();
      if (status !== 200) {
        try {
          const err400 = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();
          console.error("❌ 400 Error details on replace tags:", JSON.stringify(err400, null, 2));
        } catch {
          console.error("❌ Request failed with status:", status);
        }
      }
      expect(status).toBe(200);

      const res =
        await CategoryTagsInEditeBusinessApi.getValidResponseForReplaceCategoryTagOfVendorRequest();
      expect(res.msg).toEqual(msgSuccess);

      // ۳. بررسی و صحت‌سنجی اضافه شدن تگ‌ها به بیزینس
      await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, businessId);
      const res2 =
        await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsOfVendorRequest();

      expect(res2.data).toBeDefined();
      const listOfCategoryTagTypesOfVendor = res2.data.attributes.tags;

      expect(listOfCategoryTagTypesOfVendor).toBeDefined();
      expect(listOfCategoryTagTypesOfVendor.length).toBeGreaterThanOrEqual(2);

      const assignedTagIds = listOfCategoryTagTypesOfVendor.map((tag: { id: number }) => tag.id);
      expect(assignedTagIds).toContain(firstTagId);
      expect(assignedTagIds).toContain(secondTagId);

      console.log(
        `✅ Successfully verified that businessId ${businessId} has tags. Number of tags:`,
        listOfCategoryTagTypesOfVendor.length
      );

      // ۴. پاک کردن تگ‌های بیزینس
      await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
        authTokenAdmin,
        businessId,
        []
      );

      const status2 = await CategoryTagsInEditeBusinessApi.getStatus();
      if (status2 !== 200) {
        try {
          const err400 = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();
          console.error("❌ 400 Error details on clear tags:", JSON.stringify(err400, null, 2));
        } catch {
          console.error("❌ Clear tags failed with status:", status2);
        }
      }
      expect(status2).toBe(200);

      const res3 =
        await CategoryTagsInEditeBusinessApi.getValidResponseForReplaceCategoryTagOfVendorRequest();
      expect(res3.msg).toEqual(msgSuccess);

      // ۵. تأیید خالی شدن تگ‌های بیزینس
      await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, businessId);
      const res4 =
        await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsOfVendorRequest();

      expect(res4.data).toBeDefined();
      const listOfCategoryTagTypesOfVendor2 = res4.data.attributes.tags;

      expect(listOfCategoryTagTypesOfVendor2).toBeDefined();
      expect(listOfCategoryTagTypesOfVendor2.length).toEqual(0);

      console.log(
        `✅ Successfully verified that businessId ${businessId} has no tags. Number of tags:`,
        listOfCategoryTagTypesOfVendor2.length
      );
    });

    test("add tag and change catgeory", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
      // ۱. به دست آوردن تگ‌های یک دسته‌بندی
      await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, HaveTagCategoryId);
      const listOfCategoryTagTypes =
        await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsRequest();

      const firstTagId =
        listOfCategoryTagTypes.data.attributes.category_tag_types[0].category_tags[0].id;
      const secondTagId =
        listOfCategoryTagTypes.data.attributes.category_tag_types[0].category_tags[1].id;

      expect(firstTagId).toBeDefined();
      expect(secondTagId).toBeDefined();

      try {
        // ۲. اختصاص تگ‌ها به بیزینس
        await CategoryTagsInEditeBusinessApi.replaceCategoryTagOfVendorRequest(
          authTokenAdmin,
          businessId,
          [firstTagId, secondTagId]
        );

        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        if (status !== 200) {
          try {
            const err400 = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();
            console.error("❌ 400 Error details on test 2 replace tags:", JSON.stringify(err400, null, 2));
          } catch {
            console.error("❌ Test 2 replace tags failed with status:", status);
          }
        }
        expect(status).toBe(200);

        const res =
          await CategoryTagsInEditeBusinessApi.getValidResponseForReplaceCategoryTagOfVendorRequest();
        expect(res.msg).toEqual(msgSuccess);

        // ۳. بررسی اضافه شدن تگ‌ها
        await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, businessId);
        const res2 =
          await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsOfVendorRequest();

        expect(res2.data).toBeDefined();
        const listOfCategoryTagTypesOfVendor = res2.data.attributes.tags;

        expect(listOfCategoryTagTypesOfVendor).toBeDefined();
        expect(listOfCategoryTagTypesOfVendor.length).toBeGreaterThanOrEqual(2);

        const assignedTagIds = listOfCategoryTagTypesOfVendor.map((tag: { id: number }) => tag.id);
        expect(assignedTagIds).toContain(firstTagId);
        expect(assignedTagIds).toContain(secondTagId);

        console.log(
          `✅ Successfully verified that businessId ${businessId} has tags. Number of tags:`,
          listOfCategoryTagTypesOfVendor.length
        );

        // ۴. تغییر دسته‌بندی بیزینس
        await CategoryTagsInEditeBusinessApi.updateCategoryOfVendorRequest(
          authTokenAdmin,
          businessId,
          newCategory
        );

        const status3 = await CategoryTagsInEditeBusinessApi.getStatus();
        if (status3 !== 200) {
          try {
            const err400 = await CategoryTagsInEditeBusinessApi.getInvalidResponse400();
            console.error("❌ 400 Error details on updateCategory:", JSON.stringify(err400, null, 2));
          } catch {
            console.error("❌ updateCategory failed with status:", status3);
          }
        }
        expect(status3).toBe(200);

        const res3 =
          await CategoryTagsInEditeBusinessApi.getValidResponseForUpdateCategoryOfVendorRequest();
        expect(res3.msg).toEqual(msgSuccess2);

        console.log(
          `✅ Successfully verified that businessId ${businessId} category changed to ${newCategory}.`
        );

        // ۵. بررسی عدم وجود تگ در وندور بعد از تغییر دسته‌بندی
        await CategoryTagsInEditeBusinessApi.getCategoryTagsOfVendorRequest(authTokenAdmin, businessId);
        const res4 =
          await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsOfVendorRequest();

        expect(res4.data).toBeDefined();
        const listOfCategoryTagTypesOfVendor2 = res4.data.attributes.tags;

        expect(listOfCategoryTagTypesOfVendor2).toBeDefined();
        expect(listOfCategoryTagTypesOfVendor2.length).toEqual(0);

        console.log(
          `✅ Successfully verified that businessId ${businessId} has no tags. Number of tags:`,
          listOfCategoryTagTypesOfVendor2.length
        );
      } finally {
        // ۶. بازگرداندن دسته‌بندی به حالت اولیه
        await CategoryTagsInEditeBusinessApi.updateCategoryOfVendorRequest(
          authTokenAdmin,
          businessId,
          orgCategory
        );

        const status4 = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status4).toBe(200);

        const res5 =
          await CategoryTagsInEditeBusinessApi.getValidResponseForUpdateCategoryOfVendorRequest();
        expect([msgSuccess, msgSuccess2]).toContain(res5.msg);

        console.log(
          `✅ Successfully verified that businessId ${businessId} category changed back to ${orgCategory}.`
        );
      }
    });
  }
);
