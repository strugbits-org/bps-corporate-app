import { generateImageURL } from "@/common/functions/imageURL";
import { DefaultButton } from "../commonComponents/DefaultButton";

const ServiceIntro = ({ data }) => {

  return (
    <>
      <section className="services-intro">
        <div
          className="container-fluid pos-relative z-5"
          data-parallax-top
          data-translate-y="20rem"
        >
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="container-text text-center">
                <h1
                  className="fs--90 fs-phone-60 white-1 split-chars"
                  data-aos="d:loop"
                >
                  {data?.cardName}
                </h1>
                <p
                  className="fs--40 fs-tablet-18 white-1 mt-lg-20 mt-mobile-15"
                  data-aos="fadeInUp .8s ease-out-cubic .5s, d:loop"
                >
                  {data?.cardDescription}
                </p>

                <DefaultButton
                  customClasses={"btn-blue mt-lg-50 mt-tablet-60 mt-phone-55"}
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
          className="container-img bg-img"
          data-parallax-top
          data-translate-y="20rem"
          data-scale="1.2"
        >
          <img
            src={generateImageURL({ wix_url: data?.image, q: "90" })}
            data-preload
            className="media"
            alt=""
            data-aos="scaleOut 1.2s ease-out-cubic 0s, d:loop"
          />
        </div>
      </section>

    </>
  );
};

export default ServiceIntro;