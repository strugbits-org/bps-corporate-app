import MarketSection from '@/components/commonComponents/MarketSection';
import PeopleReviewSLider from '@/components/commonComponents/PeopleReviewSlider';
import StudioSection from '@/components/commonComponents/StudioSection';
import { getHomeSectionDetails, getMarketsSectionData, getPeopleReviewSliderData, getStudiosSectionData } from '@/services/home';
import MarketTopSection from './MarketTopSection';
import HowWeDoSection from './HowWeDoSection';
import ExplorePortfolio from './ExplorePortfolio';
import { getMarketsPostPageSectionDetails } from '@/services/market';

export default async function Market({ slug, marketSection, portfolioData }) {

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
}