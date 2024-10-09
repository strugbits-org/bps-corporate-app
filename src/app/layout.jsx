import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import "../../public/assets/custom.css";
import CustomScripts from "@/components/common/CustomScript";
import { ExternalTriggers } from "@/components/common/ExternalTriggers";
import Wrapper from "@/components/common/Wrapper";
import Cookies from "@/components/common/Cookies";
import Loading from "@/components/common/Loading";
import Navbar from "@/components/header/Navbar";
import { fetchInstaFeed, getMarketsSectionData, getSearchSectionDetails, getSocialSectionBlogs, getSocialSectionDetails, getStudiosSectionData } from "@/services/home/index.js";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/services/footer";
import { getContactUsContent } from "@/services/contact";
import { getAboutUsIntroSection, getAboutUsSectionDetails } from "@/services/about";
import Footer from "@/components/footer/Footer";
import SocialSection from "@/components/commonComponents/SocialSection";

export const metadata = {
  title: "Blueprint Studios",
  description: "",
};

export default async function RootLayout({ children }) {

  const [
    studios,
    markets,
    searchContent,
    footerData,
    contactData,
    socialLinks,
    navigationMenu,
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed
  ] = await Promise.all([
    getStudiosSectionData(true),
    getMarketsSectionData(true),
    getSearchSectionDetails(true),
    getFooterData(true),
    getContactData(true),
    getSocialLinks(true),
    getFooterNavigationMenu(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
  ]);

  return (
    <>
      <CustomScripts />
      <html lang="en">
        <body>
          <ExternalTriggers />
          <Loading />
          <Cookies />
          <Navbar studios={studios} markets={markets} searchContent={searchContent} />
          <Wrapper>
            <main>
              {children}
              {/* <Analytics /> */}
              {/* <SpeedInsights /> */}
            </main>
            <SocialSection data={socialSectionDetails} posts={socialSectionBlogs} insta_feed={instaFeed} />
            <Footer menu={navigationMenu} footerData={footerData} contactData={contactData} socialLinks={socialLinks} />
          </Wrapper>
        </body>
      </html>
    </>
  );
}
