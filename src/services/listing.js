import { fetchCollection, fetchCollectionSp } from ".";

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

export const listBlogs = async ({ pageSize = 10, skip = 0, searchTerm = "", studios = [], markets = [], slug = null }) => {

    try {
        const data = {
            "dataCollectionId": "BlogProductData",
            "includeReferencedItems": ["blogRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "author"],
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
        const data = {
            "dataCollectionId": "locationFilteredVariant",
            "includeReferencedItems": ["product"],
            "returnTotalCount": true,
            "find": {},
            "contains": ['search', searchTerm],
            "eq": ["isF1Exclusive", false],
            "limit": pageSize
        }
        const response = await fetchCollection(data);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const searchAllPages = async ({ pageSize = 10, searchTerm = "" }) => {
    try {
        const data = {
            "dataCollectionId": "TextCollectionPages",
            "includeReferencedItems": null,
            "returnTotalCount": true,
            "find": {},
            "contains": ['content', searchTerm],
            "eq": ["showInSearch", true],
            "limit": pageSize
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}