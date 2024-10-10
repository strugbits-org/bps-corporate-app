import PeopleReviewSLider from '@/components/commonComponents/PeopleReviewSlider';
import StudioSection from '@/components/commonComponents/StudioSection';
import { getHomeSectionDetails, getPeopleReviewSliderData, getStudiosSectionData } from '@/services/home';
import { getServicesSectionDetails } from '@/services/services-page';
import ServiceIntro from './ServiceIntro';
import { SubSectionServices } from './SubSectionServices';
import SliderBanner from '../commonComponents/SliderBanner';

export default async function Services({ serviceData, servicesSlider }) {

    const [
        homeSectionDetails,
        servicesSectionDetails,
        peopleReviewSliderData,
        studiosSectionData
    ] = await Promise.all([
        getHomeSectionDetails(),
        getServicesSectionDetails(),
        getPeopleReviewSliderData(),
        getStudiosSectionData(),
    ]);

    return (
        <>
            <ServiceIntro data={serviceData} />
            <SubSectionServices data={serviceData} />
            <SliderBanner data={servicesSlider} type={true} sectionDetails={servicesSectionDetails} />
            <PeopleReviewSLider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
            <StudioSection studioData={studiosSectionData} homeSectionDetails={homeSectionDetails} />
        </>
    )
}