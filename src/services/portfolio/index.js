import queryDataItems from "../queryWixData";

export const listAllPortfolios = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PortfolioCollection",
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
    return response._items.map((x) => x.data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPortfolioSectionDetails = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PortfolioSectionDetails",
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for PortfolioSectionDetails");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSinglePortfolio = async (slug) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PortfolioCollection",
      "includeReferencedItems": ["portfolioRef", "locationFilteredVariant", "storeProducts", "studios", "markets"],
      "eq": [
        {
          "key": "slug",
          "value": slug
        }
      ],
      "ne": [
        {
          "key": "isHidden",
          "value": true
        }
      ]
    });
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getOtherPortfolios = async (slug) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PortfolioCollection",
      "includeReferencedItems": ["portfolioRef", "studios", "markets"],
      "limit": 4,
      "ne": [
        {
          "key": "slug",
          "value": slug
        },
        {
          "key": "isHidden",
          "value": true
        }
      ]
    });
    if (!response._items) {
      throw new Error("No data found for PortfolioCollection");
    }

    return response._items.map((item) => item.data);
  } catch (error) {
    throw new Error(error.message);
  }
};