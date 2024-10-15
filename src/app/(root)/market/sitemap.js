import { getMarketsSectionData } from "@/services/home";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  try {
    const markets = await getMarketsSectionData();
    const markets_routes = markets.map((x) => "market/" + x.slug);

    const paths = markets_routes.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date().toISOString(),
    }));

    return [...paths];
  } catch (error) {
    logError("Error generating sitemap for market:", error);
    notFound();
  }
}
