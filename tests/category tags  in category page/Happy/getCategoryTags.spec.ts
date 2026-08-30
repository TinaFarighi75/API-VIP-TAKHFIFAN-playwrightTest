import { test, expect } from "../../../utils/fixtures";

test.describe("get category tags @smoke @get-category-tags @regression", async () => {
  test("get category tags with category id have category tags", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, 547);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();

    expect(responseCategory.data.id).toEqual("547");
    expect(
      responseCategory.data.attributes.category_tag_types.length,
    ).toBeGreaterThan(0);
  });
  test("get category tags with category id have no category tags ", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getCategoryRequest(authTokenAdmin, 548);

    const statusCategory = await categoryTagsApi.getStatus();
    expect(statusCategory).toBe(200);

    const responseCategory = await categoryTagsApi.getValidCategoryResponse();

    expect(responseCategory.data.id).toEqual("548");
    expect(responseCategory.data.attributes.category_tag_types.length).toEqual(
      0,
    );
  });
  test("get tags of category tags have tag", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, 547);
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
    await categoryTagsApi.getTagsOfCategoryRequest(authTokenAdmin, 548);
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
      { category_id: 547 },
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
      { category_id: 548 },
    );
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(200);
    const res =
      await categoryTagsApi.getValidResponseForGetTagsOfCategoryWithQueryParamRequest();
    expect(res.data.length).toEqual(0);
  });
});
