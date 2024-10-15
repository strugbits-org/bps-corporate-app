import queryDataItems from "../queryWixData";

export const getPrivacyPolicyContent = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "PrivacyPolicyContent"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for PrivacyPolicyContent");
        }
        return response._items.map((x) => x.data)[0].content;
    } catch (error) {
        throw new Error(error.message);
    }
}