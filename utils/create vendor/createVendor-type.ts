// utils/create vendor/createVendor-type.ts

//------------------SEARCH MOBILE NUMBER TO VALIDATE IS NEW OR NOT---------------------------

export type ValidSearchResponseToCheckNewMobileNumberOrNot = {
  current_page: number;
  per_page: number;
  total_entries: number;
  data: Array<{
    id: string;
    type: string;
    attributes: {
      photography_request: boolean;
      v3_id: number;
      updated_at: string;
      digital_contract_trace_number: string | null;
      digital_contract_status: string;
      business_line: string;
      core_digital_contract_status: string;
      core_digital_contract_sign_at: string | null;
      name: string;
      source: string;
      created_at: string;
      workflow_state: string;
      available_states: Array<{
        value: string;
        translate: string;
      }>;
      is_active: boolean | null;
      store_code: string;
      has_auto_cashout: boolean;
      has_package: boolean;
      has_pos: boolean;
      passed_step: string | number | null;
      category_tags: string[] | null;
      website: string | null;
      delino_id: number | null;
      satrap_id: number | null;
      menu_url: string[];
      accepts_takhfifan_wallet: boolean | null;
      digital_contract_sign_at: string | null;
      passed_step_v2: string | number | null;
      passed_step_offline_vendor: string | number | null;
      social_accounts: {
        website: string | null;
        instagram_id: string | null;
        instagram_link: string | null;
        telegram_id: string | null;
        telegram_link: string | null;
        whatsapp_number: string | null;
        whatsapp_link: string | null;
      };
      videos: string[] | null;
      fida_code: string | null;
      takhfifan_payment_digital_contract_trace_number: string | null;
      takhfifan_payment_digital_contract_status: string;
      takhfifan_payment_digital_contract_sign_at: string | null;
      location: string;
      inspections: unknown[];
      sales_agent: {
        id: number | null;
        name: string | null;
      };
      state_translation: string;
      workflow_state_translate: string;
      digital_contract_status_translate: string;
      core_digital_contract_status_translate: string;
      takhfifan_payment_digital_contract_status_translate: string;
      boosting_sales_agent: {
        id: number;
        name: string;
      } | null;
      inspection_agent: unknown | null;
      category: {
        id: number;
        name: string;
      };
      license_images: string[];
      images: string[];
      offline_contract_images: string[];
      package_count: number | null;
      logo: string | null;
      is_modified_by_merchant: boolean;
      chain_store: unknown | null;
      first_synced_date: string;
    };
  }>;
};
