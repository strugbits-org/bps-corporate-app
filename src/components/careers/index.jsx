import { getAboutUsCardsSection } from "@/services/about";
import { getCareersIntroSection, getCareersPageContent, getWhoWorksSection } from "@/services/careers";
import { IntroSection } from "./IntroSection";
import PeopleReviewSLider from "../common/PeopleReviewSlider";
import AboutCardsSection from "../about/AboutCardsSection";
import { JobsSection } from "./JobsSection";
import { logError } from "@/utils/utilityFunctions";

export default async function Career() {
    try {
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
    } catch (error) {
        logError("Error fetching Careers page data:", error);
    }
}