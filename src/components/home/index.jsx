import MarketSection from '@/components/common/MarketSection';
import PeopleReviewSLider from '@/components/common/PeopleReviewSlider';
import StudioSection from '@/components/common/StudioSection';
import FormConcept from '@/components/home/FormConcept';
import GetTouchSection from '@/components/home/GetTouchSection';
import HeroSection from '@/components/home/HeroSection';
import OurProjectSection from '@/components/home/OurProjectSection';
import RentalStoreSection from '@/components/home/RentalStoreSection';
import { getHeroSectionData, getHomeSectionDetails, getMarketsSectionData, getPeopleReviewSliderData, getPortfolioCollection, getRentalStoreData, getRentalStoreFancyTitle, getStudiosSectionData, getTouchSectionData } from '@/services/home';
import { logError } from '@/utils/utilityFunctions';

export default async function Home() {
  try {
    const [homeSectionDetails, heroSectionData, getInTouchData, studiosSectionData, portfolioCollection, peopleReviewSliderData, marketsSectionData, rentalStoreData, rentalStoreFancyTitle, dreamBigData] = await Promise.all([
      getHomeSectionDetails(),
      getHeroSectionData(),
      getTouchSectionData(),
      getStudiosSectionData(),
      getPortfolioCollection(),
      getPeopleReviewSliderData(),
      getMarketsSectionData(),
      getRentalStoreData(),
      getRentalStoreFancyTitle(),
    ]);

    return (
      <>
        <HeroSection data={heroSectionData} />
        <FormConcept data={heroSectionData} />
        <GetTouchSection data={getInTouchData} />
        <StudioSection studioData={studiosSectionData} homeSectionDetails={homeSectionDetails} />
        <OurProjectSection portfolioCollection={portfolioCollection} homeSectionDetails={homeSectionDetails} />
        <PeopleReviewSLider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
        <MarketSection data={marketsSectionData} homeSectionDetails={homeSectionDetails} />
        <RentalStoreSection data={rentalStoreData} homeSectionDetails={homeSectionDetails} rentalStoreSubtitle={rentalStoreFancyTitle} />
      </>
    )
  } catch (error) {
    logError("Error fetching home page data:", error);
  }
}