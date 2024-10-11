export async function GET() {
  const baseUrl = process.env.BASE_URL || 'https://blueprintstudios.com';

  const sitemaps = [
    { loc: `${baseUrl}/pages-sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/services/sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/markets/sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/projects/sitemap.xml`, lastmod: new Date().toISOString() },
    { loc: `${baseUrl}/articles/sitemap.xml`, lastmod: new Date().toISOString() },
  ];

  const sitemapIndex = `
      <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemaps
      .map(
        (sitemap) => `
              <sitemap>
                <loc>${sitemap.loc}</loc>
                <lastmod>${sitemap.lastmod}</lastmod>
              </sitemap>
            `
      )
      .join('')}
      </sitemapindex>
    `;

  return new Response(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}