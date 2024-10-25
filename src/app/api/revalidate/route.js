import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllPagesMetaData } from '@/services';
import { getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { listAllPortfolios } from '@/services/portfolio';
import { getAllBlogs } from '@/services/blog';

const isAuthorized = (authHeader) => authHeader && authHeader === process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;

export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!isAuthorized(authHeader)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const routes = [];
    const success = [];

    const [
      pages,
      studios,
      markets,
      portfolios,
      blogs
    ] = await Promise.all([
      getAllPagesMetaData(),
      getStudiosSectionData(),
      getMarketsSectionData(),
      listAllPortfolios(),
      getAllBlogs()
    ]);

    const subpages = new Set(["/market", "/services", "/project", "/article"]);
    const page_routes = pages.map(page => page.slug === "home" ? "/" : "/" + page.slug).reverse().filter(route => !subpages.has(route));
    routes.push(...page_routes);

    const studios_routes = studios.map(studio => "/services/" + studio.slug);
    routes.push(...studios_routes);

    const markets_routes = markets.map(market => "/market/" + market.slug);
    routes.push(...markets_routes);

    const portfolios_routes = portfolios.map((x) => "/project/" + x.slug);
    routes.push(...portfolios_routes);

    const blogs_routes = blogs.map((x) => "/article/" + x.slug);
    routes.push(...blogs_routes);

    routes.map(route => {
      revalidatePath(route)
      success.push(route);
    });

    return NextResponse.json({ message: "Revalidation successful", success });
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating', error: error.message }, { status: 500 });
  }
}
