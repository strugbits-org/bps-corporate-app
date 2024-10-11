import { getAboutUsCardsSection } from "@/services/about";
import { getCareersIntroSection, getCareersPageContent, getWhoWorksSection } from "@/services/careers";
import { IntroSection } from "./IntroSection";
import PeopleReviewSLider from "../common/PeopleReviewSlider";
import AboutCardsSection from "../about/AboutCardsSection";
import { JobsSection } from "./JobsSection";

export default async function Career() {
    const [
        careersPageContent,
        careersIntroSection,
        whoWorksSection,
        aboutUsCardsSection,
    ] = await Promise.all([
        getCareersPageContent(),
        getCareersIntroSection(),
        getWhoWorksSection(),
        getAboutUsCardsSection(),
        // getCareersJobsBoard(),
    ]);

    return (
        <>
            <IntroSection data={careersIntroSection} />
            <PeopleReviewSLider data={whoWorksSection} homeSectionDetails={careersPageContent} actionButton={false} />
            <AboutCardsSection data={aboutUsCardsSection} />
            {/* <JobsSection jobslist={careersJobsBoard} content={careersPageContent} /> */}
            <JobsSection jobslist={[]} content={careersPageContent} />
        </>
    )
}