//test-data/user-data.ts

export type TestUser = {
  id: number;
  username: string;
  password: string;
  name: string;
  role: string;
  email: string;
  mobile: string;
  passwordTest: string;
  businessId: number | null;
  vendorId: number | null;
  businessName: string | null;
};

export const users: TestUser[] = [
  {
    id: 1,
    username: "tinafarighi75@gmail.com",
    password: "654321",
    email: "tinafarighi75@gmail.com",
    name: "تینا فریقی",
    role: "admin",
    mobile: "09398063471",
    passwordTest: "11111",
    businessId: null,
    vendorId: null,
    businessName: null,
  },
  {
    id: 2,
    username: "tinafarighi@gmail.com",
    password: "654321",
    email: "tinafarighi@gmail.com",
    name: " تینا فریقی فیک",
    role: "admin",
    mobile: "09102363720",
    passwordTest: "11111",
    businessId: null,
    vendorId: null,
    businessName: null,
  },
  {
    id: 3,
    username: "61277@gmail.com",
    password: "123456",
    email: "61277@gmail.com",
    name: "تست اس تی جی - تهران- با عکس کاور و لوگو",
    role: "merchant",
    mobile: "09128356782",
    passwordTest: "11111",
    businessId: 100740,
    vendorId: 61277,
    businessName: "تست اس تی جی - تهران- با عکس کاور و لوگو تینا",
  },

  {
    id: 4,
    username: "sadeghahmadi@gmail.com",
    password: "654321",
    email: "sadeghahmadi@gmail.com",
    name: " صادق احمدی",
    role: "admin",
    mobile: "09398063483",
    passwordTest: "11111",
    businessId: null,
    vendorId: null,
    businessName: null,
  },
  {
    id: 5,
    username: "61306@gmail.com",
    password: "123456",
    email: "61306@gmail.com",
    name: "فرانت فرانت زاده ",
    role: "merchant",
    mobile: "09372692429",
    passwordTest: "11111",
    businessId: 100769,
    vendorId: 61306,
    businessName: "تریاکیانو",
  },
    {
    id: 6,
    username: "61306@gmail.com",
    password: "123456",
    email: "61306@gmail.com",
    name: "فرانت فرانت زاده ",
    role: "merchant",
    mobile: "09372692429",
    passwordTest: "11111",
    businessId: 100769,
    vendorId: 61306,
    businessName: "تریاکیانو",
  },
];
