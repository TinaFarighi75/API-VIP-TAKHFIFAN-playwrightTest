import { APIRequestContext, APIResponse } from "@playwright/test";

import type {
  OverThanLimit,
  InvalidResponse401,
  InvalidResponse403,
  InvalidResponse404,
  InvalidResponse400,
  // InvalidResponse500,
} from "./base.type";
//------------------GENERAL-------------------------
export class BaseApi {
  protected request: APIRequestContext;
  protected response?: APIResponse;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async getOverThanLimit(): Promise<OverThanLimit> {
    if (!this.response) {
      throw new Error("No response found. Call the request method first.");
    }

    const responseJson = await this.response.json();

    return {
       msg: responseJson.msg,
    };
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async getStatus(): Promise<number> {
    if (!this.response) {
      throw new Error("No response found. Call an API request method first.");
    }

    return this.response.status();
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async getInvalidResponse401(): Promise<InvalidResponse401> {
    if (!this.response) {
      throw new Error("No response found. Call an API request method first.");
    }

    const responseJson = await this.response.json();

    return {
      error: responseJson.error,
    };
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async getInvalidResponse403(): Promise<InvalidResponse403> {
    if (!this.response) {
      throw new Error("No response found. Call an API request method first.");
    }

    const responseJson = await this.response.json();

    return {
      error: responseJson.error,
      message: responseJson.message,
    };
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async getInvalidResponse404(): Promise<InvalidResponse404> {
    if (!this.response) {
      throw new Error("No response found. Call an API request method first.");
    }

    const responseJson = await this.response.json();

    return {
      message: responseJson.message,
    };
  }
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async getInvalidResponse400(): Promise<InvalidResponse400> {
    if (!this.response) {
      throw new Error("No response found. Call an API request method first.");
    }
    const responseJson = await this.response.json();

    return {
      msg: responseJson.msg,
    };
  }
}