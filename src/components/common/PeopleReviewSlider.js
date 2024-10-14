import { DefaultButton } from "./DefaultButton";
import { ImageWrapper } from "./ImageWrapper";

const PeopleReviewSLider = ({ data, homeSectionDetails, actionButton = true }) => {

  return (

    <section className={`section-heres-what-people-are-saying pt-lg-300 pt-tablet-105 pt-phone-145 pb-lg-130 pb-tablet-100 pb-phone-145 pos-relative ${data.length === 0 ? "hidden" : ""}`}>
      <div className="container-fluid pos-relative z-3">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 column-1">
            <h2
              className="fs--80 white-1 title text-center split-words"
              data-aos="d:loop"
            >
              {homeSectionDetails.reviewsTitle}
            </h2>
          </div>
          <div className="col-lg-10 offset-lg-1 mt-lg-120 mt-tablet-100 mt-phone-45">
            <div className="slider-testimony" data-aos="d:loop">
              <div className="swiper-container">
                {/* <!-- Additional required wrapper --> */}
                <div className="swiper-wrapper">
                  {/* <!-- Slides --> */}
                  {data.map((data, index) => {
                    return (
                      <div key={index} className="swiper-slide">
                        <div className="wrapper-content">
                          <div className="container-img">
                            <ImageWrapper url={data?.image} defaultDimensions={{ width: 600, height: 600 }} customClasses={"media"} attributes={{ "data-preload": "" }} />
                          </div>
                          <div className="container-text">
                            <p className="testimony">{data.description}</p>
                            <div className="container-profile">
                              <div className="name">{data.name}</div>
                              <div className="occupation">
                                {data.occupation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev no-mobile">
                <span>Back</span>
              </div>
              <div className="swiper-button-next no-mobile">
                <span>Next</span>
              </div>
              <div className="swiper-pagination no-mobile"></div>
            </div>
          </div>
          {actionButton && <div className="col-lg-4 offset-lg-4 mt-lg-45 mt-tablet-90 mt-phone-25 flex-center column-btn">
            <DefaultButton
              data={{
                label: homeSectionDetails.reviewsButtonLabel,
                action: homeSectionDetails.reviewsButtonAction
              }}
            ></DefaultButton>
          </div>
          }
        </div>
      </div>
    </section>
  );
};

export default PeopleReviewSLider;
