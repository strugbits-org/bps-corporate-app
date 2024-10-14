import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import Project from "@/components/project";
import { getPageMetaData } from "@/services";
import { getSinglePortfolio, listAllPortfolios } from "@/services/portfolio";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);

        const [
            metaData,
            singlePortfolio
        ] = await Promise.all([
            getPageMetaData("project"),
            getSinglePortfolio(slug)
        ]);

        const { title, noFollowTag } = metaData;
        const fullTitle = title + (singlePortfolio.seoDesc.title || singlePortfolio.portfolioRef.title);
        const description = singlePortfolio.seoDesc.description;

        const metadata = {
            title: fullTitle,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Project):", error);
    }
}

export const generateStaticParams = async () => {
    try {
        const projectsData = await listAllPortfolios();
        const paths = projectsData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        logError("Error generating static params for Projects:", error);
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const singlePortfolio = await getSinglePortfolio(slug);
        if (!singlePortfolio) {
            throw new Error("Not found");
        }

        return (
            <>
                <Project slug={slug} singlePortfolio={singlePortfolio} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Project page data:", error);
        notFound();
    }
}
