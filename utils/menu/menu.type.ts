
//------------------MENU RESPONSE---------------------------


export type MenuResponse = {
  data: Array<{
    id: string;
    type: "menu";
    attributes: {
      id: number;
      parent_id: number | null;
      title: string;
      url: string;
      icon: string;
      order: number;
      roles: Array<{
        id: number;
        name: string;
        created_at: string;
        updated_at: string;
      }>;
      is_core: boolean | null;
      is_tdc: boolean | null;
      is_offcb: boolean | null;
      children: Array<{
        id: string;
        type: "menu";
        attributes: {
          id: number;
          parent_id: number | null;
          title: string;
          url: string;
          icon: string;
          order: number;
          roles: Array<{
            id: number;
            name: string;
            created_at: string;
            updated_at: string;
          }>;
          is_core: boolean | null;
          is_tdc: boolean | null;
          is_offcb: boolean | null;
          children: unknown[];
        };
      }>;
    };
  }>;
};