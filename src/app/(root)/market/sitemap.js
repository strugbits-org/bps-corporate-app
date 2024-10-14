import { getMarketCollection } from "@/services/market";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  const markets = await getMarketCollection();
  const markets_routes = markets.map((x) => "market/" + x.slug);

  const paths = markets_routes.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...paths];
}
