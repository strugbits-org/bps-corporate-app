import { fetchCollection } from "..";
import { listPortfolios } from "../listing";

export const getMarketSection = async (slug) => {
    try {
        const data = {
            "dataCollectionId": "MarketSection",
            "includeReferencedItems": ["howWeDoItSections"],
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": ["slug", slug],
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getMarketsPostPageSectionDetails = async () => {
    try {
        const data = {
            "dataCollectionId": "MarketsPostPageSectionDetails",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getMarketCollection = async () => {
    try {
        const data = {
            "dataCollectionId": "MarketSection",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const fetchPortfolio = async ({ pageSize = 4, id }) => {
    try {
        const options = {
            pageSize: pageSize,
            markets: [id],
        };

        const portfolio = await listPortfolios(options);
        return portfolio._items.map(item => item.data);
    } catch (error) {
        throw new Error(error.message);
    }
}
