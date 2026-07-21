import { test, expect } from "../../../utils/fixtures.js";

test("check category list @smoke @category @category-merchant @regression @vendor", async ({
  authApi,
  categoryApi,
  authTokenAdmin,
}) => {
  await categoryApi.categoryRequest(authTokenAdmin);
  const status = await authApi.getStatus();
  expect(status).toBe(200);

  const response = await categoryApi.getcategoryResponse();
  expect(response.data.length).toBeGreaterThan(0);

  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);

  for (const item of response.data) {
    expect(typeof item.id).toBe("string");
    expect(item.type).toBe("category");
    expect(item.attributes).toBeDefined();

    const attrs = item.attributes;

    expect(typeof attrs.name).toBe("string");
    expect(typeof attrs.v3_category_id).toBe("number");
    expect(typeof attrs.is_active).toBe("boolean");
    expect(typeof attrs.level).toBe("number");
    expect(attrs.level).toEqual(3);

   
    if (attrs.commission !== null) {
      expect(typeof attrs.commission).toBe("number");
    }

    if (attrs.parent !== null) {
      expect(attrs.parent).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        v3_category_id: expect.any(Number),
      });

      if (attrs.parent.commission !== null) {
        expect(typeof attrs.parent.commission).toBe("number");
      }
    }
  }

  const restaurantAndCoffeeShopCategory = response.data.find(
    (item) => item.id === "491",
  );
  expect(restaurantAndCoffeeShopCategory).toBeDefined();
  expect(restaurantAndCoffeeShopCategory.type).toBe("category");
  expect(restaurantAndCoffeeShopCategory.attributes.v3_category_id).toEqual(
    547,
  );
  expect(restaurantAndCoffeeShopCategory.attributes.name).toEqual(
    "رستوران و کافی شاپ ",
  );
  expect(restaurantAndCoffeeShopCategory.attributes.is_active).toBe(true);
  expect(restaurantAndCoffeeShopCategory.attributes.level).toEqual(3);
  expect(restaurantAndCoffeeShopCategory.attributes.commission).toEqual(20.0);
  expect(restaurantAndCoffeeShopCategory.attributes.minimum_commission).toBe(
    null,
  );
  expect(restaurantAndCoffeeShopCategory.attributes.profitability).toBe(null);
  expect(restaurantAndCoffeeShopCategory.attributes.listing_fee).toBe(null);
  expect(restaurantAndCoffeeShopCategory.attributes.pos_min_commission).toEqual(
    10,
  );
  expect(restaurantAndCoffeeShopCategory.attributes.pos_max_commission).toEqual(
    30,
  );
  expect(
    restaurantAndCoffeeShopCategory.attributes.recommended_pos_commission,
  ).toEqual(20);
  expect(restaurantAndCoffeeShopCategory.attributes.business_line).toBe(null);
  expect(restaurantAndCoffeeShopCategory.attributes.description).toContain(
    "کافی شاپ",
  );
  expect(
    restaurantAndCoffeeShopCategory.attributes.default_cover_file,
  ).toBeDefined();
  expect(
    restaurantAndCoffeeShopCategory.attributes.default_logo_file,
  ).toBeDefined();
  expect(
    restaurantAndCoffeeShopCategory.attributes.default_cover_type,
  ).toBeDefined();
  expect(restaurantAndCoffeeShopCategory.attributes.slug).toBe(
    "restaurants-cafes",
  );
  expect(
    restaurantAndCoffeeShopCategory.attributes.default_cover_file_url,
  ).toBeDefined();
  expect(
    restaurantAndCoffeeShopCategory.attributes.default_logo_file_url,
  ).toBeDefined();
  expect(restaurantAndCoffeeShopCategory.attributes.children).toEqual([]);
  expect(restaurantAndCoffeeShopCategory.attributes.parent).toMatchObject({
    id: 498,
    name: "newcategory",
    v3_category_id: 546,
    commission: null,
  });
});
