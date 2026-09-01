//------------------VALID BUSINESS TAG RESPONSE---------------------------

export type ValidBusinessTagResponseEditeBusiness = {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      address: string;
      phone: string;
      bank_account: string;
      created_at: string;
      updated_at: string;
      license_images: string[];
      delino_id: number | null;
      accepts_takhfifan_wallet: boolean | null;
      creator_id: number;
      source: string;
      is_key: boolean;
      is_lead: boolean;
      v3_id: number;
      given_name: string;
      digital_contract_sign_at: string | null;
      surname: string;
      national_id: string;
      bank_name: string | null;
      business_type: string;
      company_name: string | null;
      last_sync_error: string | null;
      registration_code: string | null;
      company_national_id: string | null;
      economic_code: string;
      sheba: string;
      business_line: string;
      note: string | null;
      bank_account_owner: string | null;
      latitude: string;
      longitude: string;
      postal_code: string | null;
      satrap_id: number | null;
      menu_url: string[];
      store_code: string;
      birth_certificate_number: string | null;
      workflow_state: string;
      location_id: number;
      description: string;
      core_digital_contract_trace_number: string | null;
      images: string[];
      business_hours: string;
      business_days: string;
      dynamic_attributes: {
        cheffoffer: string;
        accesstotransportation: string;
        ezafe: string;
        noservices: string;
        foodhighlights: string;
        notaxes: string;
        specialgift: string;
        takeaway: string;
        capacity: string;
        accesstoshoppingcenters: string;
        restaurant_facilities: string;
        restaurant_environment: string;
        smoling: string;
        restaurant_types: string;
        menu_variety: string;
        price_level: string;
        parking_spot: string;
      };
      sales_agent_id: number | null;
      platform: string | null;
      contract_images: string[];
      extra_phone: string[];
      photography_request: boolean;
      digital_contract_status: string;
      commission: string;
      business_timing: Array<{
        day: string;
        service_time: string;
      }>;
      is_core: boolean | null;
      is_tdc: boolean | null;
      website: string | null;
      is_offcb: boolean | null;
      is_valid_sheba: boolean | null;
      is_active: boolean;
      has_auto_cashout: boolean;
      digital_contract_trace_number: string | null;
      core_digital_contract_status: string;
      core_digital_contract_sign_at: string | null;
      has_package: boolean | null;
      has_pos: boolean;
      passed_step: string | number | null;
      passed_step_v2: string | number | null;
      passed_step_offline_vendor: string | number | null;
      category_tags: string[] | null;
      other_psp: unknown | null;
      social_accounts: {
        website: string | null;
        instagram_id: string | null;
        instagram_link: string | null;
        telegram_id: string | null;
        telegram_link: string | null;
        whatsapp_number: string | null;
        whatsapp_link: string | null;
      };
      wallets: Array<{
        is_active: boolean;
        wallet_name: string;
        wallet_name_fa: string;
        commission?: number;
        cashback_percent?: number;
        discount_percent?: number;
        settlement_period?: number;
      }>;
      show_core_report: boolean | null;
      show_offcb_report: boolean | null;
      videos: string[] | null;
      rating_override: number | null;
      takhfifan_payment_digital_contract_trace_number: string | null;
      takhfifan_payment_digital_contract_status: string;
      takhfifan_payment_digital_contract_sign_at: string | null;
      sheba_bank_name: string;
      fida_code: string | null;
      tags: Array<{
        id: number;
        name: string;
        en_name: string;
        category_tag_type_id: number;
        category_tag_type: {
          id: number;
          name: string;
          en_name: string;
        };
      }>;
      state_translation: string;
      inspection_agent: {
        id: number | null;
        email: string | null;
        name: string | null;
        mobile: string | null;
      };
      inspections: unknown[];
      user: {
        id: number;
        email: string;
        name: string;
        mobile: string;
        birthday: string | null;
        jwt_token: string;
      };
      available_states: Array<{
        value: string;
        translate: string;
      }>;
      category: {
        id: number;
        name: string;
        pos_min_commission: number;
        pos_max_commission: number;
      };
      location: {
        district: number;
        area: number;
        city: number;
        province: number;
        country: number;
        id: number;
      };
      location_name: {
        district: string;
        area: string;
        city: string;
        province: string;
        country: string;
      };
      offline_contract_images: string[];
      logo: string | null;
      digital_contract_status_translate: string;
      core_digital_contract_status_translate: string;
      takhfifan_payment_digital_contract_status_translate: string;
      boosting_sales_agent: {
        id: number;
        name: string;
      } | null;
      is_modified_by_merchant: boolean;
      chain_store: unknown | null;
      offline_cashback_poses: Array<{
        id: string;
        type: string;
        attributes: {
          bank_name: string;
          terminal_id: string;
          pos_id: string | null;
          commission_percentage: number;
          owner_name: string;
          name: string;
          owner_national_code: string | null;
          acceptor_code: string | null;
          father_name: string | null;
          birthday: string | null;
        };
      }>;
      menu: unknown | null;
      cash_register: {
        id: number;
        name: string;
        others_name: string | null;
      } | null;
    };
  };
};
//------------------VALID CATEGORY TAG RESPONSE---------------------------

export type ValidCategoryTagResponseEditeBusiness = {
  data: {
    id: string;
    type: string;
    attributes: {
      is_tdc: boolean | null;
      is_offcb: boolean | null;
      pos_max_commission: number | string | null;
      pos_min_commission: number | string | null;
      v3_category_id: number;
      name: string;
      commission: number;
      minimum_commission: number | null;
      profitability: number | null;
      is_active: boolean;
      listing_fee: number | null;
      recommended_pos_commission: number | string | null;
      business_line: string | null;
      default_cover_file: string | null;
      default_logo_file: string | null;
      default_cover_type: string | null;
      category_tag_types: Array<{
        id: number;
        name: string;
        en_name: string;
        category_tags: Array<{
          id: number;
          name: string;
          en_name: string;
        }>;
      }>;
    };
  };
};
//------------------VALID RESPONSE REPLACE TAG---------------------------

export type ValidResponseReplaceTagEditeBusiness = {
  msg: string;
};