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
    const pageLimit = 3;
    const baseFilters = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        { key: "hidden", value: true },
        { key: "isF1Exclusive", value: true },
      ],
      limit: pageLimit,
      sortOrder: "asc",
      sortKey: "title"
    };

    let items = [];

    const response = await queryDataItems({
      ...baseFilters,
      startsWith: [{ key: "title", value: term }]
    });

    const data = response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
    items = items.concat(data);
    if (items.length >= pageLimit) return items;

    const fetchProducts = async ({ searchKey, limit, excludeIds = [], searchPrefix = " ", correctionEnabled = false, searchType = "and" }) => {
      const response = await queryDataItems({
        ...baseFilters,
        search: [searchKey, term],
        limit,
        searchPrefix,
        ne: [...baseFilters.ne, ...excludeIds.map(id => ({ key: "product", value: id }))],
        correctionEnabled,
        searchType
      });
      return response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
    };

    // Define search strategies in order of preference
    const searchStrategies = [
      { searchKey: "title", searchPrefix: " ", correctionEnabled: false, searchType: "and" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: false, searchType: "and" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: false, searchType: "or" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: false, searchType: "or" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: true, searchType: "and" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: true, searchType: "and" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: true, searchType: "or" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: true, searchType: "or" },
      { searchKey: "search", searchPrefix: "", correctionEnabled: false, searchType: "and" },
      { searchKey: "search", searchPrefix: "", correctionEnabled: false, searchType: "or" }
    ];

    // Execute strategies in sequence until we have 3 items
    for (const strategy of searchStrategies) {
      if (items.length >= pageLimit) break;

      const excludeIds = items.map(({ product }) => product?._id);
      const newLimit = pageLimit - items.length;
      const newItems = await fetchProducts({
        ...strategy,
        limit: newLimit,
        excludeIds
      });

      items = items.concat(newItems);

      if (items.length >= pageLimit) break;
    }

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