//test-data/vendor-tag-data.ts

export type TestVendorTag = {
  id: number;
  vendorName: string;
  businessId: number;
  vendorId: number | null;
  mobile: string;
  categoryId: number;
  magentoCategoryId: number;
  categoryName: string;
};

export const vendorTags: TestVendorTag[] = [
  {
    id: 0,
    vendorName: "تست اتومات دست نزنید۱",
    businessId: 100807,
    vendorId: null,
    mobile: "09102383956",
    categoryId: 1438,
    magentoCategoryId: 1549,
    categoryName: "گل",
  },
  {
    id: 1,
    vendorName: "تست اتومات دست نزنید۲",
    businessId: 100808,
    vendorId: null,
    mobile: "09128356789",
    categoryId: 1456,
    magentoCategoryId: 1544,
    categoryName: "تست تست",
  },
  {
    id: 2,
    vendorName: "تست اتومات دست نزنید۳",
    businessId: 100809,
    vendorId: null,
    mobile: "09138356789",
    categoryId: 1439,
    magentoCategoryId: 1546,
    categoryName: "jj",
  },
  {
    id: 3,
    vendorName: "تست اتومات دست نزنید۴",
    businessId: 100810,
    vendorId: null,
    mobile: "09148356789",
    categoryId: 1452,
    magentoCategoryId: 1540,
    categoryName: "تست مجید",
  },
  {
    id: 4,
    vendorName: "تست اتومات دست نزنید۵",
    businessId: 100811,
    vendorId: null,
    mobile: "09158356789",
    categoryId: 1462,
    magentoCategoryId: 1551,
    categoryName: "جدیدترین دسته بندی جدید",
  },
  {
    id: 5,
    vendorName: "تست اتومات دست نزنید۶",
    businessId: 100812,
    vendorId: null,
    mobile: "09168356789",
    categoryId: 1460,
    magentoCategoryId: 1548,
    categoryName: "مد و پوشاک سماء",
  },
];
