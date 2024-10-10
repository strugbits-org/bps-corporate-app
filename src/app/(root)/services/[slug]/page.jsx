import Services from "@/components/services";
import { getStudiosSectionData } from "@/services/home";
import { getServiceData, getServicesSlider } from "@/services/services-page";
import { notFound } from "next/navigation";

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
        const servicesSlider = await getServicesSlider(serviceData._id);

        return (
            <Services serviceData={serviceData} servicesSlider={servicesSlider} />
        );
    } catch (error) {
        notFound();
    }
}
