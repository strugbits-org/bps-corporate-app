import { fetchCollectionSp } from ".";
import queryDataItems from "./queryWixData";

export const listPortfolios = async ({ pageSize = 10, skip = 0, searchTerm = "", studios = [], markets = [], slug = null }) => {
    try {
        const data = {
            "dataCollectionId": "PortfolioCollection",
            "includeReferencedItems": ["portfolioRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "gallery", "media"],
            "returnTotalCount": true,
            "find": {},
            "contains": ['titleAndDescription', searchTerm],
            "eq": null,
            "limit": pageSize,
            "studios": studios,
            "markets": markets,
            "skip": skip,
            "ne": ["slug", slug],
            "filterProducts": true,
        }
        const response = await fetchCollectionSp(data);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const listProducts = async ({ pageSize = 10, searchTerm = "" }) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "locationFilteredVariant",
            "returnTotalCount": true,
            "includeReferencedItems": ["product"],
            "contains": ['search', searchTerm],
            "eq": [
                {
                    "key": "isF1Exclusive",
                    "value": false
                }
            ],
            "limit": pageSize
        });
        if (!response._items) {
            throw new Error("No products found");
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const searchAllPages = async ({ pageSize = 10, searchTerm = "" }) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "TextCollectionPages",
            "contains": ['content', searchTerm],
            "eq": [{
                "key": "showInSearch",
                "value": true
            }],
            "limit": pageSize
        });
        if (!response._items) {
            throw new Error("No data found for TextCollectionPages");
        }

        return response._items.map((x) => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}