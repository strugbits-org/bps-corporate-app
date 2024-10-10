import { fetchCollection } from "..";

export const getFooterData = async (enableCache) => {
    try {
        const data = {
            "dataCollectionId": "Footer",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data, enableCache ? "FooterDataCache" : null);
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getContactData = async (enableCache) => {
    try {
        const data = {
            "dataCollectionId": "ContactDetails",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data, enableCache ? "ContactDetailsDataCache" : null);
        return response._items.map((x) => x.data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSocialLinks = async (enableCache) => {
    try {
        const data = {
            "dataCollectionId": "SocialLinks",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data, enableCache ? "SocialLinksDataCache" : null);
        return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getFooterNavigationMenu = async () => {
    try {
        const data = {
            "dataCollectionId": "FooterNavigationMenu",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data,"FooterNavigationMenuDataCache");        
        return response._items.filter(x => !x.data.isHidden).map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } catch (error) {
        throw new Error(error.message);
    }
}