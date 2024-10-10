import { getPortfolio, getPortfolioSectionDetails } from '@/services/portfolio';
import ExploreProjectsSection from './ExploreProjectsSection';
import GallerySection from './GallerySection';
import PortfolioIntoSection from './PortfolioIntoSection';

export default async function Project({ slug, singlePortfolio }) {

    const [
        portfolioSectionDetails,
        portfolio
    ] = await Promise.all([
        getPortfolioSectionDetails(),
        getPortfolio({ pageSize: 4, id: slug })
    ]);

    return (
        <>
            <PortfolioIntoSection data={singlePortfolio} />
            <GallerySection data={singlePortfolio} portfolioSectionDetails={portfolioSectionDetails} />
            <ExploreProjectsSection id={slug} portfolioCollection={portfolio} portfolioSectionDetails={portfolioSectionDetails} />
        </>
    )
}