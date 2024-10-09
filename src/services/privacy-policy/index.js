import { fetchCollection } from "..";

export const getPrivacyPolicyContent = async () => {
    try {
        const data = {
            "dataCollectionId": "PrivacyPolicyContent",
            "includeReferencedItems": null,
            "returnTotalCount": null,
            "find": {},
            "contains": null,
            "eq": null,
            "limit": null
        }
        const response = await fetchCollection(data);
        return response._items.map((x) => x.data)[0]?.content;
    } catch (error) {
        throw new Error(error.message);
    }
}