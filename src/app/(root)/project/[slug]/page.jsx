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

        // Trim to only fields used by Project -> PortfolioIntoSection/GallerySection/ProductCartSlider
        const trimmedSinglePortfolio = {
            portfolioRef: singlePortfolio?.portfolioRef ? {
                title: singlePortfolio.portfolioRef.title,
                description: singlePortfolio.portfolioRef.description,
                coverImage: {
                    imageInfo: singlePortfolio?.portfolioRef?.coverImage?.imageInfo,
                },
                // keep only details sections used in UI
                details: Array.isArray(singlePortfolio?.portfolioRef?.details)
                    ? singlePortfolio.portfolioRef.details
                        .filter((d) => ["INSIGHTS", "HIGHLIGHTS", "CHALLENGES", "SOLUTIONS"].includes(d?.label))
                        .map((d) => ({ label: d?.label, text: d?.text }))
                    : undefined,
            } : undefined,
            markets: Array.isArray(singlePortfolio?.markets) ? singlePortfolio.markets.map((m) => ({
                cardname: m?.cardname,
                marketTags: m?.marketTags,
            })) : [],
            // gallery images consumed directly as URLs
            galleryImages: singlePortfolio?.galleryImages || [],
            storeProducts: Array.isArray(singlePortfolio?.storeProducts)
                ? singlePortfolio.storeProducts
                    .filter((x) => x && x._id)
                    .map((p) => ({
                        _id: p._id,
                        slug: p.slug,
                        name: p.name,
                        mainMedia: p.mainMedia,
                        productOptions: p.productOptions
                            ? {
                                ...(p.productOptions.Color
                                    ? { Color: { choices: (p.productOptions.Color.choices || []).map((c) => ({ mainMedia: c?.mainMedia })) } }
                                    : {}),
                                ...(p.productOptions["Color "]
                                    ? { ["Color "]: { choices: (p.productOptions["Color "]?.choices || []).map((c) => ({ mainMedia: c?.mainMedia })) } }
                                    : {}),
                            }
                            : undefined,
                    }))
                : [],
        };
        return (
            <>
                <Project slug={slug} singlePortfolio={trimmedSinglePortfolio} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Project page data:", error);
        notFound();
    }
}
