import AboutBottomSection from '@/components/about/AboutBottomSection';
import AboutCardsSection from '@/components/about/AboutCardsSection';
import IntroSection from '@/components/about/IntroSection';
import OurDream from '@/components/about/OurDream';
import OurFamily from '@/components/about/OurFamily';
import SliderBanner from '@/components/common/SliderBanner';
import { getAboutSlider, getAboutUsCardsSection, getAboutUsDreamTeamSection, getAboutUsIntroSection, getAboutUsRestOfFamily, getAboutUsSectionDetails } from '@/services/about';
import { logError } from '@/utils/utilityFunctions';

export default async function About() {
    try {
        const [
            aboutUsCardsSection,
            aboutUsIntroSection,
            aboutUsDreamTeamSection,
            aboutUsRestOfFamily,
            aboutSlider,
            aboutUsSectionDetails,
        ] = await Promise.all([
                getAboutUsCardsSection(),
                getAboutUsIntroSection(),
                getAboutUsDreamTeamSection(),
                getAboutUsRestOfFamily(),
                getAboutSlider(),
                getAboutUsSectionDetails(),
            ]);
    
        return (
            <>
                <IntroSection data={aboutUsIntroSection} />
                <AboutCardsSection data={aboutUsCardsSection} />
                <OurDream data={aboutUsDreamTeamSection} sectionDetails={aboutUsSectionDetails} />
                <OurFamily data={aboutUsRestOfFamily} sectionDetails={aboutUsSectionDetails} />
                <SliderBanner data={aboutSlider} type={false} sectionDetails={aboutUsSectionDetails} />
                <AboutBottomSection sectionDetails={aboutUsSectionDetails} />
            </>
        )
    } catch (error) {
        logError("Error fetching About page data:", error);
    }
}