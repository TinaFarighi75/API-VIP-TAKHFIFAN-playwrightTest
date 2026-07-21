//------------------LOCATIONS RESPONSE---------------------------


export type LocationsResponse = {
  locations: Array<{
    id: number;
    name: string;
    parent_id: number;
    type_location: string;
    v3_id: number | null;
    section: string | null;
    sort_order: number | null;
    path: string;
    slug: string | null;
    description: string | null;
    latitude: string | null;
    longitude: string | null;
    dms_latitude: string | null;
    dms_longitude: string | null;
    is_shown: boolean;
  }>;
};

