import { fetchCollection } from "..";
import { listPortfolios } from "../listing";

export const getServiceData = async (slug) => {
    try {
        const data = {
            "dataCollectionId": "StudiosSection",
            "includeReferencedItems": ["subServices"],
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": ["slug", slug],
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data)[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getServicesSectionDetails = async () => {
    try {
        const data = {
            "dataCollectionId": "ServicePostSectionDetails",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data)[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getServicesSlider = async (id) => {
    try {
        const options = {
            pageSize: 3,
            studios: [id],
        };

        const portfolio = await listPortfolios(options);
        return portfolio._items.map(item => item.data);
    } catch (error) {
        throw new Error(error.message);
    }
}
