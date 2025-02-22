import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import Portfolio from '@/components/portfolio';
import { getPageMetaData } from '@/services';
import { getHomeSectionDetails, getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { getPortfolioSectionDetails, listAllPortfolios } from '@/services/portfolio';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("portfolio");
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
        logError("Error in metadata(Portfolio):", error);
    }
}

export default async function Page() {
    try {
        const [
            portfolios,
            homeSectionDetails,
            portfolioSectionDetails,
            marketsSectionData,
            studios,
        ] = await Promise.all([
            listAllPortfolios(),
            getHomeSectionDetails(),
            getPortfolioSectionDetails(),
            getMarketsSectionData(),
            getStudiosSectionData()
        ]);

        return (
            <>
                <AnimationLoaded />
                <Portfolio {...{ portfolios, homeSectionDetails, portfolioSectionDetails, markets: marketsSectionData, studios: studios.filter(x => x.filters) }} />
            </>
        )
    } catch (error) {
        logError("Error fetching Portfolio page data:", error);
    }
}