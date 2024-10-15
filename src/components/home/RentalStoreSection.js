import React from "react";
import DelayedLink from "../common/DelayedLink";
import { DefaultButton } from "../common/DefaultButton";
import { ImageWrapper } from "../common/ImageWrapper";

const RentalStoreSection = ({ data, homeSectionDetails, rentalStoreSubtitle }) => {
  let transition = -35;

  return (
    <section className={`home-rental-store pt-lg-145 pt-tablet-105 pt-phone-145 pb-lg-120 pb-tablet-100 pb-phone-145 ${data.length === 0 ? "hidden" : ""}`}>
      <div
        className="bg"
        data-parallax
        data-translate-y-from="50vh"
        data-end="top 40%"
        data-parallax-no-phone
        data-parallax-no-tablet
        data-trigger=".home-rental-store"
      ></div>

      <div className="container-fluid pos-relative z-5">
        <div className="row">
          <div
            className="col-lg-6 offset-lg-3 column-1"
            data-parallax
            data-translate-y-from="30rem"
            data-parallax-no-phone
            data-parallax-no-tablet
            data-opacity-from="0"
            data-start="top 55%"
            data-end="top 20%"
            data-trigger=".home-rental-store"
          >
            <h2 className="fs--100 text-center white-1">{homeSectionDetails.rentalStoreTitle}</h2>
            <p className="fs--50 fs-phone-18 white-1 paragraph mt-lg-15 mt-tablet-30 mt-phone-10">
              {rentalStoreSubtitle.map((item, index) => (
                <React.Fragment key={index}>
                  {item.text}
                  {item.image &&
                    <span>
                      <ImageWrapper url={item.image} fit={"fit"} defaultDimensions={{ width: 60, height: 60 }} customClasses={"img-1 media"} attributes={{ "data-preload": "" }} />
                    </span>
                  }
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="col-lg-12 column-2 mt-lg-140 mt-mobile-40">
            <ul className="list-rental-store">
              {data.map((item, index) => {
                const translateYFrom = `${transition - 15 * index}rem`;
                return (
                  <li
                    key={index}
                    data-parallax
                    data-translate-y-from={translateYFrom}
                    data-parallax-no-phone
                    data-parallax-no-tablet
                    data-start="top 85%"
                    data-end="20% 40%"
                    data-trigger=".home-rental-store"
                  >
                    <DelayedLink
                      target={"_blank"}
                      to={item.productUrl}
                      className="link"
                      attributes={{
                        "data-cursor-style": "view",
                      }}
                    >
                      <div className="container-img">
                        <ImageWrapper url={item?.image} defaultDimensions={{ width: 1280, height: 600 }} customClasses={"media"} attributes={{ "data-preload": "" }} />
                      </div>
                      {item.newimagetag && (
                        <div className="tag-new no-mobile">
                          <span>New</span>
                        </div>
                      )}
                    </DelayedLink>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-lg-4 offset-lg-4 flex-center mt-lg-95 mt-tablet-100 mt-phone-40 column-trigger">
            <div
              className="container-btn"
              data-aos="fadeInUp .8s ease-out-cubic 0s, d:loop, trigger:.column-trigger"
            >
              <DefaultButton
                data={{
                  label: homeSectionDetails.rentalStoreButtonLabel,
                  action: homeSectionDetails.rentalStoreButtonAction
                }}
              ></DefaultButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalStoreSection;
