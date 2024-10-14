import Article from "@/components/article";
import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import { getPageMetaData } from "@/services";
import { getAllBlogs, getBlogProductData } from "@/services/blog";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);

        const [
            metaData,
            blogProductData
        ] = await Promise.all([
            getPageMetaData("article"),
            getBlogProductData({ slug })
        ]);

        const { title, noFollowTag } = metaData;

        const fullTitle = title + (blogProductData.seoDesc.title || blogProductData.blogRef.title);
        const description = blogProductData.seoDesc.description;

        const metadata = {
            title: fullTitle,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Article):", error);
    }
}

export const generateStaticParams = async () => {
    try {
        const blogsData = await getAllBlogs();
        const paths = blogsData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        logError("Error generating static params for Articles:", error);
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const blogProductData = await getBlogProductData({ slug });
        if (!blogProductData) {
            throw new Error("Not found");
        }
        return (
            <>
                <Article slug={slug} blogProductData={blogProductData} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Article page data: ", error);
        notFound();
    }
}
