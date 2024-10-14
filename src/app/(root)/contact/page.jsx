import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import Contact from '@/components/contact';
import { getPageMetaData } from '@/services';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("contact");
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
        logError("Error in metadata(Contact Page):", error);
    }
}

export default async function Page() {
    return (
        <>
            <Contact />
            <AnimationLoaded />
        </>
    )
}