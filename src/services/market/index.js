import { listPortfolios } from "../listing";
import queryDataItems from "../queryWixData";

export const getMarketSection = async (slug) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "MarketSection",
            "includeReferencedItems": ["howWeDoItSections"],
            "eq": [
                {
                    "key": "slug",
                    "value": slug
                }
            ]
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for MarketSection");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}


export const getMarketsPostPageSectionDetails = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "MarketsPostPageSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for MarketsPageSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const fetchMarketPortfolios = async ({ id }) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PortfolioCollection",
            "includeReferencedItems": ["portfolioRef", "studios", "markets"],
            "limit": 4,
            "hasSome": [
                {
                    "key": "markets",
                    "values": [id]
                }
            ],
            "ne": [
                {
                    "key": "isHidden",
                    "value": true
                }
            ]
        });
        if (!response._items) {
            throw new Error("No data found for PortfolioCollection");
        }
        return response._items.map(item => item.data);
    } catch (error) {
        throw new Error(error.message);
    }
}
