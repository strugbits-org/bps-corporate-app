import Career from '@/components/careers';
import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import { getPageMetaData } from '@/services';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("careers");
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
        logError("Error in metadata(Careers):", error);
    }
}
export default async function Page() {
    return (
        <>
            <Career />
            <AnimationLoaded />
        </>
    )
}