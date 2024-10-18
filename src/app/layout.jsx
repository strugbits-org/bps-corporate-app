import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import "../../public/assets/custom.css";
import CustomScripts from "@/components/common/CustomScript";
import { ExternalTriggers } from "@/components/common/ExternalTriggers";
import Wrapper from "@/components/common/Wrapper";
import Cookies from "@/components/common/Cookies";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/header/Navbar";
import { fetchInstaFeed, getDreamBigData, getMarketsSectionData, getSearchSectionDetails, getSocialSectionDetails, getStudiosSectionData } from "@/services/home/index.js";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/services/footer";
import Footer from "@/components/footer/Footer";
import SocialSection from "@/components/common/SocialSection";
import ContactUsModal from "@/components/Lightbox/modalComponents/ContactUsModal";
import AboutUsVideoModal from "@/components/Lightbox/modalComponents/AboutUsVideoModal";
import AboutUsMagazineModal from "@/components/Lightbox/modalComponents/AboutUsMagazineModal";
import MarketsVideoModal from "@/components/Lightbox/modalComponents/MarketsVideoModal";
import { getContactUsContent } from "@/services/contact";
import { getAboutUsIntroSection, getAboutUsSectionDetails } from "@/services/about";
import DreamBigSection from "@/components/common/DreamBigSection";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";
import { getAllBlogs } from "@/services/blog";
import { getChatConfiguration, searchAllPages } from "@/services";
import { listAllPortfolios } from "@/services/portfolio";
import Chat from "@/components/common/Chat";

export const metadata = {
  title: "Blueprint Studios",
  robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" ? "noindex,nofollow" : null,
};

export default async function RootLayout({ children }) {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  
  const [
    studios,
    markets,
    searchContent,
    searchPagesData,
    footerData,
    navigationMenu,
    contactData,
    socialLinks,
    contactUsContent,
    aboutUsIntroSection,
    aboutUsSectionDetails,
    dreamBigData,
    socialSectionDetails,
    blogs,
    instaFeed,
    portfolios,
    chatConfig
  ] = await Promise.all([
    getStudiosSectionData(),
    getMarketsSectionData(),
    getSearchSectionDetails(),
    searchAllPages(),
    getFooterData(),
    getFooterNavigationMenu(),
    getContactData(),
    getSocialLinks(),
    getContactUsContent(),
    getAboutUsIntroSection(),
    getAboutUsSectionDetails(),
    getDreamBigData(),
    getSocialSectionDetails(),
    getAllBlogs(),
    fetchInstaFeed(),
    listAllPortfolios(),
    getChatConfiguration(BASE_URL)
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
          <MarketsVideoModal markets={markets} />

          <Suspense>
            <Navbar studios={studios} markets={markets} searchContent={searchContent} searchPagesData={searchPagesData} blogs={blogs} portfolios={portfolios} />
          </Suspense>
          <Wrapper>
            <main className={"min-h-100"}>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <DreamBigSection data={dreamBigData} />
            <SocialSection data={socialSectionDetails} posts={blogs.slice(0, 8)} insta_feed={instaFeed} />
            <Footer menu={navigationMenu} footerData={footerData} contactData={contactData} socialLinks={socialLinks} />
          </Wrapper>
          <Chat config={chatConfig} />

          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WBJ97DL"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
          <noscript>
            <img height="1" width="1" style={{ display: "none" }} alt=""
              src="https://ct.pinterest.com/v3/?event=init&tid=2613816880133&noscript=1" />
          </noscript>
        </body>
      </html>
    </>
  );
}

const time = +process.env.NEXT_PUBLIC_REVALIDATE_TIME || 86400;
export const revalidate = time;