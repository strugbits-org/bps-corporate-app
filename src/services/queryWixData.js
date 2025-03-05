import { createWixClient } from "@/utils/createWixClient";
import { deletePriceFields, logError } from "@/utils/utilityFunctions";
import Fuse from 'fuse.js'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryAsyncOperation(operation, retries = 3, delayMs = 1000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await operation();
    } catch (error) {
      logError(`Error fetching query data items: Attempt ${attempt} failed: ${error}`);
      attempt++;
      if (attempt < retries) {
        logError(`Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        logError(`Attempt ${attempt} failed. No more retries left.`);
        throw error;
      }
    }
  }
}

const correctSearchTerm = async (searchTerm, keywords) => {
  const fuse = new Fuse(keywords, { threshold: 0.4 });
  const result = fuse.search(searchTerm);
  return result.length ? result[0].item : searchTerm;
};

const queryDataItems = async (payload) => {
  try {
    const {
      dataCollectionId,
      includeReferencedItems,
      returnTotalCount,
      contains,
      limit,
      eq,
      ne,
      hasSome,
      skip,
      search,
      searchPrefix,
      correctionEnabled,
      startsWith,
      searchType,
      sortOrder,
      sortKey,
      log
    } = payload;

    // Create Wix client
    const client = await createWixClient();

    // Set up query options
    let dataQuery = client.items.queryDataItems({
      dataCollectionId,
      includeReferencedItems,
      returnTotalCount: returnTotalCount || limit === "infinite",
    });

    // Apply filters
    if (contains?.length === 2) dataQuery = dataQuery.contains(contains[0], contains[1]);
    if (eq && eq.length > 0) eq.forEach(filter => dataQuery = dataQuery.eq(filter.key, filter.value));
    if (hasSome && hasSome.length > 0) hasSome.forEach(filter => dataQuery = dataQuery.hasSome(filter.key, filter.values));
    if (startsWith && startsWith.length > 0) startsWith.forEach(filter => dataQuery = dataQuery.startsWith(filter.key, filter.value));
    if (skip) dataQuery = dataQuery.skip(skip);
    if (limit && limit !== "infinite") dataQuery = dataQuery.limit(limit);
    if (ne && ne.length > 0) ne.forEach(filter => dataQuery = dataQuery.ne(filter.key, filter.value));
    if (sortKey) dataQuery = sortOrder === "asc" ? dataQuery.ascending(sortKey) : sortOrder === "desc" ? dataQuery.descending(sortKey) : dataQuery.ascending(sortKey);

    if (search?.length === 2) {
      let words = search[1].split(/\s+/).filter(Boolean);
      if (correctionEnabled) {
        const productKeywordsData = await queryDataItems({ "dataCollectionId": "ProductKeywords" });
        const productKeywords = productKeywordsData._items[0]?.data?.keywords || [];
        words = await Promise.all(words.map(word => correctSearchTerm(word, productKeywords)));
      }
      let newQuery = words.slice(1).reduce((query, word) =>
        query.contains(search[0], searchPrefix ? searchPrefix + word : word || ""),
        dataQuery
      );

      dataQuery = dataQuery.contains(search[0], searchPrefix ? searchPrefix + words[0] : words[0] || "");
      if (words.length > 1) {
        dataQuery = searchType === "or" ? dataQuery.or(newQuery) : dataQuery.and(newQuery);
      }      
    };
    // if (search?.length === 2) {
    //   let words = search[1].split(/\s+/).filter(Boolean);
    //   if (correctionEnabled) {
    //     const productKeywordsData = await queryDataItems({ "dataCollectionId": "ProductKeywords" });
    //     const productKeywords = productKeywordsData._items[0]?.data?.keywords || [];
    //     words = await Promise.all(words.map(word => correctSearchTerm(word, productKeywords)));
    //   }
    //   dataQuery = dataQuery.contains(search[0], searchPrefix ? searchPrefix + words[0] : words[0] || "");
    //   for (let i = 1; i < words.length; i++) {
    //     dataQuery = dataQuery.and(dataQuery.contains(search[0], searchPrefix ? searchPrefix + words[i] : words[i] || ""));
    //   }
    // };

    // Increase limit if "infinite"
    if (limit === "infinite") {
      dataQuery = dataQuery.limit(50);
    }

    // Fetch data with retries
    let data = await retryAsyncOperation(() => dataQuery.find());

    // Handle "infinite" limit scenario
    if (limit === "infinite") {
      let items = data._items;
      while (items.length < data._totalCount) {
        data = await retryAsyncOperation(() => data._fetchNextPage());
        items = [...items, ...data._items];
      }
      data._items = items;
    }

    const collectionsToEncrypt = ["locationFilteredVariant", "BlogProductData", "PortfolioCollection"];
    if (data._items.length && collectionsToEncrypt.includes(dataCollectionId)) {
      data._items = data._items.map(val => {
        if (dataCollectionId === "locationFilteredVariant" && val.data.variantData) {
          val.data.variantData = val.data.variantData.map(val2 => {
            deletePriceFields(val2.variant);
            return val2;
          });
        }

        if ((dataCollectionId === "BlogProductData" || dataCollectionId === "PortfolioCollection") && val.data?.storeProducts?.length) {
          val.data.storeProducts = val.data?.storeProducts.map(val2 => {
            deletePriceFields(val2);
            return val2;
          });
        }

        deletePriceFields(val.data.product);
        return val;
      });
    }

    return data;

  } catch (error) {
    logError("Error in queryDataItems:", payload.dataCollectionId, error);
    return { error: error.message, status: 500 };
  }
};

export const queryBlogsTags = async (ids) => {
  try {
    const client = await createWixClient();
    const data = await client.tags.queryTags().hasSome("_id", ids).find();
    return data;
  } catch (error) {
    logError("Error in queryBlogsTags:", payload.dataCollectionId, error);
    return { error: error.message, status: 500 };
  }
};

export default queryDataItems;