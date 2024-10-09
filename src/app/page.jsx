import DreamBigSection from '@/components/commonComponents/DreamBigSection';
import MarketSection from '@/components/commonComponents/MarketSection';
import PeopleReviewSLider from '@/components/commonComponents/PeopleReviewSlider';
import SocialSection from '@/components/commonComponents/SocialSection';
import StudioSection from '@/components/commonComponents/StudioSection';
import FormConcept from '@/components/homePageSections/FormConcept';
import GetTouchSection from '@/components/homePageSections/GetTouchSection';
import HeroSection from '@/components/homePageSections/HeroSection';
import OurProjectSection from '@/components/homePageSections/OurProjectSection';
import RentalStoreSection from '@/components/homePageSections/RentalStoreSection';
import { getDreamBigData, getHeroSectionData, getHomeSectionDetails, getMarketsSectionData, getPeopleReviewSliderData, getPortfolioCollection, getRentalStoreData, getRentalStoreFancyTitle, getStudiosSectionData, getTouchSectionData } from '@/services/home';
import React from 'react'

export default async function Page() {
  
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
    getDreamBigData()
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
      <DreamBigSection data={dreamBigData} />
    </>
  )
}