//utils/auth/auth.ts

import { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  ValidLoginResponse,
  ValidLogOutResponse,
  ValidLogInResponseViaOtp,
  ValidCheckOtp,
  ValidRegisterUser,
  // InvalidResponse500,
} from "./auth-type";
import { BaseApi } from "../Base/base";

export class Auth extends BaseApi {

  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api/v1";



  //------------------LOGIN---------------------------

  async loginRequest(email: string, password: string, url?: string) {
    const finalUrl = url || `${this.baseUrl}/user_panel/authentication/login`;

    this.response = await this.request.post(finalUrl, {
      data: {
        email: email,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
        
      },
      failOnStatusCode: false,
    });

    return this.response;
  }

  async getValidLoginResponselogin(): Promise<ValidLoginResponse> {
    if (!this.response) {
      throw new Error("No response found. Call loginRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      uuid: responseJson.uuid,
      token: responseJson.token,
      token_type: responseJson.token_type,
      token_type_translation: responseJson.token_type_translation,
      ip: responseJson.ip,
      agent: responseJson.agent,
      login_url: responseJson.login_url,
      renderer_token: responseJson.renderer_token,
      last_activity: responseJson.last_activity,
      expires_at: responseJson.expires_at,
      created_at: responseJson.created_at,
      user: {
        id: responseJson.user.id,
        email: responseJson.user.email,
        name: responseJson.user.name,
        role: responseJson.user.role,
        is_super_business: responseJson.user.is_super_business,
      },
      business: {
        id: responseJson.business.id,
        name: responseJson.business.name,
        v3_id: responseJson.business.v3_id,
      },
      sub_businesses: responseJson.sub_businesses.map((sub: any) => ({
        id: sub.id,
        name: sub.name,
        v3_id: sub.v3_id,
      })),
    };
  }

  //------------------LOGOUT---------------------------

  async logoutRequest(token: string, uuid: string, url?: string) {
    const finalUrl = url || `${this.baseUrl}/user_panel/user_session/logout`;
    this.response = await this.request.post(finalUrl, {
      data: {
        uuid: uuid,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
        failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidLogOutResponse(): Promise<ValidLogOutResponse> {
    if (!this.response) {
      throw new Error("No response found. Call logoutRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }

  //------------------LOGIN VIA OTP ---------------------------
  async loginRequestViaOtp(mobile: string, url?: string) {
    const finalUrl =
      url || `${this.baseUrl}/user_panel/authentication/login_via_otp`;

    this.response = await this.request.post(finalUrl, {
      data: { mobile: mobile },
      headers: {
        "Content-Type": "application/json",
      },
        failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidLogInResponseViaOtp(): Promise<ValidLogInResponseViaOtp> {
    if (!this.response) {
      throw new Error("No response found. Call loginRequest first.");
    }
    const responseJson = await this.response.json();
    return {
      otp_token: responseJson.otp_token,
    };
  }

  //------------------CHECK OTP---------------------------

  async loginCheckOtpRequest(otp_token: string, code: string, url?: string) {
    const finalUrl =
      url || `${this.baseUrl}/user_panel/authentication/check_otp`;

    this.response = await this.request.post(finalUrl, {
      data: {
        otp_token: otp_token,
        code: code,
      },
      headers: {
        "Content-Type": "application/json",
      },
        failOnStatusCode: false,
    });
    return this.response;
  }

  async getValidCheckOtp(): Promise<ValidCheckOtp> {
    if (!this.response) {
      throw new Error("No response found. Call checkOtpRequest first.");
    }

    const responseJson = await this.response.json();

    return {
      uuid: responseJson.uuid,
      token: responseJson.token,
      token_type: responseJson.token_type,
      token_type_translation: responseJson.token_type_translation,
      ip: responseJson.ip,
      agent: responseJson.agent,
      login_url: responseJson.login_url,
      renderer_token: responseJson.renderer_token,
      last_activity: responseJson.last_activity,
      expires_at: responseJson.expires_at,
      created_at: responseJson.created_at,
      user: {
        id: responseJson.user.id,
        email: responseJson.user.email,
        name: responseJson.user.name,
        role: responseJson.user.role,
        is_super_business: responseJson.user.is_super_business,
      },
      business: {
        id: responseJson.business.id,
        v3_id: responseJson.business.v3_id,
        name: responseJson.business.name,
      },
      sub_businesses: responseJson.sub_businesses,
    };
  }
  //------------------REGISTER---------------------------
  async loginRegisterUserRequest(
    mobile: string,
    name: string,
    setOtp: boolean,
    url?: string,
  ) {
    const finalUrl =
      url || `${this.baseUrl}/user_panel/auth/register_fresh_merchant`;
    this.response = await this.request.post(finalUrl, {
      data: {
        mobile: mobile,
        name: name,
        setOtp: setOtp,
      },
      headers: {
        "Content-Type": "application/json",
      },
        failOnStatusCode: false,
    });
    return this.response;
  }
  async getValidRegisterUser(): Promise<ValidRegisterUser> {
    if (!this.response) {
      throw new Error("No response found. Call the request method first.");
    }
    const responseJson = await this.response.json();
    return {
      otp_token: responseJson.otp_token,
    };
  }

}
