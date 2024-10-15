import { listAllPortfolios } from "@/services/portfolio";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  try {
    const portfolios = await listAllPortfolios();
    const portfolios_routes = portfolios.map((x) => "project/" + x.slug);
  
    const paths = portfolios_routes.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date().toISOString(),
    }));
  
    return [...paths];
  } catch (error) {
    logError("Error generating sitemap for project:", error);
    notFound();
  }
}
