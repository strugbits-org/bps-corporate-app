import React from "react";
import { DefaultButton } from "../common/DefaultButton";
import { ImageWrapper } from "../common/ImageWrapper";

const IntroSection = ({ data }) => {

  return (
    <>
      <section className="about-intro">
        <div data-sticky data-trigger="parent" className="z-3">
          <div
            className="container-img"
            data-parallax-top
            data-scale-from="1"
            data-end="bottom bottom"
            data-trigger=".about-intro"
            data-scale="0.4402"
            data-translate-y="5vh"
          >
            <ImageWrapper
              url={data.backgroundImage}
              q={"100"}
              customClasses={"media"}
              attributes={{ "data-preload": "", "data-parallax-top": "", "data-scale-from": "1.3", "data-end": "95% bottom", "data-trigger": ".about-intro" }} />
          </div>
        </div>

        <div className="wrapper-content z-2 content-1">
          <h2
            className="title-we-are"
            data-parallax
            data-trigger=".about-intro"
            data-start="60% center"
            data-translate-y="20vh"
          >
            {data.title1}
          </h2>
        </div>
        <div className="wrapper-content z-4 content-2">
          <h2
            className="title-blue-print"
            data-parallax
            data-trigger=".about-intro"
            data-start="60% center"
            data-translate-y="20vh"
          >
            {data.title2}
          </h2>
        </div>

        <div className="wrapper-content z-4 content-3">
          <DefaultButton
            customClasses={"btn-border-blue"}
            data={{
              label: data.buttonText,
              action: data.buttonAction
            }}
            attributes={{
              "data-cursor-style": "off",
              "data-parallax": "",
              "data-trigger": ".about-intro",
              "data-translate-y-from": "20vh",
              "data-translate-y": "5vh",
              "data-end": "95% center",
              "data-start": "60% center",
            }}
          ></DefaultButton>
        </div>
      </section>

      <section className="about-events pt-30">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="wrapper-text text-center">
                <h3
                  className="fs--25"
                  data-parallax
                  data-translate-y-from="20vh"
                  data-end="center center"
                  data-trigger="parent"
                >
                  {data.descriptionBold}
                </h3>
                <div
                  className="container-text font-2 fs--16 lh-1375 mt-15"
                  data-parallax
                  data-translate-y-from="30vh"
                  data-end="center center"
                  data-trigger="parent"
                >
                  <p>{data.description2}</p>
                  <p className="mt-20">{data.description3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroSection;
