import { getStudiosSectionData } from "@/services/home";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  try {
    const studios = await getStudiosSectionData();
    const studios_routes = studios.map((x) => "services/" + x.slug);

    const paths = studios_routes.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date().toISOString(),
    }));

    return [...paths];
  } catch (error) {
    logError("Error generating sitemap for services:", error);
    notFound();
  }
}
