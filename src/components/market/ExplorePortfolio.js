import DelayedLink from "../common/DelayedLink";
import { DefaultButton } from "../common/DefaultButton";
import { ImageWrapper } from "../common/ImageWrapper";
import SliderClients from "../common/SliderClients";

const ExplorePortfolio = ({ clientsGallery, marketSectionDetails, portfolioCollection }) => {
  if (!portfolioCollection) return;
  return (
    <section className="market-explore-portfolio overflow-hidden pt-lg-270 pb-lg-220 py-tablet-100 pt-phone-145 pb-phone-190">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4">
            <h2 className="fs--60 text-center split-chars" data-aos="d:loop">
              {marketSectionDetails?.portfolioSectionTitle}
            </h2>
          </div>
          <div className="col-lg-12 mt-40">
            <div className="slider-content-mobile">
              <div className="swiper-container">
                {/* <!-- Additional required wrapper --> */}
                <div
                  className="swiper-wrapper list-explore-portfolio list-slider-mobile grid-lg-25"
                  data-aos="d:loop"
                >
                  {/* <!-- Slides --> */}
                  {portfolioCollection?.map((item, index) => {
                    return (
                      <div key={index} className="swiper-slide grid-item">
                        <DelayedLink to={`/project/${item.slug}`} className="link">
                          <div className="img-wrapper">
                            <div
                              className="container-img"
                              data-cursor-style="view"
                            >
                              <ImageWrapper url={item?.portfolioRef?.coverImage?.imageInfo} type={"2"} customClasses={"media"} attributes={{ "data-preload": "" }} />
                            </div>
                          </div>
                          <h3 className="title-portfolio split-words">
                            {item.portfolioRef.title}
                          </h3>
                        </DelayedLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={`section-clients mt-lg-60 mt-mobile-40 col-12 ${clientsGallery.length === 0 ? "hidden" : ""}`}>
            <SliderClients data={clientsGallery} />
          </div>
          <div className="col-lg-2 offset-lg-5 flex-center mt-50 column-btn">
            <DefaultButton
              customClasses={"btn-border-blue"}
              showArrow={false}
              data={{
                label: marketSectionDetails?.portfolioSectionButtonText,
                action: marketSectionDetails?.portfolioSectionButtonAction
              }}
              attributes={{
                "data-aos": "fadeInUp .8s ease-out-cubic 0s, d:loop, trigger:.column-btn",
                "data-cursor-style": "off",
              }}
            ></DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplorePortfolio