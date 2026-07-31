import { APIRequestContext, APIResponse } from "@playwright/test";
import type { CategoryListResponse } from "../category/category-type";
import { BaseApi } from "../Base/base";

export class Category extends BaseApi{

  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api";
 


  async categoryRequest(token: string, url?: string): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/categories`;

    this.response = await this.request.get(finalUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode:false,
    });

    return this.response;
  }

  async getcategoryResponse(): Promise<CategoryListResponse> {
    if (!this.response) {
      throw new Error("No response found. Call categoryRequest first.");
    }

    const responseJson = await this.response.json();
    
  
    const data = (responseJson.data || []).map((item: any) => ({
      id: item.id,
      type: item.type,
      attributes: {
        v3_category_id: item.attributes?.v3_category_id,
        name: item.attributes?.name,
        commission: item.attributes?.commission,
        minimum_commission: item.attributes?.minimum_commission,
        profitability: item.attributes?.profitability,
        is_active: item.attributes?.is_active,
        listing_fee: item.attributes?.listing_fee,
        pos_min_commission: item.attributes?.pos_min_commission,
        pos_max_commission: item.attributes?.pos_max_commission,
        recommended_pos_commission: item.attributes?.recommended_pos_commission,
        business_line: item.attributes?.business_line,
        description: item.attributes?.description,
        default_cover_file: item.attributes?.default_cover_file,
        default_logo_file: item.attributes?.default_logo_file,
        default_cover_type: item.attributes?.default_cover_type,
        slug: item.attributes?.slug,
        level: item.attributes?.level,
        default_cover_file_url: item.attributes?.default_cover_file_url,
        default_logo_file_url: item.attributes?.default_logo_file_url,
        children: item.attributes?.children || [],
        parent: item.attributes?.parent ? {
          id: item.attributes.parent.id,
          name: item.attributes.parent.name,
          v3_category_id: item.attributes.parent.v3_category_id,
          commission: item.attributes.parent.commission,
        } : null 
      }
    }));

    return { data };
  }
}
