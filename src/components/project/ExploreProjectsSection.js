"use client"
import { generateImageUrl2 } from "@/utils/generateWixURL";
import DelayedLink from "../common/DelayedLink";
import React from "react";
import { DefaultButton } from "../common/DefaultButton";

const ExploreProjectsSection = ({
  portfolioSectionDetails,
  portfolioCollection,
}) => {
  return (
    <section className="project-explore-projects pt-lg-310 pt-tablet-100 pt-phone-160 pb-lg-190 pb-mobile-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2
              className="fs--60 text-center mb-lg-45 mb-tablet-35 mb-phone-40 split-words"
              data-aos="d:loop"
            >
              {portfolioSectionDetails?.otherProjectsTitle}
            </h2>

            <div className="slider-content-mobile">
              <div className="swiper-container">
                <div className="swiper-wrapper list-portfolio list-slider-mobile grid-lg-25">
                  {portfolioCollection?.map((data, index) => (
                    <div key={index} className="swiper-slide grid-item">
                      <DelayedLink
                        to={`/project/${data.slug}`}
                        className="link-portfolio link-portfolio-animation"
                        attributes={{
                          "data-aos": "d:loop",
                        }}
                      >
                        <div
                          className="container-img bg-blue"
                          data-cursor-style="view"
                        >
                          <div className="wrapper-img">
                            <img
                              src={generateImageUrl2({
                                wix_url:
                                  data?.portfolioRef.coverImage.imageInfo,
                                w: "470",
                                h: "580",
                                q: "90",
                              })}
                              data-preload
                              className="media"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="container-text">
                          <ul className="list-tags-small">
                            {data.markets.map((market, index) => (
                              <li key={index} className={"tag-small"}>
                                <span>{market.cardname}</span>
                              </li>
                            ))}
                            {data.studios.map((studio, index) => (
                              <React.Fragment key={index}>
                                {index < 2 && (
                                  <li className={"tag-small"}>
                                    <span>{studio.cardName}</span>
                                  </li>
                                )}
                              </React.Fragment>
                            ))}
                            {data.studios.length > 2 ? (
                              <li className="tag-small">
                                <span>+{data.studios.length - 2} studios</span>
                              </li>
                            ) : null}
                          </ul>
                          <h2 className="title-portfolio">
                            {data?.portfolioRef.title}
                          </h2>
                        </div>
                      </DelayedLink>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-lg-2 offset-lg-5 flex-center mt-lg-60 mt-mobile-40"
            data-aos="fadeIn .8s ease-in-out .2s, d:loop"
          >
            <DefaultButton
              customClasses={"btn-border-blue"}
              data={{
                label: portfolioSectionDetails?.seeMoreButtonText,
                action: portfolioSectionDetails?.seeMoreButtonAction,
              }}
              attributes={{
                "data-cursor-style": "off",
              }}
            ></DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreProjectsSection;
