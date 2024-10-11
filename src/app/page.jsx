import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import Home from '@/components/home';
import { getPageMetaData } from '@/services';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("home");
    const { title,description, noFollowTag } = metaData;
    const metadata = {
      title,
      description
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(home page):", error);
  }
}

export default async function Page() {
  try {

    return (
      <>
        <Home />
        <AnimationLoaded />
      </>
    )
  } catch (error) {
    logError("Error fetching home page data:", error);
  }
}