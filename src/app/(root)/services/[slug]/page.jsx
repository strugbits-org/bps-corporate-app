import { AnimationLoaded } from "@/components/common/AnimationLoaded";
import Services from "@/components/services";
import { getPageMetaData } from "@/services";
import { getStudiosSectionData } from "@/services/home";
import { getServiceData, getServicesSlider } from "@/services/services-page";
import { logError } from "@/utils/utilityFunctions";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);

        const [
            metaData,
            serviceData
        ] = await Promise.all([
            getPageMetaData("services"),
            getServiceData(slug)
        ]);

        const { title, noFollowTag } = metaData;

        const fullTitle = title + serviceData.cardName;
        const description = serviceData.cardDescription;

        const metadata = {
            title: fullTitle,
            description
        };

        if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
            metadata.robots = "noindex,nofollow";
        }

        return metadata;
    } catch (error) {
        logError("Error in metadata(Services):", error);
    }
}

export const generateStaticParams = async () => {
    try {
        const servicesData = await getStudiosSectionData();
        const paths = servicesData.map((data) => ({ slug: data.slug }));
        return paths;
    } catch (error) {
        return [];
    }
}

export default async function Page({ params }) {
    try {
        const slug = decodeURIComponent(params.slug);
        const serviceData = await getServiceData(slug);
        if (!serviceData) {
            throw new Error("Not found");
        }
        const servicesSlider = await getServicesSlider(serviceData._id);

        return (
            <>
                <Services serviceData={serviceData} servicesSlider={servicesSlider} />
                <AnimationLoaded />
            </>
        );
    } catch (error) {
        logError("Error fetching Services page data:", error);
        notFound();
    }
}
