import { createWixClient } from "@/utils/CreateWixClient";
import { logError } from "@/utils/utilityFunctions";

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
        console.log(`Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        logError(`Attempt ${attempt} failed. No more retries left.`);
        throw error;
      }
    }
  }
}

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
    if (skip) dataQuery = dataQuery.skip(skip);
    if (limit && limit !== "infinite") dataQuery = dataQuery.limit(limit);
    if (ne && ne.length > 0) ne.forEach(filter => dataQuery = dataQuery.ne(filter.key, filter.value));

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

    return data;

  } catch (error) {
    logError("Error in queryDataItems:", payload.dataCollectionId, error);
    return { error: error.message, status: 500 };
  }
};

export default queryDataItems;