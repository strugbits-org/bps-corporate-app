import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import "../../public/assets/custom.css";
import CustomScripts from "@/components/common/CustomScript";
import { ExternalTriggers } from "@/components/common/ExternalTriggers";
import Wrapper from "@/components/common/Wrapper";
import Cookies from "@/components/common/Cookies";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/header/Navbar";
import { fetchInstaFeed, getDreamBigData, getMarketsSectionData, getSearchSectionDetails, getSocialSectionBlogs, getSocialSectionDetails, getStudiosSectionData } from "@/services/home/index.js";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/services/footer";
import Footer from "@/components/footer/Footer";
import SocialSection from "@/components/commonComponents/SocialSection";
import ContactUsModal from "@/components/Lightbox/modalComponents/ContactUsModal";
import AboutUsVideoModal from "@/components/Lightbox/modalComponents/AboutUsVideoModal";
import AboutUsMagazineModal from "@/components/Lightbox/modalComponents/AboutUsMagazineModal";
import MarketsVideoModal from "@/components/Lightbox/modalComponents/MarketsVideoModal";
import { getContactUsContent } from "@/services/contact";
import { getAboutUsIntroSection, getAboutUsSectionDetails } from "@/services/about";
import DreamBigSection from "@/components/commonComponents/DreamBigSection";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";

export const metadata = {
  title: "Blueprint Studios",
  description: "",
  robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" ? "noindex,nofollow" : null,
};

export default async function RootLayout({ children }) {

  const [
    studios,
    markets,
    searchContent,
    footerData,
    navigationMenu,
    contactData,
    socialLinks,
    contactUsContent,
    aboutUsIntroSection,
    aboutUsSectionDetails,
    dreamBigData,
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed
  ] = await Promise.all([
    getStudiosSectionData(true),
    getMarketsSectionData(true),
    getSearchSectionDetails(true),
    getFooterData(true),
    getFooterNavigationMenu(),
    getContactData(true),
    getSocialLinks(true),
    getContactUsContent(true),
    getAboutUsIntroSection(true),
    getAboutUsSectionDetails(true),
    getDreamBigData(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
  ]);

  return (
    <>
      <CustomScripts />
      <html lang="en">
        <body data-scroll-direction="initial" data-search-container>
          <ExternalTriggers />
          <Loading />
          <Cookies />

          <ContactUsModal contactUsContent={contactUsContent} contactData={contactData} socialLinks={socialLinks} />
          <AboutUsVideoModal data={aboutUsIntroSection} />
          <AboutUsMagazineModal data={aboutUsSectionDetails} />
          <MarketsVideoModal />

          <Suspense>
            <Navbar studios={studios} markets={markets} searchContent={searchContent} />
          </Suspense>
          <Wrapper>
            <main>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <DreamBigSection data={dreamBigData} />
            <SocialSection data={socialSectionDetails} posts={socialSectionBlogs} insta_feed={instaFeed} />
            <Footer menu={navigationMenu} footerData={footerData} contactData={contactData} socialLinks={socialLinks} />
          </Wrapper>
        </body>
      </html>
    </>
  );
}
