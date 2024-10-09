import { fetchCollection } from "..";

export const getCareersPageContent = async () => {
    try {
        const data = {
            "dataCollectionId": "CareersSectionDetails",
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

export const getCareersIntroSection = async () => {
    try {
        const data = {
            "dataCollectionId": "CareersFirsttwosections",
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

export const getCareersJobsBoard = async () => {
    try {
        const data = {
            "dataCollectionId": "JobsBoards",
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

export const getWhoWorksSection = async () => {
    try {
        const data = {
            "dataCollectionId": "WhoWorksSection",
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