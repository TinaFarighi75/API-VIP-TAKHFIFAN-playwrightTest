import { test, expect } from "../../../utils/fixtures";

test.describe("validate update service for category tags in category page @regression @smoke @negative @negative-update-category-tag-in-category-page", () => {
  test("send request without any token", async ({
    authTokenAdmin,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.updateTagTypeRequest(undefined, 21, "tin", "tin en", [
      {
        name: "tin1",
        en_name: "tin1 en",
      },
      {
        name: "tin2",
        en_name: "tin2 en",
      },
    ]);
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(401);
    const res = await categoryTagsApi.getInvalidResponse401();
    expect(res.error).toEqual("پیش از ادامه باید وارد شوید یا ثبت نام کنید.");
  });

  test("send request with token who not access", async ({
    authTokeMerchant,
    categoryTagsApi,
  }) => {
    await categoryTagsApi.updateTagTypeRequest(
      authTokeMerchant,
      21,
      "tin",
      "tin en",
      [
        {
          name: "tin1",
          en_name: "tin1 en",
        },
        {
          name: "tin2",
          en_name: "tin2 en",
        },
      ],
    );
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(403);
    const res = await categoryTagsApi.getInvalidResponse403();
    expect(res.error).toEqual(true);
    expect(res.message).toEqual("Forbidden");
  });
  test("send request with not valid tag type id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.updateTagTypeRequest(authTokenAdmin,
      "tagtype",
      "tin",
      "tin en",
      [
        {
          name: "tin1",
          en_name: "tin1 en",
        },
        {
          name: "tin2",
          en_name: "tin2 en",
        },
      ],
    )
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(404);
    const res = await categoryTagsApi.getInvalidResponse404();
    expect(res.message).toEqual("Couldn't find CategoryTagType with 'id'=tagtype")
});

test("send request with not existing tag type id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.updateTagTypeRequest(authTokenAdmin,
      1215145151,
      "tin",
      "tin en",
      [
        {
          name: "tin1",
          en_name: "tin1 en",
        },
        {
          name: "tin2",
          en_name: "tin2 en",
        },
      ],
    )
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(404);
    const res = await categoryTagsApi.getInvalidResponse404();
    expect(res.message).toEqual("Couldn't find CategoryTagType with 'id'=1215145151")
})
test("send request with category tag type not exist in tag type id",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.updateTagTypeRequest(authTokenAdmin,
      15,
      "tin",
      "tin en",
      [
        {
          id:2426666666,
          name: "tin1v",
        },
        {
          name: "tin2v",
          en_name: "tin2v en",
        },
      ],
    )
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(400);
    const res = await categoryTagsApi.getInvalidResponse400();
    expect(res.msg).toEqual(["شناسه تگ برای این تگ‌تایپ یافت نشد."])

})
test("send request without any name for category tags and en name is dupicate in category",async({authTokenAdmin,categoryTagsApi})=>{
    await categoryTagsApi.updateTagTypeRequest(authTokenAdmin,
      15,
      "",
      "food-style",
      [
        {
          id:16,
          name: "",
        },
        {
          name: "fusion",
        },
      ],
    )
    const status = await categoryTagsApi.getStatus();
    expect(status).toBe(400);
    const res = await categoryTagsApi.getInvalidResponse400();
    expect(res.msg).toEqual([
       "Category tags name الزامی است.",
             "نام تگ‌تایپ الزامی است.",
          "نام انگلیسی تگ‌تایپ در این دسته‌بندی تکراری است.",
    ])
})
});