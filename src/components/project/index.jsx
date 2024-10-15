import { getOtherPortfolios, getPortfolioSectionDetails } from '@/services/portfolio';
import ExploreProjectsSection from './ExploreProjectsSection';
import GallerySection from './GallerySection';
import PortfolioIntoSection from './PortfolioIntoSection';
import { logError } from '@/utils/utilityFunctions';

export default async function Project({ slug, singlePortfolio }) {

    try {
        const [
            portfolioSectionDetails,
            portfolio
        ] = await Promise.all([
            getPortfolioSectionDetails(),
            getOtherPortfolios(slug)
        ]);

        return (
            <>
                <PortfolioIntoSection data={singlePortfolio} />
                <GallerySection data={singlePortfolio} portfolioSectionDetails={portfolioSectionDetails} />
                <ExploreProjectsSection id={slug} portfolioCollection={portfolio} portfolioSectionDetails={portfolioSectionDetails} />
            </>
        )
    } catch (error) {
        logError("Error fetching Project page data:", error);
    }
}