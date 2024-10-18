import queryDataItems, { queryBlogsTags } from "../queryWixData";

export const getAllBlogs = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "BlogProductData",
      "includeReferencedItems": ["blogRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "gallery", "media", "author"],
      "limit": "infinite",
      "ne": [
        {
          "key": "isHidden",
          "value": true
        },
      ],
    });
    if (!response._items) {
      throw new Error("No data found for BlogProductData");
    }
    return response._items.filter(item => item.data.blogRef._id !== undefined).map(item => item.data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBlogSectionDetails = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "BlogSectionDetails"
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for BlogSectionDetails");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBlogProductData = async ({ slug }) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "BlogProductData",
      "includeReferencedItems": ["blogRef", "author", "tags", "locationFilteredVariant", "storeProducts", "studios", "gallery", "media", "markets"],
      "eq": [{
        "key": "slug",
        "value": slug
      }],
      "ne": [
        {
          "key": "isHidden",
          "value": true
        },
      ],
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for BlogProductData");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBlogPostData = async (slug) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "BlogProductData",
      "includeReferencedItems": ["blogRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "gallery", "media"],
      "limit": 4,
      "ne": [
        {
          "key": "slug",
          "value": slug
        },
        {
          "key": "isHidden",
          "value": true
        },
      ]
    })
    const data = response._items
      .filter((item) => item.data.blogRef._id !== undefined)
      .map((item) => item.data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBlogTags = async (ids) => {
  try {
    const response = await queryBlogsTags(ids);
    if (!response._items) {
      throw new Error("No Tags found");
    }
    return response._items;
  } catch (error) {
    throw new Error(error.message);
  }
};
