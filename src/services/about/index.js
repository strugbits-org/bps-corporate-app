import queryDataItems from "../queryWixData";

export const getAboutUsCardsSection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "AboutUsCardsSection"
        });
        if (!response._items) {
            throw new Error("No data found for AboutUsCardsSection");
        }
        return response._items.map((x) => x.data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsIntroSection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "AboutUsIntroSection"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for AboutUsIntroSection");
        }
        return response._items[0].data;

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsDreamTeamSection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "AboutUsDreamTeamSection"
        });
        if (!response._items) {
            throw new Error("No data found for AboutUsDreamTeamSection");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAboutUsRestOfFamily = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "AboutUsRestOfFamily"
        });
        if (!response._items) {
            throw new Error("No data found for AboutUsRestOfFamily");
        }
        return response._items.map((x) => x.data);

    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPortfolioSlider = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PortfolioCollection",
            "includeReferencedItems": ["portfolioRef", "studios", "markets"],
            "limit": 3,
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

export const getAboutUsSectionDetails = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "AboutUsSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for AboutUsSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

