import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import Market from "@/components/market";
import { getPageMetaData } from "@/services";
import { getMarketsSectionData } from "@/services/home";
import { fetchMarketPortfolios, getMarketSection } from "@/services/market";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        
        const [
            metaData,
            marketSection
        ] = await Promise.all([
            getPageMetaData("market"),
            getMarketSection(slug)
        ]);

        const { title, noFollowTag } = metaData;
        const fullTitle = title + marketSection.cardname;
        const description = marketSection.description;

        const metadata = {
            title: fullTitle,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Market):", error);
    }
}

export const generateStaticParams = async () => {
    try {
        const marketsData = await getMarketsSectionData();
        const paths = marketsData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        logError("Error generating static params for Market:", error);
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const marketSection = await getMarketSection(slug);
        if (!marketSection) {
            throw new Error("Not found");
        }
        const portfolioData = await fetchMarketPortfolios({ id: marketSection._id });

        return (
            <>
                <Market slug={slug} marketSection={marketSection} portfolioData={portfolioData} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Market page data: ", error);
        notFound();
    }
}
