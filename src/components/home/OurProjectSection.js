import DelayedLink from "../common/DelayedLink";
import { DefaultButton } from "../common/DefaultButton";
import { ImageWrapper } from "../common/ImageWrapper";

const OurProjectSection = ({ portfolioCollection, homeSectionDetails }) => {
  return (
    <section
      className={`home-some-of-our-projects pt-lg-250 pt-mobile-130 pb-135 ${portfolioCollection.length === 0 ? "hidden" : ""
        }`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2
              className="fs--80 text-center mb-35 split-words"
              data-aos="d:loop"
            >
              {homeSectionDetails.projectsTitle}
            </h2>

            <div className="slider-some-of-our-projects slider-content-mobile">
              <div className="swiper-container">
                <div className="swiper-wrapper list-projects slider-mobile font-80">
                  {portfolioCollection.map((item, index) => {
                    return (
                      <div key={index} className="swiper-slide list-item">
                        <DelayedLink
                          to={`/project/${item.slug}`}
                          className="project-link animation-project-link"
                          attributes={{
                            "data-cursor-style": "view",
                            "data-aos": "d:loop",
                          }}
                        >
                          <div className="container-img bg-blue">
                            <div className="wrapper-img">
                              <ImageWrapper url={item?.portfolioRef?.coverImage?.imageInfo} type={"2"} defaultDimensions={{ width: "800", height: "800" }} customClasses={"media"} attributes={{ "data-preload": "" }} />
                            </div>
                          </div>
                          <div className="container-text">
                            <h3 className="title-project">
                              {item.portfolioRef.title}
                            </h3>
                            <ul className="list-tags">
                              {item.studios.map((tag, index) => (
                                <li key={index}>
                                  <span>{tag.cardName}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </DelayedLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-4 mt-lg-60 mt-mobile-40 flex-center">
            <DefaultButton
              data={{
                label: homeSectionDetails.projectsButtonLabel,
                action: homeSectionDetails.projectsButtonAction
              }}
            ></DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProjectSection;
