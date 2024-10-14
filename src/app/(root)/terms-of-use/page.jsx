import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import TermsOfUse from '@/components/terms-of-use';
import { getPageMetaData } from '@/services';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("terms-of-use");
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
        logError("Error in metadata(Terms Of Use):", error);
    }
}

export default async function Page() {
    return (
        <>
            <TermsOfUse />
            <AnimationLoaded />
        </>
    )
}