import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import Market from "@/components/market";
import { getMarketsSectionData } from "@/services/home";
import { fetchPortfolio, getMarketSection } from "@/services/market";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    try {
        const marketsData = await getMarketsSectionData();
        const paths = marketsData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const marketSection = await getMarketSection(slug);
        const portfolioData = await fetchPortfolio({ id: marketSection._id });

        return (
            <>
                <Market slug={slug} marketSection={marketSection} portfolioData={portfolioData} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        notFound();
    }
}
