import Project from "@/components/project";
import { getPortfolio, getPortfolioSectionDetails, getSinglePortfolio, listAllPortfolios } from "@/services/portfolio";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
    try {
        const projectsData = await listAllPortfolios();
        const paths = projectsData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const singlePortfolio = await getSinglePortfolio(slug);

        return (
            <Project slug={slug} singlePortfolio={singlePortfolio} />
        );
    } catch (error) {
        notFound();
    }
}
