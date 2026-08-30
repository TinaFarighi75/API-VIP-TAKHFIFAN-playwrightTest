//------------------CREATE TAG TYPE--------------------------

export type ValidResponseCreateTagType = {
    msg: string;
};

//------------------GET CATEGORY TYPE--------------------------
export type ValidResponseGetCategoryTagsType = {
    data: {
        id: string;
        type: string;
        attributes: {
            is_tdc: boolean | null;
            is_offcb: boolean | null;
            pos_max_commission: number | null;
            pos_min_commission: number | null;
            v3_category_id: number;
            name: string;
            commission: number;
            minimum_commission: number | null;
            profitability: number | null;
            is_active: boolean;
            listing_fee: number | null;
            recommended_pos_commission: number | null;
            business_line: string | null;
            default_cover_file: string | null;
            default_logo_file: string | null;
            default_cover_type: string | null;
            category_tag_types: {
                id: number;
                name: string;
                en_name: string;
                category_tags: {
                    id: number;
                    name: string;
                    en_name: string;
                }[];
            }[];
        };
    };
};
//------------------GET TAGS OF CATEGORY/GET TAGS OF CATEGORY WITHOUT ANY TAGS--------------------------
export type ValidResponseGetTagsOfCategoryType = {
    data: {
        id: string;
        type: string;
        attributes: {
            id: number;
            name: string;
            en_name: string;
            category_id: number;
            created_at: string;
            updated_at: string;
            category_tags: {
                id: number;
                name: string;
                en_name: string;
            }[];
        };
    }[];
};
//-----------------Get Tags Of Category With QueryParam Type--------------------------
export type ValidResponseGetTagsOfCategoryWithQueryParamType = {
    data: {
        id: string;
        type: string;
        attributes: {
            id: number;
            name: string;
            en_name: string;
            category_id: number;
            created_at: string;
            updated_at: string;
            category_tags: {
                id: number;
                name: string;
                en_name: string;
            }[];
        };
    }[];
};
//------------------UPDATE TAG TYPE AND TAGS--------------------------
export type ValidResponseUpdateTagTypeAndTagsType = {
    msg: string;
};
//------------------DELETE TAG TYPE--------------------------
export type ValidResponseDeleteTagTypeType = {
    msg: string;
};
