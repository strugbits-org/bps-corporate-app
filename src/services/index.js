const base_url = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const fetchCollection = async (payload) => {
  try {
    const response = await fetch(`${base_url}/corporate/query-data-items`, {
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
    console.error('Error fetching collection:', error);
    throw new Error('An error occurred while fetching data');
  }
};

export const fetchCollectionSp = async (payload) => {
  try {
    const response = await fetch(`${base_url}/corporate/query-data-items-excludeditems`, {
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

export const fetchBlogTags = async (payload) => {
  try {
    const response = await fetch(`${base_url}/corporate/blog-tags`, {
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
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postForm = async (name, payload) => {
  try {
    const response = await fetch(`${base_url}/corporate/post-data/${name}`, {
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
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getInstaFeed = async () => {
  try {
    const response = await fetch(`${base_url}/corporate/instagram/feeds`);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPageMetaData = async (path) => {
  try {
    const data = {
      "dataCollectionId": "PageSeoConfiguration",
      "includeReferencedItems": null,
      "returnTotalCount": null,
      "find": {},
      "contains": null,
      "eq": ["slug", path],
      "limit": null
    }
    const response = await fetchCollection(data, `PageSeoConfigurationDataCache_${path}`);
    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllPagesMetaData = async () => {
  try {
    const data = {
      "dataCollectionId": "PageSeoConfiguration",
      "includeReferencedItems": null,
      "returnTotalCount": null,
      "find": {},
      "contains": null,
      "eq": null,
      "limit": null
    }
    const response = await fetchCollection(data);
    return response._items.map((x) => x.data);
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getChatConfiguration = async (origin) => {
  try {
    const data = {
      "dataCollectionId": "ChatbotConfiguration",
      "includeReferencedItems": null,
      "returnTotalCount": null,
      "find": {},
      "contains": null,
      "eq": ["origin", origin],
      "limit": null
    }
    const response = await fetchCollection(data);

    return response._items[0].data;
  } catch (error) {
    throw new Error(error.message);
  }
};