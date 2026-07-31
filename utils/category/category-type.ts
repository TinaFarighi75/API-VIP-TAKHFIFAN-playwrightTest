//------------------CATEGORY LIST---------------------------

export type CategoryListResponse = {
  data: Array<{
    id: string;
    type: "category";
    attributes: {
      v3_category_id: number;
      name: string;
      commission: number;
      minimum_commission: number | null;
      profitability: number | null;
      is_active: boolean;
      listing_fee: number | null;
      pos_min_commission: number |string;
      pos_max_commission: number|string;
      recommended_pos_commission: number|string;
      business_line: string | null;
      description: string;
      default_cover_file: string;
      default_logo_file: string;
      default_cover_type: string;
      slug: string;
      level: number;
      default_cover_file_url: string;
      default_logo_file_url: string;
      children: unknown | null; 
      parent: {
        id: number;
        name: string;
        v3_category_id: number;
        commission: number | null;
      };
    };
  }>;
};