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


export const deleteTagTypeWithCleanup = async (
  api: CategoryTags,
  token: string,
  tag_type_id: number,
) => {
  // مرحله ۱: واکشی تگ‌های فرزند
  await api.getTagsOfCategoryWithQueryParamRequest(token, {
    id: tag_type_id,
  });

  const getStatus = await api.getStatus();

  if (getStatus === 200) {
    const json: any = await api.getValidResponseForGetTagsOfCategoryRequest();

    const tagTypeItem = json.data?.find(
      (item: any) => String(item.id) === String(tag_type_id),
    );

    const existingTags: any[] = tagTypeItem?.attributes?.category_tags ?? [];

    if (existingTags.length > 0) {
      // مرحله ۲: حذف تگ‌ها با PUT
      await api.updateTagTypeRequest(
        token,
        tag_type_id,
        undefined,
        undefined,
        existingTags.map((tag: any) => ({
          id: tag.id,
          _destroy: true,
        })),
      );

      const putStatus = await api.getStatus();
      if (putStatus !== 200) {
        throw new Error(`Cleanup PUT failed with status ${putStatus}`);
      }
    }
  }

  // مرحله ۳: حذف تگ‌تایپ
  await api.deleteTagTypeRequest(token, tag_type_id);

  const status = await api.getStatus();
  if (status !== 200) {
    throw new Error(`deleteTagTypeWithCleanup failed with status ${status}`);
  }

  return api.getValidResponseForDeleteTagTypeRequest();
};

