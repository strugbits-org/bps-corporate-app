import PostDetails from './PostDetails';
import RecentPosts from './RecentPosts';
import { getBlogPostData, getBlogSectionDetails, getBlogTags } from '@/services/blog';

export default async function Article({ slug, blogProductData }) {

    const [
        blogSectionDetails,
        blogPostData,
        blogTags
    ] = await Promise.all([
        getBlogSectionDetails(),
        getBlogPostData({ pageSize: 4, slug }),
        getBlogTags({ ids: blogProductData.blogRef.tags })
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
}