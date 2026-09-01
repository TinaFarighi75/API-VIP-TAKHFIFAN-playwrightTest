import { CategoryTags } from "../utils/category tags  in category page/categoryTags";

export type CategoryTagAttribute = {
  id?: number;
  name?: string;
  en_name?: string;
  _destroy?: boolean;
};

export async function createCategoryTag(
  categoryTagsApi: CategoryTags,
  token: string,
  categoryId: number,
  name: string,
  en_name?: string,
  category_tags_attributes?: CategoryTagAttribute[],
) {
  await categoryTagsApi.createTagTypeRequest(
    token,
    categoryId,
    name,
    en_name,
    category_tags_attributes,
  );

  const status = await categoryTagsApi.getStatus();
  if (status !== 200) {
    throw new Error(`createCategoryTag failed with status ${status}`);
  }

  const createResponse = await categoryTagsApi.getValidCreateTagTypeResponse();

  await categoryTagsApi.getCategoryRequest(token, categoryId);
  const categoryResponse = await categoryTagsApi.getValidCategoryResponse();
  const createdTagType =
    categoryResponse.data.attributes.category_tag_types.find(
      (item) =>
        item.name === name && (en_name ? item.en_name === en_name : true),
    );

  if (!createdTagType) {
    throw new Error(
      `Created category tag type "${name}" was not found on category ${categoryId}`,
    );
  }

  return {
    msg: createResponse.msg,
    tagType: createdTagType,
  };
}

export async function editCategoryTags(
  categoryTagsApi: CategoryTags,
  token: string,
  categoryId: number,
  name?: string,
  en_name?: string,
  category_tags_attributes?: CategoryTagAttribute[],
) {
  await categoryTagsApi.updateTagTypeRequest(
    token,
    categoryId,
    name,
    en_name,
    category_tags_attributes,
  );

  const status = await categoryTagsApi.getStatus();
  if (status !== 200) {
    throw new Error(`editCategoryTags failed with status ${status}`);
  }

  return categoryTagsApi.getValidResponseForUpdateTagTypeRequest();
}

export async function deleteCategoryTag(
  categoryTagsApi: CategoryTags,
  token: string,
  tagTypeId: number,
) {
  await categoryTagsApi.deleteTagTypeRequest(token, tagTypeId);

  const status = await categoryTagsApi.getStatus();
  if (status !== 200) {
    throw new Error(`deleteCategoryTag failed with status ${status}`);
  }

  return categoryTagsApi.getValidResponseForDeleteTagTypeRequest();
}

export async function getCategoryTags(
  categoryTagsApi: CategoryTags,
  token: string,
  categoryId: number,
) {
  await categoryTagsApi.getTagsOfCategoryRequest(token, categoryId);

  const status = await categoryTagsApi.getStatus();
  if (status !== 200) {
    throw new Error(`getCategoryTags failed with status ${status}`);
  }

  return categoryTagsApi.getValidResponseForGetTagsOfCategoryRequest();
}
