import queryDataItems from "../queryWixData";

export const getFooterData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "Footer"
        });
        if (!response._items) {
            throw new Error("No data found for Footer");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getContactData = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "ContactDetails"
        });
        if (!response._items) {
            throw new Error("No data found for ContactDetails");
        }
        return response._items.map((x) => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSocialLinks = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "SocialLinks"
        });
        if (!response._items) {
            throw new Error("No data found for SocialLinks");
        }
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getFooterNavigationMenu = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "FooterNavigationMenu"
        });
        if (!response._items) {
            throw new Error("No data found for FooterNavigationMenu");
        }
        return response._items.filter(x => !x.data.isHidden).map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}