import MarketSection from '@/components/common/MarketSection';
import PeopleReviewSLider from '@/components/common/PeopleReviewSlider';
import StudioSection from '@/components/common/StudioSection';
import { getHomeSectionDetails, getMarketsSectionData, getPeopleReviewSliderData, getStudiosSectionData } from '@/services/home';
import MarketTopSection from './MarketTopSection';
import HowWeDoSection from './HowWeDoSection';
import ExplorePortfolio from './ExplorePortfolio';
import { getMarketsPostPageSectionDetails } from '@/services/market';
import { logError } from '@/utils/utilityFunctions';

export default async function Market({ slug, marketSection, portfolioData }) {
try {
    const [
        marketsPostPageSectionDetails,
        homeSectionDetails,
        peopleReviewSliderData,
        marketsSectionData,
        studiosSectionData,
    ] = await Promise.all([
        getMarketsPostPageSectionDetails(),
        getHomeSectionDetails(),
        getPeopleReviewSliderData(),
        getMarketsSectionData(),
        getStudiosSectionData(),
    ]);
    
    return (
        <>
            <MarketTopSection data={marketSection} />
            <HowWeDoSection
                data={marketSection}
                marketSectionDetails={marketsPostPageSectionDetails}
            />
            <ExplorePortfolio
                marketSectionDetails={marketsPostPageSectionDetails}
                portfolioCollection={portfolioData}
                slug={slug}
            />
            <PeopleReviewSLider
                data={peopleReviewSliderData}
                homeSectionDetails={homeSectionDetails}
            />
            <MarketSection
                data={marketsSectionData}
                homeSectionDetails={homeSectionDetails}
            />
            <StudioSection
                studioData={studiosSectionData}
                homeSectionDetails={homeSectionDetails}
            />
        </>
    )
} catch (error) {
    logError("Error fetching Market page data: ", error);
}
}