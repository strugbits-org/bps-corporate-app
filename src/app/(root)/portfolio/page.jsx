import Portfolio from '@/components/portfolio';
import { getHomeSectionDetails, getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { listPortfolios } from '@/services/listing';
import { getPortfolioSectionDetails } from '@/services/portfolio';

export default async function Page() {
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
}