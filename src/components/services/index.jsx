import PeopleReviewSLider from '@/components/common/PeopleReviewSlider';
import StudioSection from '@/components/common/StudioSection';
import { getHomeSectionDetails, getPeopleReviewSliderData, getStudiosSectionData } from '@/services/home';
import { getServicesSectionDetails } from '@/services/services-page';
import ServiceIntro from './ServiceIntro';
import { SubSectionServices } from './SubSectionServices';
import SliderBanner from '../common/SliderBanner';
import { logError } from '@/utils/utilityFunctions';

export default async function Services({ serviceData, servicesSlider }) {

    try {
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
    } catch (error) {
        logError("Error fetching services page data:", error);
    }
}