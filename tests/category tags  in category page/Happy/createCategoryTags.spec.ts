import { test, expect } from "../../../utils/fixtures";

test("create category tags life cycle @smoke @create-category-tags @regression", async ({
  authTokenAdmin,
  categoryTagsApi,
}) => {
      const msgSuccessCreate="created successfully"
    const msgSucessDelete= "Deleted successfully"
  await categoryTagsApi.createTagTypeRequest(
    authTokenAdmin,
    547,
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

  await categoryTagsApi.getCategoryRequest(authTokenAdmin, 547);

  const statusCategory = await categoryTagsApi.getStatus();
  expect(statusCategory).toBe(200);

  const responseCategory = await categoryTagsApi.getValidCategoryResponse();

  expect(responseCategory.data.id).toEqual("547");
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

  // اطمینان از اینکه پیدا شده است
  expect(foundTagType).toBeDefined();
  const tagTypeId = foundTagType!.id; // آیدی مورد نظر را گرفتیم!
  console.log("Found ID to delete:", tagTypeId);

  await categoryTagsApi.deleteTagTypeRequest(authTokenAdmin, tagTypeId);

  const statusDelete = await categoryTagsApi.getStatus();
  expect(statusDelete).toBe(200);

  const responseDelete =
    await categoryTagsApi.getValidResponseForDeleteTagTypeRequest();

  expect(responseDelete.msg).toEqual(msgSucessDelete);
});
