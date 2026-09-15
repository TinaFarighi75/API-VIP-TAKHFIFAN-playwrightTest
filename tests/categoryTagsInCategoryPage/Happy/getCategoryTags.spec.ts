import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";
test.describe("get category tags @smoke @get-category-tags-in-category-page @regression", async () => {
  const categoryId = vendorTags[0].categoryId;
  const categoryIdEmptyTag = vendorTags[2].categoryId;
  test("get category tags with category id have category tags", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryId);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();   

    // مقایسه بعد از نرمال‌سازی (Trim هر دو سمت)
    expect(String(responseCategory.data.id).trim()).toEqual(String(categoryId).trim());
  });
  test("get category tags with category id have no category tags ", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, categoryIdEmptyTag);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();

    expect(String(responseCategory.data.id).trim()).toEqual(String(categoryIdEmptyTag).trim());
    expect(responseCategory.data.attributes.category_tag_types.length).toEqual(
      0,
    );
  });
  test("get tags of category tags have tag", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, categoryId);
    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory =
      await categoryTagsApi.getValidResponseForGetTagsOfCategoryRequest();
    expect(responseCategory.data.length).toBeGreaterThan(0);
    
  });
  test("get tags of category tags not have tag", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, categoryIdEmptyTag);
    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory =
      await categoryTagsApi.getValidResponseForGetTagsOfCategoryRequest();
    expect(responseCategory.data.length).toEqual(0);

  });
  test("get tags of category with query params", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      authTokenAdmin,
      { category_id: categoryId },
    );
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(200);
    const res =
      await categoryTagsApi.getValidResponseForGetTagsOfCategoryWithQueryParamRequest();
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("get tags of category with query params not have tag", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getTagsOfCategoryWithQueryParamRequest(
      authTokenAdmin,
      { category_id: categoryIdEmptyTag },
    );
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(200);
    const res =
      await categoryTagsApi.getValidResponseForGetTagsOfCategoryWithQueryParamRequest();
    expect(res.data.length).toEqual(0);
  });
});
