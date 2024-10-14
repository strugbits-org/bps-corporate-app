import Blog from '@/components/blog';
import { getPageMetaData } from '@/services';
import { getBlogSectionDetails } from '@/services/blog';
import { getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { listBlogs } from '@/services/listing';
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
            listBlogs({ pageSize: 8 }),
            getBlogSectionDetails(),
            getMarketsSectionData(),
            getStudiosSectionData()
        ]);
    
        return (
            <Blog {...{ blogs, blogSectionDetails, marketsSectionData, studios }} />
        )
    } catch (error) {
        logError("Error fetching Blogs page data:", error);
    }
}