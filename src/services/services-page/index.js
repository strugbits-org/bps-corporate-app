import queryDataItems from "../queryWixData";

export const getServiceData = async (slug) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "StudiosSection",
            "includeReferencedItems": ["subServices"],
            "eq": [
                {
                    "key": "slug",
                    "value": slug
                }
            ],
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for StudiosSection");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getServicesSectionDetails = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "ServicePostSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for ServicePostSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getPortfolioSliderServices = async (id) => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PortfolioCollection",
            "includeReferencedItems": ["portfolioRef", "studios", "markets"],
            "limit": 3,
            "hasSome": [
                {
                    "key": "studios",
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
