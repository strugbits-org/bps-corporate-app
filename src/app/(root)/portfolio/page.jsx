import { AnimationLoaded } from '@/components/common/AnimationLoaded';
import Portfolio from '@/components/portfolio';
import { getPageMetaData } from '@/services';
import { getHomeSectionDetails, getMarketsSectionData, getStudiosSectionData } from '@/services/home';
import { getPortfolioSectionDetails, listAllPortfolios } from '@/services/portfolio';
import { logError } from '@/utils/utilityFunctions';

export async function generateMetadata() {
    try {
        const metaData = await getPageMetaData("portfolio");
        const { title, description, noFollowTag } = metaData;
        const metadata = {
            title,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Portfolio):", error);
    }
}

export default async function Page() {
    try {
        const [
            portfolios,
            homeSectionDetails,
            portfolioSectionDetails,
            marketsSectionData,
            studios,
        ] = await Promise.all([
            listAllPortfolios(),
            getHomeSectionDetails(),
            getPortfolioSectionDetails(),
            getMarketsSectionData(),
            getStudiosSectionData()
        ]);

        // Trim payloads to only what UI needs
        const trimmedPortfolios = (portfolios || []).map((item) => ({
            _id: item?._id,
            slug: item?.slug,
            portfolioRef: item?.portfolioRef ? {
                title: item.portfolioRef.title,
                coverImage: {
                    imageInfo: item?.portfolioRef?.coverImage?.imageInfo,
                }
            } : undefined,
            studios: Array.isArray(item?.studios) ? item.studios.map((s) => ({
                _id: s?._id,
                cardName: s?.cardName,
            })) : [],
            markets: Array.isArray(item?.markets) ? item.markets.map((m) => ({
                _id: m?._id,
                cardname: m?.cardname,
            })) : [],
        }));

        const trimmedMarkets = Array.isArray(marketsSectionData) ? marketsSectionData.map((m) => ({
            _id: m?._id,               // for filters in PortfolioListing
            slug: m?.slug,             // for MarketSection links
            image: m?.image,           // for MarketSection image
            cardname: m?.cardname,     // for both UI components
            marketTags: m?.marketTags, // for MarketSection tags
        })) : [];

        const trimmedStudios = Array.isArray(studios)
            ? studios
                .filter((x) => x?.filters)
                .map((s) => ({ _id: s?._id, cardName: s?.cardName, filters: true }))
            : [];

        const trimmedHomeSectionDetails = homeSectionDetails ? {
            marketTitle: homeSectionDetails.marketTitle,
        } : undefined;

        return (
            <>
                <AnimationLoaded />
                <Portfolio {...{
                    portfolios: trimmedPortfolios,
                    homeSectionDetails: trimmedHomeSectionDetails,
                    portfolioSectionDetails,
                    markets: trimmedMarkets,
                    studios: trimmedStudios,
                }} />
            </>
        )
    } catch (error) {
        logError("Error fetching Portfolio page data:", error);
    }
}