import Portfolio from '@/components/portfolio';
import { getPageMetaData } from '@/services';
import { getHomeSectionDetails, getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { listPortfolios } from '@/services/listing';
import { getPortfolioSectionDetails } from '@/services/portfolio';
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
            listPortfolios({ pageSize: 8 }),
            getHomeSectionDetails(),
            getPortfolioSectionDetails(),
            getMarketsSectionData(),
            getStudiosSectionData()
        ]);
    
        return (
            <Portfolio {...{ portfolios, homeSectionDetails, portfolioSectionDetails, marketsSectionData, studios }} />
        )
    } catch (error) {
        logError("Error fetching Portfolio page data:", error);
    }
}