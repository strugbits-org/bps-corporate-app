import queryDataItems from "../queryWixData";

export const getContactUsContent = async () => {
    try {
        const response = await queryDataItems({
            "dataCollectionId": "ContactUsContent"
        });
        if (!response._items || !response._items[0]) {
            throw new Error("No data found for ContactUsContent");
        }
        return response._items[0].data;
    } catch (error) {
        throw new Error(error.message);
    }
}