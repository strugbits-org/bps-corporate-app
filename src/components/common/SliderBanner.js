"use client"
import { useRouter } from "next/navigation";
import DelayedLink from "./DelayedLink";
import { ImageWrapper } from "./ImageWrapper";

const SliderBanner = ({ data, type, sectionDetails }) => {
  const router = useRouter();

  if (data.length === 0) return;

  const handleNavigate = (path) => {
    if (typeof window !== 'undefined') {
      document.body.classList.add("page-leave-active");
    }
    setTimeout(() => {
      router.push(path)
    }, 900);
  }
  return (
    <section className="section-slider-banner">
      <div className="slider-banner banner-about" data-aos="d:loop">
        <div className="swiper-container" data-play-toggle>
          {/* <!-- Additional required wrapper --> */}
          <div className="swiper-wrapper">
            {/* <!-- Slides --> */}
            {data?.map((data, index) => {
              return (
                <div key={index} className="swiper-slide">
                  <DelayedLink>
                    <div
                      onClick={() => handleNavigate(`/project/${data?.portfolioRef?.slug}`)}
                      className="container-img"
                    >
                      <ImageWrapper url={data?.portfolioRef?.coverImage?.imageInfo} type={"2"} defaultDimensions={{ width: 1920, height: 1180 }} customClasses={"media"} attributes={{ "data-parallax": "", "data-scale-from": "1.3" }} />
                    </div>
                    <div className="container-project">
                      <h4 className="project split-words">
                        {data?.portfolioRef?.title}
                      </h4>
                      <ul className="list-tags">
                        {data?.markets.map((data, index) => (
                          <li key={index}>
                            <span>{data?.cardname}</span>
                          </li>
                        ))}
                      </ul>
                      {type && (
                        <div className="container-btn-top">
                          <div
                            className="btn-border-white btn-top mt-30"
                            data-cursor-style="off"
                            onClick={() => handleNavigate("/contact")}
                          >
                            <span>Get in touch with us</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="container-title">
                      <h3 className="title split-words">
                        {sectionDetails?.portfolioSectionTitle} <br />
                        {sectionDetails?.portfolioSectionTitleLine2}
                      </h3>

                      <div className="container-btn-bottom">
                        {type ? (
                          <div
                            className="btn-blue btn-bottom"
                            data-cursor-style="off"
                            onClick={() => handleNavigate("/portfolio")}
                          >
                            <span>{sectionDetails?.portfolioSectionButtonText}</span>
                            <i className="icon-arrow-right"></i>
                          </div>
                        ) : (
                          <div
                            className="btn-border-white btn-bottom btn-about"
                            data-cursor-style="off"
                            onClick={() => handleNavigate("/portfolio")}
                          >
                            <span>{sectionDetails?.portfolioSectionButtonText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </DelayedLink>
                </div>
              );
            })}
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};
export default SliderBanner;
