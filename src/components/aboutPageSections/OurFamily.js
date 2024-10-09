import { generateImageURL } from "@/common/functions/imageURL";
import React from "react";
import { DefaultButton } from "../commonComponents/DefaultButton";

const OurFamily = ({data,sectionDetails}) => {

  return (
    <section className="about-meet-the-rest-of-the-family pt-lg-245 pt-mobile-205">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-phone-8 offset-lg-3 mx-phone-auto">
            <h2
              className="fs--80 blue-1 text-center split-words"
              data-aos="d:loop"
            >
              {sectionDetails.restOfTheFamilyTitle}
            </h2>
          </div>
          <div className="col-lg-12 mt-lg-80 mt-mobile-40">
            <ul className="list-family">
              {data.map((data, index) => {
                return (
                  <li key={index} className="list-item item-01">
                    <div className="content">
                      <div className="container-img logo-img">
                        <img
                          src={generateImageURL({ wix_url: data.logo, w: "320", h: "84", fit:"fit", q: "95" })}
                          data-preload
                          className="media"
                          data-aos="scaleOut
                                .8s ease-out-cubic .2s, d:loop"
                          alt=""
                        />
                      </div>
                      <div
                        className="container-img bg-img"
                        data-aos="scaleOut .8s ease-out-cubic 0s, d:loop"
                      >
                        <img
                          src={generateImageURL({ wix_url: data.image, w: "680", h: "1180", q: "95" })}
                          data-preload
                          className="media"
                          data-parallax
                          data-scale-from="1.2"
                          alt=""
                        />
                      </div>
                      <div className="container-text">
                        <p>{data.paragraph1}</p>
                        <p>{data.paragraph2}</p>
                        <p>{data.paragraph3}</p>
                      </div>
                      <div className="container-btn">
                        <DefaultButton
                          customClasses={"btn-border-white"}
                          data={{
                            label: data.buttonText,
                            action: data.buttonAction
                          }}
                          attributes={{
                            "data-cursor-style": "off",
                          }}
                        ></DefaultButton>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurFamily;
