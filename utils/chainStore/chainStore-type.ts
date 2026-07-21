
//------------------CHAIN STORE---------------------------


export type ChainStoreResponse = {
  data: Array<{
    id: string;
    type: "chain_store";
    attributes: {
      id: number;
      name: string;
      en_name: string | null;
      v3_id: number | null;
      is_active: boolean | null;
      category_id: number | null;
      description: string | null;
      wallets: Array<{
        wallet_name: string;
        wallet_name_fa: string;
        is_active: boolean;
      }>;
      logos: string[];
      images: string[];
    };
  }>;
};
