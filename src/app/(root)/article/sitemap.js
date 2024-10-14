import { getAllBlogs } from "@/services/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  const blogs = await getAllBlogs();
  const blogs_routes = blogs.map((x) => "article/" + x.slug);

  const paths = blogs_routes.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...paths];
}
