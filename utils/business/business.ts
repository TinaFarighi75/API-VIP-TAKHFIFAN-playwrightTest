import { APIRequestContext, APIResponse } from "@playwright/test";
import type {
  OverThanLimit,
  InvalidResponse401,
  InvalidResponse403,
  InvalidResponse404,
  InvalidResponse400,
} from "../auth/auth-type";
import type { ValidSearchResponseToCheckNewMobileNumberOrNot } from "../business/business-type";

export class Business {
  private request: APIRequestContext;
  private baseUrl: string = "https://stgiran-vip.takhfifan.com/api/v1";
  private response?: APIResponse;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  //------------------SEARCH MOBILE NUMBER TO VALIDATE IS NEW OR NOT---------------------------

  async searchBusinessSearchMobileNumberIsNewOrNotRequest(
    token: string,
    page: number,
    sort: string,
    sortOrder: string,
    workflowState: string,
    name: string,
    categoryId: string,
    source: string,
    salesAgentId: string,
    nationalId: string,
    updatedAt: string,
    createdAt: string,
    digitalContractStatus: string,
    locationId: string,
    phone: string,
    userMobile: string,
    url?: string,
  ) {
    const finalUrl = url || `${this.baseUrl}/user_panel/business/search`;

    this.response = await this.request.get(finalUrl, {
      params: {
        page: page,
        "filters[sort]": sort,
        "filters[sort_order]": sortOrder,
        "filters[workflow_state]": workflowState,
        "filters[name]": name,
        "filters[categories.id]": categoryId,
        "filters[source]": source,
        "filters[sales_agent_id]": salesAgentId,
        "filters[national_id]": nationalId,
        "filters[updated_at]": updatedAt,
        "filters[created_at]": createdAt,
        "filters[digital_contract_status]": digitalContractStatus,
        "filters[location_id]": locationId,
        "filters[phone]": phone,
        "filters[user.mobile]": userMobile,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }


async getsearchBusinessSearchMobileNumberIsNewResponse(): Promise<ValidSearchResponseToCheckNewMobileNumberOrNot> {
  if (!this.response) {
    throw new Error("No response found. Call searchBusinessSearchMobileNumberIsNewOrNotRequest first.");
  }

  const responseJson = await this.response.json();

  return {
    current_page: responseJson.current_page,
    per_page: responseJson.per_page,
    total_entries: responseJson.total_entries,
    data: [],
  };
}

async getsearchBusinessSearchMobileNumberIsNotNewResponse(): Promise<ValidSearchResponseToCheckNewMobileNumberOrNot> {
  if (!this.response) {
    throw new Error("No response found. Call searchBusinessSearchMobileNumberIsNewOrNotRequest first.");
  }

  const responseJson = await this.response.json();

  return {
    current_page: responseJson.current_page,
    per_page: responseJson.per_page,
    total_entries: responseJson.total_entries,
    data: responseJson.data.map((item: any) => ({
      id: item.id,
      type: item.type,
      attributes: {
        photography_request: item.attributes.photography_request,
        v3_id: item.attributes.v3_id,
        updated_at: item.attributes.updated_at,
        digital_contract_trace_number: item.attributes.digital_contract_trace_number,
        digital_contract_status: item.attributes.digital_contract_status,
        business_line: item.attributes.business_line,
        core_digital_contract_status: item.attributes.core_digital_contract_status,
        core_digital_contract_sign_at: item.attributes.core_digital_contract_sign_at,
        name: item.attributes.name,
        source: item.attributes.source,
        created_at: item.attributes.created_at,
        workflow_state: item.attributes.workflow_state,
        available_states: item.attributes.available_states.map((state: any) => ({
          value: state.value,
          translate: state.translate,
        })),
        is_active: item.attributes.is_active,
        store_code: item.attributes.store_code,
        has_auto_cashout: item.attributes.has_auto_cashout,
        has_package: item.attributes.has_package,
        has_pos: item.attributes.has_pos,
        passed_step: item.attributes.passed_step,
        category_tags: item.attributes.category_tags,
        website: item.attributes.website,
        delino_id: item.attributes.delino_id,
        satrap_id: item.attributes.satrap_id,
        menu_url: item.attributes.menu_url,
        accepts_takhfifan_wallet: item.attributes.accepts_takhfifan_wallet,
        digital_contract_sign_at: item.attributes.digital_contract_sign_at,
        passed_step_v2: item.attributes.passed_step_v2,
        passed_step_offline_vendor: item.attributes.passed_step_offline_vendor,
        social_accounts: {
          website: item.attributes.social_accounts.website,
          instagram_id: item.attributes.social_accounts.instagram_id,
          instagram_link: item.attributes.social_accounts.instagram_link,
          telegram_id: item.attributes.social_accounts.telegram_id,
          telegram_link: item.attributes.social_accounts.telegram_link,
          whatsapp_number: item.attributes.social_accounts.whatsapp_number,
          whatsapp_link: item.attributes.social_accounts.whatsapp_link,
        },
        videos: item.attributes.videos,
        fida_code: item.attributes.fida_code,
        takhfifan_payment_digital_contract_trace_number:
          item.attributes.takhfifan_payment_digital_contract_trace_number,
        takhfifan_payment_digital_contract_status:
          item.attributes.takhfifan_payment_digital_contract_status,
        takhfifan_payment_digital_contract_sign_at:
          item.attributes.takhfifan_payment_digital_contract_sign_at,
        location: item.attributes.location,
        inspections: item.attributes.inspections,
        sales_agent: {
          id: item.attributes.sales_agent.id,
          name: item.attributes.sales_agent.name,
        },
        state_translation: item.attributes.state_translation,
        workflow_state_translate: item.attributes.workflow_state_translate,
        digital_contract_status_translate:
          item.attributes.digital_contract_status_translate,
        core_digital_contract_status_translate:
          item.attributes.core_digital_contract_status_translate,
        takhfifan_payment_digital_contract_status_translate:
          item.attributes.takhfifan_payment_digital_contract_status_translate,
        boosting_sales_agent: item.attributes.boosting_sales_agent
          ? {
              id: item.attributes.boosting_sales_agent.id,
              name: item.attributes.boosting_sales_agent.name,
            }
          : null,
        inspection_agent: item.attributes.inspection_agent,
        category: {
          id: item.attributes.category.id,
          name: item.attributes.category.name,
        },
        license_images: item.attributes.license_images,
        images: item.attributes.images,
        offline_contract_images: item.attributes.offline_contract_images,
        package_count: item.attributes.package_count,
        logo: item.attributes.logo,
        is_modified_by_merchant: item.attributes.is_modified_by_merchant,
        chain_store: item.attributes.chain_store,
        first_synced_date: item.attributes.first_synced_date,
      },
    })),
  };
}
  //------------------SEARCH VENDOR NAME  TO VALIDATE IS NEW OR NOT---------------------------
  async searchBusinessNameIsNewVendorOrNotRequest(
    token: string,
    page: number,
    sort: string,
    sortOrder: string,
    workflowState: string,
    name: string,
    categoryId: string,
    source: string,
    salesAgentId: string,
    nationalId: string,
    updatedAt: string,
    createdAt: string,
    digitalContractStatus: string,
    locationId: string,
    phone: string,
    userMobile: string,
    url?: string,
  ) {
    const finalUrl = url || `${this.baseUrl}/user_panel/business/search`;

    this.response = await this.request.get(finalUrl, {
      params: {
        page: page,
        "filters[sort]": sort,
        "filters[sort_order]": sortOrder,
        "filters[workflow_state]": workflowState,
        "filters[name]": name,
        "filters[categories.id]": categoryId,
        "filters[source]": source,
        "filters[sales_agent_id]": salesAgentId,
        "filters[national_id]": nationalId,
        "filters[updated_at]": updatedAt,
        "filters[created_at]": createdAt,
        "filters[digital_contract_status]": digitalContractStatus,
        "filters[location_id]": locationId,
        "filters[phone]": phone,
        "filters[user.mobile]": userMobile,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return this.response;
  }
async getsearchBusinessNameIsNewVendorResponse(): Promise<ValidSearchResponseToCheckNewMobileNumberOrNot> {
  if (!this.response) {
    throw new Error("No response found. Call searchBusinessSearchMobileNumberIsNewOrNotRequest first.");
  }

  const responseJson = await this.response.json();

  return {
    current_page: responseJson.current_page,
    per_page: responseJson.per_page,
    total_entries: responseJson.total_entries,
    data: [],
  };
}
async getsearchBusinessNameIsNotNewVendorResponse(): Promise<ValidSearchResponseToCheckNewMobileNumberOrNot> {
  if (!this.response) {
    throw new Error("No response found. Call searchBusinessSearchMobileNumberIsNewOrNotRequest first.");
  }

  const responseJson = await this.response.json();

  return {
    current_page: responseJson.current_page,
    per_page: responseJson.per_page,
    total_entries: responseJson.total_entries,
    data: responseJson.data.map((item: any) => ({
      id: item.id,
      type: item.type,
      attributes: {
        photography_request: item.attributes.photography_request,
        v3_id: item.attributes.v3_id,
        updated_at: item.attributes.updated_at,
        digital_contract_trace_number: item.attributes.digital_contract_trace_number,
        digital_contract_status: item.attributes.digital_contract_status,
        business_line: item.attributes.business_line,
        core_digital_contract_status: item.attributes.core_digital_contract_status,
        core_digital_contract_sign_at: item.attributes.core_digital_contract_sign_at,
        name: item.attributes.name,
        source: item.attributes.source,
        created_at: item.attributes.created_at,
        workflow_state: item.attributes.workflow_state,
        available_states: item.attributes.available_states.map((state: any) => ({
          value: state.value,
          translate: state.translate,
        })),
        is_active: item.attributes.is_active,
        store_code: item.attributes.store_code,
        has_auto_cashout: item.attributes.has_auto_cashout,
        has_package: item.attributes.has_package,
        has_pos: item.attributes.has_pos,
        passed_step: item.attributes.passed_step,
        category_tags: item.attributes.category_tags,
        website: item.attributes.website,
        delino_id: item.attributes.delino_id,
        satrap_id: item.attributes.satrap_id,
        menu_url: item.attributes.menu_url,
        accepts_takhfifan_wallet: item.attributes.accepts_takhfifan_wallet,
        digital_contract_sign_at: item.attributes.digital_contract_sign_at,
        passed_step_v2: item.attributes.passed_step_v2,
        passed_step_offline_vendor: item.attributes.passed_step_offline_vendor,
        social_accounts: {
          website: item.attributes.social_accounts.website,
          instagram_id: item.attributes.social_accounts.instagram_id,
          instagram_link: item.attributes.social_accounts.instagram_link,
          telegram_id: item.attributes.social_accounts.telegram_id,
          telegram_link: item.attributes.social_accounts.telegram_link,
          whatsapp_number: item.attributes.social_accounts.whatsapp_number,
          whatsapp_link: item.attributes.social_accounts.whatsapp_link,
        },
        videos: item.attributes.videos,
        fida_code: item.attributes.fida_code,
        takhfifan_payment_digital_contract_trace_number:
          item.attributes.takhfifan_payment_digital_contract_trace_number,
        takhfifan_payment_digital_contract_status:
          item.attributes.takhfifan_payment_digital_contract_status,
        takhfifan_payment_digital_contract_sign_at:
          item.attributes.takhfifan_payment_digital_contract_sign_at,
        location: item.attributes.location,
        inspections: item.attributes.inspections,
        sales_agent: {
          id: item.attributes.sales_agent.id,
          name: item.attributes.sales_agent.name,
        },
        state_translation: item.attributes.state_translation,
        workflow_state_translate: item.attributes.workflow_state_translate,
        digital_contract_status_translate:
          item.attributes.digital_contract_status_translate,
        core_digital_contract_status_translate:
          item.attributes.core_digital_contract_status_translate,
        takhfifan_payment_digital_contract_status_translate:
          item.attributes.takhfifan_payment_digital_contract_status_translate,
        boosting_sales_agent: item.attributes.boosting_sales_agent
          ? {
              id: item.attributes.boosting_sales_agent.id,
              name: item.attributes.boosting_sales_agent.name,
            }
          : null,
        inspection_agent: item.attributes.inspection_agent,
        category: {
          id: item.attributes.category.id,
          name: item.attributes.category.name,
        },
        license_images: item.attributes.license_images,
        images: item.attributes.images,
        offline_contract_images: item.attributes.offline_contract_images,
        package_count: item.attributes.package_count,
        logo: item.attributes.logo,
        is_modified_by_merchant: item.attributes.is_modified_by_merchant,
        chain_store: item.attributes.chain_store,
        first_synced_date: item.attributes.first_synced_date,
      },
    })),
  };
}
}
