import { APIRequestContext, APIResponse } from "@playwright/test";
import type { TakhfifanPaymentResponse } from "./takhfifan_payment-type";
import { BaseApi } from "../Base/base";


export class TakhfifanPayment  extends BaseApi{

  private baseUrl = "https://stgiran-vip.takhfifan.com/api/v1";



  //------------------TAKHFIFAN PAYMENT---------------------------

  async takhfifanPaymentRequest(
    token: string,
    amount: number|string,
    business_id: number|string,
    url?: string


  ): Promise<APIResponse> {
    const finalUrl = url || `${this.baseUrl}/user_panel/takhfifan_payment`;

    this.response = await this.request.post(finalUrl, {
        data: {
            "amount": amount,
            "business_id": business_id
  
        },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }

  async getTakhfifanPaymentResponse(): Promise<TakhfifanPaymentResponse> {
    if (!this.response) {
      throw new Error("No response found. Call takhfifanPaymentRequest() first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
      id: responseJson.id,
    };
  }
}