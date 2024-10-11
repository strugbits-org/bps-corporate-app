import Blog from '@/components/blog';
import { getBlogSectionDetails } from '@/services/blog';
import { getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { listBlogs } from '@/services/listing';

export default async function Page() {
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
        <>
            <Blog {...{ blogs, blogSectionDetails, marketsSectionData, studios }} />
        </>
    )
}