import { ApiKeyStrategy, createClient } from "@wix/sdk";
import { items } from "@wix/data";
import { tags } from "@wix/blog";
import { logError } from "./utilityFunctions";
import { submissions } from "@wix/forms";

export const createWixClient = async () => {
  try {
    const wixClient = createClient({
      modules: { items, tags, submissions },
      auth: ApiKeyStrategy({
        siteId: process.env.CLIENT_SITE_ID_WIX,
        apiKey: process.env.CLIENT_API_KEY_WIX,
      })
    });
    return wixClient;
  } catch (error) {
    logError("Error creating wix client: ", error);
  }
};