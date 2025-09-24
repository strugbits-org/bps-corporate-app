import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import "../../public/assets/custom.css";
import CustomScripts from "@/components/common/CustomScript";
import { ExternalTriggers } from "@/components/common/ExternalTriggers";
import Wrapper from "@/components/common/Wrapper";
import Cookies from "@/components/common/Cookies";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/header/Navbar";
import Footer from "@/components/footer/Footer";

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Suspense } from "react";
import { fetchLayoutData } from "@/services/layoutFetcher";
import dynamic from 'next/dynamic';

const ContactUsModal = dynamic(() => import("@/components/Lightbox/modalComponents/ContactUsModal"), { ssr: false });
const AboutUsVideoModal = dynamic(() => import("@/components/Lightbox/modalComponents/AboutUsVideoModal"), { ssr: false });
const AboutUsMagazineModal = dynamic(() => import("@/components/Lightbox/modalComponents/AboutUsMagazineModal"), { ssr: false });
const MarketsVideoModal = dynamic(() => import("@/components/Lightbox/modalComponents/MarketsVideoModal"), { ssr: false });
const DreamBigSection = dynamic(() => import("@/components/common/DreamBigSection"));
const Chat = dynamic(() => import("@/components/common/Chat"), { ssr: false });
const StudiosFixedMenu = dynamic(() => import("@/components/common/StudiosFixedMenu"));
const SocialSection = dynamic(() => import("@/components/common/SocialSection"));

export const metadata = {
  title: "Blueprint Studios",
  robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" ? "noindex,nofollow" : null,
};

export default async function RootLayout({ children }) {

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const {
    studios,
    markets,
    socialSectionBlogs,
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
    instaFeed,
    chatConfig,
    chatTriggerEvents
  } = await fetchLayoutData(BASE_URL);

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
            <Navbar studios={studios} markets={markets} searchContent={searchContent} searchPagesData={searchPagesData} />
          </Suspense>
          <Wrapper>
            <main className={"min-h-100"}>
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
            <DreamBigSection data={dreamBigData} />
            <SocialSection data={socialSectionDetails} posts={socialSectionBlogs} insta_feed={instaFeed} />
            <Footer menu={navigationMenu} footerData={footerData} contactData={contactData} socialLinks={socialLinks} />
          </Wrapper>
          <StudiosFixedMenu data={studios} />
          <Chat config={chatConfig} triggerEvents={chatTriggerEvents} />

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