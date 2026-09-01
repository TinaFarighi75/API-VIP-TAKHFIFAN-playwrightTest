import { APIResponse } from "@playwright/test";
import { BaseApi } from "../Base/base";
import type { ValidResponseUpdateBusinessCategoryType } from "./vendorCategory-type";

export class BusinessCategory extends BaseApi {
  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api";

  //------------------آپدیت دسته‌بندی وندور--------------------------
  async updateBusinessCategoryRequest(
    token: string,
    businessId: number | string,
    category: number | string,
    url?: string,
  ): Promise<APIResponse> {
    const finalUrl =
      url || `${this.baseUrl}/v1/user_panel/business/${businessId}`;

    this.response = await this.request.put(finalUrl, {
      data: {
        category: String(category),
      },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode: false,
    });

    return this.response;
  }

  async getValidResponseForUpdateBusinessCategory(): Promise<ValidResponseUpdateBusinessCategoryType> {
    if (!this.response) {
      throw new Error(
        "No response found. Call updateBusinessCategoryRequest first.",
      );
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}
