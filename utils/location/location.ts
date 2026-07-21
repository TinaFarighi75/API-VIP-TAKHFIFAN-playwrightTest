import { APIRequestContext, APIResponse } from "@playwright/test";
import type { LocationsResponse } from "../location/location-type";

export class Location {
  private request: APIRequestContext;
  private baseUrl = "https://stgiran-vip.takhfifan.com/api";
  private response?: APIResponse;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  //------------------PROVINCE---------------------------

  async locationProvinceRequest(
    token: string,
    province: string = "province",
    url?: string
  ): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/locations`;

    this.response = await this.request.get(finalUrl, {
      params: {
        type: province,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }

  async getLocationsProvinceResponse(): Promise<LocationsResponse> {
    if (!this.response) {
      throw new Error("No response found. Call locationProvinceRequest() first.");
    }

    const responseJson = await this.response.json();

    const locationsArray = Array.isArray(responseJson?.locations)
      ? responseJson.locations
      : [];

    return {
      locations: locationsArray.map((item: any) => ({
        id: item.id,
        name: item.name,
        parent_id: item.parent_id,
        type_location: item.type_location,
        v3_id: item.v3_id,
        section: item.section,
        sort_order: item.sort_order,
        path: item.path,
        slug: item.slug,
        description: item.description,
        latitude: item.latitude,
        longitude: item.longitude,
        dms_latitude: item.dms_latitude,
        dms_longitude: item.dms_longitude,
        is_shown: item.is_shown,
      })),
    };
  }
}
