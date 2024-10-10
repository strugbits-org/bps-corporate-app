import { fetchCollection } from "..";
import { listPortfolios } from "../listing";

export const getAboutUsCardsSection = async () => {
    try {
        const data = {
            "dataCollectionId": "AboutUsCardsSection",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsIntroSection = async (enableCache) => {
    try {
        const data = {
            "dataCollectionId": "AboutUsIntroSection",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data, enableCache ? "AboutUsIntroSectionDataCache" : null);
        return response._items[0].data;

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsDreamTeamSection = async () => {
    try {
        const data = {
            "dataCollectionId": "AboutUsDreamTeamSection",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": 1000
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);

    } catch (error) {
        console.log("error.message", error);
        throw new Error(error.message);
    }
}

export const getAboutUsRestOfFamily = async () => {
    try {
        const data = {
            "dataCollectionId": "AboutUsRestOfFamily",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutSlider = async () => {
    try {
        const options = {
            pageSize: 3,
        };

        const portfolio = await listPortfolios(options);
        return portfolio._items.map(item => item.data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsSectionDetails = async (enableCache) => {
    try {
        const data = {
            "dataCollectionId": "AboutUsSectionDetails",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data, enableCache ? "AboutUsSectionDetailsDataCache" : null);
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

