import { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  ValidBusinessTagResponseEditeBusiness,
  ValidCategoryTagResponseEditeBusiness,
  ValidResponseReplaceTagEditeBusiness,
  ValidResponseUpdateCategoryOfVendorEditeBusiness,
} from "./categoryTagsInEditeBusiness-type";
import { BaseApi } from "../Base/base";

export class CategoryTagsInEditeBusiness extends BaseApi {
  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api";

  //------------------GET CATEGORY TAGS OF VENDOR--------------------------
  async getCategoryTagsOfVendorRequest(
    token: string,
    BUSINESS_ID: number | any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/business/${BUSINESS_ID}`;

    this.response = await this.request.get(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForGetCategoryTagsOfVendorRequest(): Promise<ValidBusinessTagResponseEditeBusiness> {
    if (!this.response) {
      throw new Error("No response found. Call getCategoryTagsOfVendorRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      data: responseJson.data,
    };
  }
  //------------------REPLACE CATEGORY TAG OF VENDOR--------------------------
  async replaceCategoryTagOfVendorRequest(
    token: string,
    BUSINESS_ID: number | any,
    category_tag_ids: number | any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/business/${BUSINESS_ID}/category_tag`;

    this.response = await this.request.put(finalUrl, {
      data: {
        category_tag_ids,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForReplaceCategoryTagOfVendorRequest(): Promise<ValidResponseReplaceTagEditeBusiness> {
    if (!this.response) {
      throw new Error("No response found. Call replaceCategoryTagOfVendorRequest first.");
    }

    const responseJson = await this.response.json();

    return {
        msg: responseJson.msg,
    };
  } 
  //------------------UPDATE CATEGORY OF VENDOR--------------------------
  async updateCategoryOfVendorRequest(
    token: string,
    BUSINESS_ID: number | any,
    category: string | any,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/business/${BUSINESS_ID}`;

    this.response = await this.request.put(finalUrl, {
      data: {
        category,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForUpdateCategoryOfVendorRequest(): Promise<ValidResponseUpdateCategoryOfVendorEditeBusiness> {
    if (!this.response) {
      throw new Error("No response found. Call updateCategoryOfVendorRequest first.");
    }

    const responseJson = await this.response.json();

    return {
        msg: responseJson.msg,
    };
  }
  //------------------GET CATEGORY TAGS--------------------------
  async getCategoryTagsRequest(
    token: string,
    categoryId: number | string,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/v1/user_panel/category/${categoryId}`;

    this.response = await this.request.get(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidResponseForGetCategoryTagsRequest(): Promise<ValidCategoryTagResponseEditeBusiness> {
    if (!this.response) {
      throw new Error("No response found. Call getCategoryTagsRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      data: responseJson.data,
    };
  }
}       