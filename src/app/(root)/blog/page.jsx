import Blog from '@/components/blog';
import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import { getPageMetaData } from '@/services';
import { getAllBlogs, getBlogSectionDetails } from '@/services/blog';
import { getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("blog");
        const { title, description, noFollowTag } = metaData;
        const metadata = {
            title,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Blog):", error);
    }
}

export default async function Page() {
    try {
        const [
            blogs,
            blogSectionDetails,
            marketsSectionData,
            studios
        ] = await Promise.all([
            getAllBlogs(),
            getBlogSectionDetails(),
            getMarketsSectionData(),
            getStudiosSectionData()
        ]);

        // Trim payload: keep only fields used by the Blog list UI
        const trimmedBlogs = (blogs || []).map((item) => ({
            _id: item?._id,
            slug: item?.slug,
            blogRef: item?.blogRef ? {
                coverImage: item.blogRef.coverImage,
                title: item.blogRef.title,
                excerpt: item.blogRef.excerpt,
                lastPublishedDate: item.blogRef.lastPublishedDate,
            } : undefined,
            author: item?.author ? {
                nickname: item.author.nickname,
            } : undefined,
            studios: Array.isArray(item?.studios) ? item.studios.map((s) => ({
                _id: s?._id,
                cardName: s?.cardName,
            })) : [],
            markets: Array.isArray(item?.markets) ? item.markets.map((m) => ({
                _id: m?._id,
                cardname: m?.cardname,
            })) : [],
        }));

        const trimmedMarkets = Array.isArray(marketsSectionData) ? marketsSectionData.map((m) => ({
            _id: m?._id,
            cardname: m?.cardname,
        })) : [];

        const trimmedStudios = Array.isArray(studios)
            ? studios
                .filter((x) => x?.filters)
                .map((s) => ({ _id: s?._id, cardName: s?.cardName, filters: true }))
            : [];

        return (
            <>
                <AnimationLoaded />
                <Blog {...{ blogs: trimmedBlogs, blogSectionDetails, markets: trimmedMarkets, studios: trimmedStudios }} />
            </>
        )
    } catch (error) {
        logError("Error fetching Blogs page data:", error);
    }
}