import { test, expect } from "../../../utils/fixtures";
import { vendorTags } from "../../../test-data/vendor-tag-data";

test.describe("validate get tags of category in edite business page @regression @smoke @happy @get-tags-of-category-in-edite-business-page", () => {
    test("send request with valid token and category-id have tags", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
        const HaveTagCategoryId = vendorTags[0].categoryId;
        
        await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, HaveTagCategoryId);
        
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(200);

        const res = await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsRequest();
        expect(res.data).toBeDefined();

        const categoryTagTypes = res.data.attributes.category_tag_types;
        expect(categoryTagTypes).toBeDefined();
        expect(categoryTagTypes.length).toBeGreaterThan(0);

        console.log(`✅ Successfully verified that categoryId ${HaveTagCategoryId} has tags. Number of tag types:`, categoryTagTypes.length);    
    });
    test("send request with valid token and category-id have not tags", async ({ authTokenAdmin, CategoryTagsInEditeBusinessApi }) => {
        const NoTagCategoryId = vendorTags[5].categoryId;
        
        await CategoryTagsInEditeBusinessApi.getCategoryTagsRequest(authTokenAdmin, NoTagCategoryId);
        
        const status = await CategoryTagsInEditeBusinessApi.getStatus();
        expect(status).toBe(200);

        const res = await CategoryTagsInEditeBusinessApi.getValidResponseForGetCategoryTagsRequest();
        expect(res.data).toBeDefined();

        const categoryTagTypes = res.data.attributes.category_tag_types;
        expect(categoryTagTypes).toBeDefined();
        expect(categoryTagTypes.length).toBe(0);

        console.log(`✅ Successfully verified that categoryId ${NoTagCategoryId} has no tags. Number of tag types:`, categoryTagTypes.length);    
    }); 
});
