import { listAllPortfolios } from "@/services/portfolio";

const BASE_URL = process.env.BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  const portfolios = await listAllPortfolios();
  const portfolios_routes = portfolios.map((x) => "project/" + x.slug);

  const paths = portfolios_routes.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...paths];
}
