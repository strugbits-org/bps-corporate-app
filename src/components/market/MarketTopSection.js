import { getFullVideoURL } from "@/utils/generateWixURL"
import { DefaultButton } from "../common/DefaultButton"
import { ImageWrapper } from "../common/ImageWrapper"

const MarketTopSection = ({ data }) => {

  return (
    <>
      <section className="market-intro">
        <div
          className="container-fluid pos-relative z-5"
          data-parallax-top
          data-translate-y="20rem"
        >
          <div className="row">
            <div className="col-lg-4 offset-lg-4 column-1 white-1">
              <div className="container-text text-center">
                <h1
                  className="fs--90 fs-phone-60 split-chars"
                  data-aos="d:loop"
                >
                  {data?.cardname}
                </h1>
                <p
                  className="fs--40 fs-tablet-40 text text-center mt-20"
                  data-aos="fadeInUp .8s ease-out-cubic .5s, d:loop"
                >
                  {data?.description}
                </p>
                <DefaultButton
                  customClasses={"btn-blue mt-lg-20 mt-tablet-65 mt-phone-40"}
                  data={{
                    label: data?.buttonText,
                    action: data?.buttonAction
                  }}
                  attributes={{
                    "data-aos": "fadeInUp .8s ease-out-cubic .6s, d:loop",
                    "data-cursor-style": "off",
                  }}
                ></DefaultButton>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-img bg-blue-2"
          data-parallax-top
          data-translate-y="20rem"
          data-scale="1.2"
        >
          <ImageWrapper url={data?.image} customClasses={"media"} attributes={{ "data-preload": "", "data-aos": "scaleOut .8s ease-out-cubic .2s, d:loop" }} />
        </div>
      </section>

      <section className="market-video">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 offset-lg-4 column-1">
              <div className="container-img market-intro-video" data-aos="d:loop">
                <video
                  data-src={getFullVideoURL(data?.video)}
                  src={getFullVideoURL(data?.video)}
                  data-preload
                  className="player-video media"
                  loop
                  playsInline
                ></video>
              </div>
            </div>
            <div className="col-lg-6 col-md-9 offset-lg-3 column-2 mx-tablet-auto mt-md-35 mt-mobile-50">
              <h2
                className="fs--40 fs-tablet-40 fs-phone-30 blue-3 text-center"
                data-aos="fadeInUp .8s ease-out-cubic .1s, d:loop, trigger:.column-2"
              >
                {data?.heroSectionTitle}
              </h2>

              <div
                className="container-text fs-16 font-2 text-center white-1 mt-lg-20 mt-mobile-40"
                data-aos="fadeInUp .8s ease-out-cubic .3s, d:loop, trigger:.column-2"
              >
                <p style={{ whiteSpace: "preserve-breaks" }}>
                  {data?.heroSectionDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MarketTopSection