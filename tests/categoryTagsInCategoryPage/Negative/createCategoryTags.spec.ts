import { test, expect } from "../../../utils/fixtures";

test.describe("validate create category tag negative senarios in category page @negative-create-category-tags-in-category-page @regresion",  () => {
  test("send request without token", async ({ authTokenAdmin, categoryTagsApi }) => {
    await categoryTagsApi.createTagTypeRequest(
      undefined,
      547,
      "tina",
      "tina en",
      [
        {
          name: "test tina 1",
          en_name: "test tina 1 en",
        },
        {
          name: "test tina 2",
          en_name: "test tina 2 en",
        },
      ],
    );

    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(401);
    const res = await categoryTagsApi.getInvalidResponse401();
    expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });

  test("send request with wrong category id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokenAdmin,"category_id","tina","tina en")
    
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(400); 
    const res =await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["شناسه دسته‌بندی نامعتبر است."])
  })
  test("send request with token who not acess",async({authTokeMerchant,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokeMerchant,547,"tina","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(403)
    const res = await categoryTagsApi.getInvalidResponse403()
    expect(res.error).toEqual(true)
    expect(res.message).toEqual("Forbidden")
  })
  test("send request without category-id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokenAdmin,undefined,"tina","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["شناسه دسته‌بندی الزامی است."])

  })
  test("send request without any value for category id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokenAdmin,"","tina","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["شناسه دسته‌بندی الزامی است."])
  })
  test("send request with non-existent category id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokenAdmin,51154545422125,"tina","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["دسته‌بندی مورد نظر یافت نشد."])
  })

  test("send request without any name",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(authTokenAdmin,547,undefined,"tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["نام تگ‌تایپ الزامی است."])

  })

  test("send request without any value for name",async({authTokenAdmin,categoryTagsApi})=>{
      await categoryTagsApi.createTagTypeRequest(authTokenAdmin,547,"","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
  expect(res.msg).toEqual(["نام تگ‌تایپ الزامی است."]);
  })
  test("send request with duplicate value for name",async({authTokenAdmin,categoryTagsApi})=>{
      await categoryTagsApi.createTagTypeRequest(authTokenAdmin,547,"فهد","tina en")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["نام تگ‌تایپ در این دسته‌بندی تکراری است."])

  })
  test("send request with duplicate value for en_name",async({authTokenAdmin,categoryTagsApi})=>{
      await categoryTagsApi.createTagTypeRequest(authTokenAdmin,547,"tinaB","فهد")
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual(["نام انگلیسی تگ‌تایپ در این دسته‌بندی تکراری است."])

  })
  test("send request without any name in category tags",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      547,
      "tina",
      "tina en",
      [
        {
          
          en_name: "test tina 1 en",
        }

      ],
    );
    const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
  expect(res.msg).toEqual([
    "Category tags name الزامی است.",
  ]);

  })
  test("send request without any  value for name in category tags",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      547,
      "tina",
      "tina en",
      [
        {
          name: "",
          en_name: "test tina 1 en",
        }

      ],
    );
        const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
   expect(res.msg).toEqual([
    "Category tags name الزامی است.",
  ]);

  })
  test("send request with dupicate name and en name in category tags",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.createTagTypeRequest(
      authTokenAdmin,
      547,
      "tina",
      "tina en",
      [
        {
          name: "test tina 1",
          en_name: "test tina 1 en",
        },
      {
          name: "test tina 1",
          en_name: "test tina 1 en",
        },

      ],
    );
        const status = await categoryTagsApi.getStatus()
    expect(status).toBe(400)
    const res = await categoryTagsApi.getInvalidResponse400()
    expect(res.msg).toEqual( [
        "نام تگ‌ها در یک تگ‌تایپ نباید تکراری باشد.",
        "نام انگلیسی تگ‌ها در یک تگ‌تایپ نباید تکراری باشد."
    ])

  })
});
