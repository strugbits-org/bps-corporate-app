"use server"
import { logError } from "@/utils/utilityFunctions";
import queryDataItems from "./queryWixData";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const postForm = async (name, payload) => {
  try {
    const response = await fetch(`${base_url}/api/post-form/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.submission;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getPageMetaData = async (path) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PageSeoConfiguration",
      "eq": [
        {
          "key": "slug",
          "value": path
        }
      ]
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for PageSeoConfiguration");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllPagesMetaData = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PageSeoConfiguration"
    });
    if (!response._items) {
      throw new Error("No data found for PageSeoConfiguration");
    }
    return response._items.map((x) => x.data);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getChatConfiguration = async (origin) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "ChatbotConfiguration",
      "eq": [
        {
          "key": "origin",
          "value": origin,
        },
        {
          "key": "enable",
          "value": true,
        }
      ],
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for ChatbotConfiguration");
    }
    return response._items[0].data;
  } catch (error) {
    return {};
    // throw new Error(error.message);
  }
};
export const getChatTriggerEvents = async () => {
  try {
    const response = await queryDataItems({ "dataCollectionId": "ChatWidgetTrigger" });
    if (!response._items || !response._items) {
      throw new Error("No data found for ChatWidgetTrigger");
    }
    return response._items.map((x) => x.data);
  } catch (error) {
    logError("Error getting chat trigger events", error);
  }
};

export const listProducts = async (term) => {
  try {
    const baseFilters = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        { key: "hidden", value: true },
        { key: "isF1Exclusive", value: true },
      ],
      limit: 3,
    };

    const fetchProducts = async (searchKey, limit, excludeIds = [], searchPrefix = " ", correctionEnabled = null) => {
      const response = await queryDataItems({
        ...baseFilters,
        search: [searchKey, term],
        limit,
        searchPrefix,
        ne: [...baseFilters.ne, ...excludeIds.map(id => ({ key: "product", value: id }))],
        correctionEnabled
      });

      return response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
    };

    let items = await fetchProducts("title", 3);
    if (items.length === 3) return items;

    let excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("title", 3 - items.length, excludeIds, ""));
    if (items.length === 3) return items;

    excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("title", 3 - items.length, excludeIds, "", "correctionEnabled"));
    if (items.length === 3) return items;

    excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("search", 3 - items.length, excludeIds, ""));    
    return items;
  } catch (error) {
    throw new Error(error?.message || "An error occurred while fetching products");
  }
};

export const searchAllPages = async () => {
  try {
    const response = await queryDataItems({
      dataCollectionId: "SearchPages",
      eq: [
        {
          key: "showInSearch",
          value: true
        }
      ],
    });
    if (!response._items) {
      throw new Error("No data found for SearchPages");
    }

    return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
  } catch (error) {
    throw new Error(error.message);
  }
}