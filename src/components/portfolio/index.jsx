import PortfolioListing from "./PortfolioListing";
import MarketSection from "../common/MarketSection";

export default function Portfolio({
    portfolios,
    homeSectionDetails,
    portfolioSectionDetails,
    markets,
    studios
}) {
    return (
        <>
            <PortfolioListing {...{ portfolios, homeSectionDetails, portfolioSectionDetails, markets, studios: studios.filter(x => x.filters) }} />
            <MarketSection data={markets} homeSectionDetails={homeSectionDetails} />
        </>
    )
};