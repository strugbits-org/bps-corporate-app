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

        // Trim to only fields used by Article -> PostDetails/ProductCartSlider
        const trimmedBlogProductData = {
            blogRef: blogProductData?.blogRef ? {
                title: blogProductData.blogRef.title,
                lastPublishedDate: blogProductData.blogRef.lastPublishedDate,
                coverImage: blogProductData.blogRef.coverImage,
                // content consumed client-side to render
                richContent: {
                    nodes: blogProductData?.blogRef?.richContent?.nodes
                },
                // needed to fetch tag labels
                tags: blogProductData.blogRef.tags,
            } : undefined,
            author: blogProductData?.author ? {
                profilePhoto: blogProductData.author.profilePhoto,
                nickname: blogProductData.author.nickname,
            } : undefined,
            storeProducts: Array.isArray(blogProductData?.storeProducts)
                ? blogProductData.storeProducts
                    .filter((x) => x && x._id)
                    .map((p) => ({
                        _id: p._id,
                        slug: p.slug,
                        name: p.name,
                        mainMedia: p.mainMedia,
                        productOptions: p.productOptions
                            ? {
                                ...(p.productOptions.Color
                                    ? { Color: { choices: (p.productOptions.Color.choices || []).map((c) => ({ mainMedia: c?.mainMedia })) } }
                                    : {}),
                                ...(p.productOptions["Color "]
                                    ? { ["Color "]: { choices: (p.productOptions["Color "]?.choices || []).map((c) => ({ mainMedia: c?.mainMedia })) } }
                                    : {}),
                            }
                            : undefined,
                    }))
                : [],
        };
        return (
            <>
                <Article slug={slug} blogProductData={trimmedBlogProductData} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Article page data: ", error);
        notFound();
    }
}
