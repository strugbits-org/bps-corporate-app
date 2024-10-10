import Article from "@/components/article";
import { getAllBlogs, getBlogProductData } from "@/services/blog";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    try {
        const blogsData = await getAllBlogs();
        const paths = blogsData.map((data) => ({ slug: data.slug }));        
        return paths;
    } catch (error) {
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);        
        const blogProductData = await getBlogProductData({ slug });
        return (
            <Article slug={slug} blogProductData={blogProductData} />
        );
    } catch (error) {
        notFound();
    }
}
