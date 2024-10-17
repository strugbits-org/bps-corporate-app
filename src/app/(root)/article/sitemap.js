import { getAllBlogs } from "@/services/blog";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://blueprintstudios.com';

export default async function sitemap() {
  try {
    const blogs = await getAllBlogs();
    const blogs_routes = blogs.map((x) => "article/" + x.slug);

    const paths = blogs_routes.map((slug) => ({
      url: `${BASE_URL}/${slug}`,
      lastModified: new Date().toISOString(),
    }));

    return [...paths];
  } catch (error) {
    logError("Error generating sitemap for article:", error);
    notFound();
  }
}
