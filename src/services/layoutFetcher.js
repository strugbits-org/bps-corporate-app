"use server";
import { fetchInstaFeed, getDreamBigData, getMarketsSectionData, getSearchSectionDetails, getSocialSectionDetails, getStudiosSectionData } from "@/services/home/index.js";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/services/footer";
import { getContactUsContent } from "@/services/contact";
import { getAboutUsIntroSection, getAboutUsSectionDetails } from "@/services/about";
import { fetchSocialSectionBlogs } from "@/services/blog";
import { getChatConfiguration, getChatTriggerEvents, searchAllPages } from "@/services";
import queryDataItems from "./queryWixData";
import { logError } from "@/utils/utilityFunctions";

export async function fetchLayoutData(baseUrl) {
  const [
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
  ] = await Promise.all([
    getStudiosSectionData(),
    getMarketsSectionData(),
    fetchSocialSectionBlogs(),
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
    fetchInstaFeed(),
    getChatConfiguration(baseUrl),
    getChatTriggerEvents()
  ]);
  // Trim instaFeed to only the fields actually used by the UI
  const minimalInstaFeed = Array.isArray(instaFeed)
    ? instaFeed.map((item) => ({
      image: item?.image,
      caption: item?.caption,
      permalink: item?.permalink,
    }))
    : [];



  // Trim chat config to only required fields
  const minimalChatConfig = chatConfig ? { widget: chatConfig.widget } : undefined;

  // Trim chat trigger events to required fields
  const minimalChatTriggerEvents = Array.isArray(chatTriggerEvents)
    ? chatTriggerEvents
      .map((event) => ({
        slug: event?.slug,
        title: event?.title,
        trigger: event?.trigger,
        value: event?.value,
      }))
    : [];

  // Trim search content copy keys used in UI
  const minimalSearchContent = searchContent
    ? {
      studiosTitle: searchContent.studiosTitle,
      rentalTitle: searchContent.rentalTitle,
      portfolioTitle: searchContent.portfolioTitle,
      marketsTitle: searchContent.marketsTitle,
      blogTitle: searchContent.blogTitle,
      otherPagesTitle: searchContent.otherPagesTitle,
    }
    : undefined;


  // Trim search pages to required fields
  const minimalSearchPagesData = Array.isArray(searchPagesData)
    ? searchPagesData.map((p) => ({
      content: p?.content,
      path: p?.path,
      title: p?.title,
      description: p?.description,
      redirectToRentals: p?.redirectToRentals,
      orderNumber: p?.orderNumber,
    }))
    : [];

  // Footer data minimal
  const minimalFooterData = footerData
    ? {
      logo1: footerData.logo1,
      logo2: footerData.logo2,
      logo3: footerData.logo3,
      heading: footerData.heading,
      newsletterTitle: footerData.newsletterTitle,
      newsletterDescription: footerData.newsletterDescription,
      newsletterPlaceholder: footerData.newsletterPlaceholder,
      newsletterSubmitButtonText: footerData.newsletterSubmitButtonText,
      copyright: footerData.copyright,
    }
    : undefined;

  // Navigation menu minimal
  const minimalNavigationMenu = Array.isArray(navigationMenu)
    ? navigationMenu.map((item) => ({
      _id: item?._id,
      title: item?.title,
      action: item?.action,
      actionTargetCorporate: item?.actionTargetCorporate,
    }))
    : [];


  // Contact data minimal
  const minimalContactData = Array.isArray(contactData)
    ? contactData.map((c) => ({
      city: c?.city,
      address1: c?.address1,
      address2: c?.address2,
      address3: c?.address3,
      phone1: c?.phone1,
      phone2: c?.phone2,
    }))
    : [];

  // Social links minimal
  const minimalSocialLinks = Array.isArray(socialLinks)
    ? socialLinks.map((s) => ({
      link: s?.link,
      icon: s?.icon
    }))
    : [];

  // Contact us content minimal
  const minimalContactUsContent = contactUsContent
    ? {
      formTitle: contactUsContent.formTitle,
      firstNamePlaceholder: contactUsContent.firstNamePlaceholder,
      lastNamePlaceholder: contactUsContent.lastNamePlaceholder,
      emailPlaceholder: contactUsContent.emailPlaceholder,
      messageBoxPlaceholder: contactUsContent.messageBoxPlaceholder,
      formSubmitButton: contactUsContent.formSubmitButton,
      sfPhone: contactUsContent.sfPhone,
      lvPhone: contactUsContent.lvPhone,
      infoEmail: contactUsContent.infoEmail,
    }
    : undefined;

  // About modals minimal
  const minimalAboutUsIntroSection = aboutUsIntroSection
    ? { lightboxVideo: aboutUsIntroSection.lightboxVideo }
    : undefined;
  const minimalAboutUsSectionDetails = aboutUsSectionDetails
    ? { magazineEmbededCode: aboutUsSectionDetails.magazineEmbededCode }
    : undefined;

  // Dream big minimal
  const minimalDreamBigData = dreamBigData
    ? {
      desktopBackgroundImage: dreamBigData.desktopBackgroundImage,
      mobileBackgroundImage: dreamBigData.mobileBackgroundImage,
      buttonText: dreamBigData.buttonText,
      buttonAction: dreamBigData.buttonAction,
      paragraph1: dreamBigData.paragraph1,
      paragraph2: dreamBigData.paragraph2,
    }
    : undefined;

  // Social section details minimal
  const minimalSocialSectionDetails = socialSectionDetails
    ? {
      title: socialSectionDetails.title,
      description: socialSectionDetails.description,
      pinterestUrl: socialSectionDetails.pinterestUrl,
      pinterestFeedTitle: socialSectionDetails.pinterestFeedTitle,
      blogsTitle: socialSectionDetails.blogsTitle,
      instaFeedTitle: socialSectionDetails.instaFeedTitle,
    }
    : undefined;

  return {
    studios,
    markets,
    socialSectionBlogs,
    searchContent: minimalSearchContent,
    searchPagesData: minimalSearchPagesData,
    footerData: minimalFooterData,
    navigationMenu: minimalNavigationMenu,
    contactData: minimalContactData,
    socialLinks: minimalSocialLinks,
    contactUsContent: minimalContactUsContent,
    aboutUsIntroSection: minimalAboutUsIntroSection,
    aboutUsSectionDetails: minimalAboutUsSectionDetails,
    dreamBigData: minimalDreamBigData,
    socialSectionDetails: minimalSocialSectionDetails,
    instaFeed: minimalInstaFeed,
    chatConfig: minimalChatConfig,
    chatTriggerEvents: minimalChatTriggerEvents
  };
}

export const fetchPortfoliosDataClient = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "PortfolioCollection",
      "includeReferencedItems": ["portfolioRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "gallery", "media"],
      "ne": [
        {
          "key": "isHidden",
          "value": true
        }
      ]
    });
    if (!response._items) {
      throw new Error("No data found for PortfolioCollection");
    }
    return response._items.map((x) => x.data);
  } catch (error) {
    logError("Failed to fetch portfolios data:", error);
    return [];
  }
};

export const fetchBlogsDataClient = async () => {
  try {
    const response = await queryDataItems({
      "dataCollectionId": "BlogProductData",
      "includeReferencedItems": ["blogRef", "locationFilteredVariant", "storeProducts", "studios", "markets", "gallery", "media", "author"],
      "limit": "infinite",
      "ne": [
        {
          "key": "isHidden",
          "value": true
        },
      ],
    });
    if (!response._items) {
      throw new Error("No data found for BlogProductData");
    }
    return response._items.filter(item => item.data.blogRef._id !== undefined).map(item => item.data);
  } catch (error) {
    logError("Failed to fetch blogs data:", error);
    return [];
  }
};