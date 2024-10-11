import About from '@/components/about';
import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import { getPageMetaData } from '@/services';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
      const metaData = await getPageMetaData("about");
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
      logError("Error in metadata(about page):", error);
    }
  }

export default async function Page() {
    return (
        <>
            <About />
            <AnimationLoaded />
        </>
    )
}