import queryDataItems from "../queryWixData";

export const getCareersPageContent = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "CareersSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for CareersSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCareersIntroSection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "CareersFirsttwosections"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for CareersFirsttwosections");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCareersJobsBoard = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "JobsBoards"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for JobsBoards");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getWhoWorksSection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "WhoWorksSection"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for WhoWorksSection");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}