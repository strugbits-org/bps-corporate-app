import { fetchCollection } from "..";
import { listPortfolios } from "../listing";

export const listAllPortfolios = async () => {
  try {
    const data = {
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: null,
      returnTotalCount: null,
      find: {},
      contains: null,
      eq: null,
      limit: 1000,
    };
    const response = await fetchCollection(data);
    return response._items.map((x) => x.data);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPortfolioSectionDetails = async () => {
  try {
    const data = {
      dataCollectionId: "PortfolioSectionDetails",
      includeReferencedItems: null,
      returnTotalCount: null,
      find: {},
      contains: null,
      eq: null,
      limit: null,
    };
    const response = await fetchCollection(data);
    return response._items.map((x) => x.data)[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getSinglePortfolio = async (slug) => {
  try {
    const data = {
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: [
        "portfolioRef",
        "locationFilteredVariant",
        "storeProducts",
        "studios",
        "markets",
      ],
      returnTotalCount: null,
      find: {},
      contains: null,
      eq: ["slug", slug],
      limit: null,
      filterProducts: true,
    };
    const response = await fetchCollection(data);
    return response._items.map((x) => x.data)[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPortfolio = async ({ pageSize, id }) => {
  try {
    const options = {
      pageSize: pageSize,
      slug: id,
    };

    const portfolio = await listPortfolios(options);
    return portfolio._items.map((item) => item.data);
  } catch (error) {
    throw new Error(error.message);
  }
};