import { logError } from '@/utils/utilityFunctions';
import PostDetails from './PostDetails';
import RecentPosts from './RecentPosts';
import { getBlogPostData, getBlogSectionDetails, getBlogTags } from '@/services/blog';

export default async function Article({ slug, blogProductData }) {
    try {
        const [
            blogSectionDetails,
            blogPostData,
            blogTags
        ] = await Promise.all([
            getBlogSectionDetails(),
            getBlogPostData(slug),
            getBlogTags(blogProductData.blogRef.tags)
        ]);

        return (
            <>
                <PostDetails
                    data={blogProductData}
                    blogSectionDetails={blogSectionDetails}
                    tags={blogTags}
                />
                <RecentPosts
                    posts={blogPostData}
                    blogSectionDetails={blogSectionDetails}
                />
            </>
        )
    } catch (error) {
        logError("Error fetching Article page data:", error);
    }
}