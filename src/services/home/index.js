import queryDataItems from "../queryWixData";

export const getHeroSectionData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "HomeTopSectionData"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for HomeTopSectionData");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getTouchSectionData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "GetInTouchSection"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for GetInTouchSection");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getStudiosSectionData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "StudiosSection"
        });
        if (!response._items) {
            throw new Error("No data found for StudiosSection");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getHomeSectionDetails = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "HomeSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for HomeSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPortfolioCollection = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PortfolioCollection",
            "includeReferencedItems": ["portfolioRef", "studios", "markets"],
            "limit": 4,
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

        return response._items.map(x => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getPeopleReviewSliderData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PeopleReviewSlider"
        });
        if (!response._items) {
            throw new Error("No data found for PeopleReviewSlider");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getOurClientsSectionData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "OurClientsSection"
        });
        if (!response._items) {
            throw new Error("No data found for OurClientsSection");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.order - b.order);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getMarketsSectionData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "MarketSection"
        });
        if (!response._items) {
            throw new Error("No data found for MarketSection");
        }
        return response._items.map((x) => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getRentalStoreFancyTitle = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "HomeRentalStoreSubtitleStyled"
        });
        if (!response._items) {
            throw new Error("No data found for HomeRentalStoreSubtitleStyled");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getRentalStoreData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "RentalStore"
        });
        if (!response._items) {
            throw new Error("No data found for RentalStore");
        }
        return response._items.map(x => x.data).sort((a, b) => (a.newimagetag === b.newimagetag) ? 0 : a.newimagetag ? -1 : 1);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getDreamBigData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "DreamBigSection"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for DreamBigSection");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSocialSectionDetails = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "SocialSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for SocialSectionDetails");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const fetchInstaFeed = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "InstagramFeed"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for InstagramFeed");
        }
        return response._items.map(x => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSearchSectionDetails = async () => {
    try {

        const response = await queryDataItems({
            "dataCollectionId": "SearchSectionDetails"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for SearchSectionDetails");
        }

        return response._items[0].data;

    } catch (error) {
        throw new Error(error.message);
    }
};