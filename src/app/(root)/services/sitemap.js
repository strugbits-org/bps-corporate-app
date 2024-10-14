import { getStudiosSectionData } from "@/services/home";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  const studios = await getStudiosSectionData();
  const studios_routes = studios.map((x) => "services/" + x.slug);

  const paths = studios_routes.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...paths];
}
