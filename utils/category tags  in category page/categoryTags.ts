import { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  ValidResponseCreateTagType,
  ValidResponseGetCategoryTagsType,
  ValidResponseGetTagsOfCategoryType,
  ValidResponseGetTagsOfCategoryWithQueryParamType,
  ValidResponseUpdateTagTypeAndTagsType,
  ValidResponseDeleteTagTypeType,
} from "./categoryTags-type";
import { BaseApi } from "../Base/base";

export class CategoryTags extends BaseApi {
  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api";

  //------------------CREATE TAG TYPE--------------------------

  async createTagTypeRequest(
    token: string,
    category_id: number|any,
    name: string,
    en_name?: string,
    category_tags_attributes?: any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/v1/user_panel/category_tag_type`;

    this.response = await this.request.post(finalUrl, {
      data: {
        category_id,
        name,
        en_name,
        category_tags_attributes,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidCreateTagTypeResponse(): Promise<ValidResponseCreateTagType> {
    if (!this.response) {
      throw new Error("No response found. Call createTagTypeRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }

  //------------------GET  CATEGORY TAGS--------------------------
  async getCategoryRequest(
    token: string,
    category_id: number | any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/category/${category_id}`;
    this.response = await this.request.get(finalUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }
  async getValidCategoryResponse(): Promise<ValidResponseGetCategoryTagsType> {
    if (!this.response) {
      throw new Error("No response found. Call getCategoryRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      data: {
        id: responseJson.data.id,
        type: responseJson.data.type,
        attributes: {
          is_tdc: responseJson.data.attributes.is_tdc,
          is_offcb: responseJson.data.attributes.is_offcb,
          pos_max_commission: responseJson.data.attributes.pos_max_commission,
          pos_min_commission: responseJson.data.attributes.pos_min_commission,
          v3_category_id: responseJson.data.attributes.v3_category_id,
          name: responseJson.data.attributes.name,
          commission: responseJson.data.attributes.commission,
          minimum_commission: responseJson.data.attributes.minimum_commission,
          profitability: responseJson.data.attributes.profitability,
          is_active: responseJson.data.attributes.is_active,
          listing_fee: responseJson.data.attributes.listing_fee,
          recommended_pos_commission:
            responseJson.data.attributes.recommended_pos_commission,
          business_line: responseJson.data.attributes.business_line,
          default_cover_file: responseJson.data.attributes.default_cover_file,
          default_logo_file: responseJson.data.attributes.default_logo_file,
          default_cover_type: responseJson.data.attributes.default_cover_type,
          category_tag_types: responseJson.data.attributes.category_tag_types,
        },
      },
    };
  }

  //------------------GET TAGS OF CATEGORY--------------------------
  async getTagsOfCategoryRequest(
    token: string,
    category_id: number|any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url ||
      `${this.baseUrl}/v1/user_panel/category/${category_id}/category_tag_type`;
    console.log("Calling URL:", finalUrl); 
    this.response = await this.request.get(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForGetTagsOfCategoryRequest(): Promise<ValidResponseGetTagsOfCategoryType> {
    if (!this.response) {
      throw new Error(
        "No response found. Call getTagsOfCategoryRequest first.",
      );
    }

    const responseJson = await this.response.json();

    return {
      data: responseJson.data.map((item: any) => ({
        id: item.id,
        type: item.type,
        attributes: {
          id: item.attributes.id,
          name: item.attributes.name,
          en_name: item.attributes.en_name,
          category_id: item.attributes.category_id,
          created_at: item.attributes.created_at,
          updated_at: item.attributes.updated_at,
          category_tags: item.attributes.category_tags,
        },
      })),
    };
  }

  //------------------GET TAGS OF CATEGORY WITH QUERY PARAM--------------------------
  async getTagsOfCategoryWithQueryParamRequest(
    token: string,
    queryParams: Record<string, any>,
    url?: string,
  ): Promise<APIResponse> {
    const params = new URLSearchParams(queryParams);
    const finalUrl =
      url ||
      `${this.baseUrl}/v1/user_panel/category_tag_type?${params.toString()}`;

    this.response = await this.request.get(finalUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForGetTagsOfCategoryWithQueryParamRequest(): Promise<ValidResponseGetTagsOfCategoryWithQueryParamType> {
    if (!this.response) {
      throw new Error(
        "No response found. Call getTagsOfCategoryWithQueryParamRequest first.",
      );
    }

    const responseJson = await this.response.json();

    return {
      data: responseJson.data.map((item: any) => ({
        id: item.id,
        type: item.type,
        attributes: {
          id: item.attributes.id,
          name: item.attributes.name,
          en_name: item.attributes.en_name,
          category_id: item.attributes.category_id,
          created_at: item.attributes.created_at,
          updated_at: item.attributes.updated_at,
          category_tags: item.attributes.category_tags,
        },
      })),
    };
  }

  //------------------UPDATE TAG TYPE AND TAGS--------------------------
  async updateTagTypeRequest(
    token: string,
    tag_type_id: number|any,
    name?: string,
    en_name?: string,
    category_tags_attributes?: any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/category_tag_type/${tag_type_id}`;

    this.response = await this.request.put(finalUrl, {
      data: {
        name,
        en_name,
        category_tags_attributes,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });

    if (!this.response.ok()) {
      console.error(
        `Update category tag type failed (${this.response.status()}): ${await this.response.text()}`,
      );
    }

    return this.response;
  }

  async getValidResponseForUpdateTagTypeRequest(): Promise<ValidResponseUpdateTagTypeAndTagsType> {
    if (!this.response) {
      throw new Error("No response found. Call updateTagTypeRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }

  //------------------DELETE TAG TYPE--------------------------
  async deleteTagTypeRequest(
    token: string,
    tag_type_id: number|any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/category_tag_type/${tag_type_id}`;

    this.response = await this.request.delete(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForDeleteTagTypeRequest(): Promise<ValidResponseDeleteTagTypeType> {
    if (!this.response) {
      throw new Error("No response found. Call deleteTagTypeRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
