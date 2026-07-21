//------------------LOCATIONS RESPONSE---------------------------


export type LocationsResponse = {
  locations: Array<{
    id: number;
    name: string;
    parent_id: number;
    type_location: string;
    v3_id: number;
    section: string | null;
    sort_order: number | null;
    path: string;
    slug: string;
    description: string | null;
    latitude: string;
    longitude: string;
    dms_latitude: string;
    dms_longitude: string;
    is_shown: boolean;
  }>;
};

