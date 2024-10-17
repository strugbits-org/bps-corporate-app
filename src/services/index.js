import queryDataItems from "./queryWixData";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchCollectionSp = async (payload) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/corporate/query-data-items-excludeditems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postForm = async (name, payload) => {
  try {
    const response = await fetch(`${base_url}/api/post-form/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.submission;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getPageMetaData = async (path) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PageSeoConfiguration",
      "eq": [
        {
          "key": "slug",
          "value": path
        }
      ]
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for PageSeoConfiguration");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllPagesMetaData = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PageSeoConfiguration"
    });
    if (!response._items) {
      throw new Error("No data found for PageSeoConfiguration");
    }
    return response._items.map((x) => x.data);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getChatConfiguration = async (origin) => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "ChatbotConfiguration",
      "eq": [
        {
          "key": "origin",
          "value": origin,
        }
      ]
    });
    if (!response._items || !response._items[0]) {
      throw new Error("No data found for ChatbotConfiguration");
    }
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};