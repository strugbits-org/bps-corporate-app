"use client";
import { ImageWrapper } from "./ImageWrapper";
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

const OurClientsSection = ({ data }) => {
  const animation = { duration: 10000, easing: (t) => t }

  const [sliderRef, _instanceRef] = useKeenSlider(
    {
      loop: true,
      renderMode: "performance",
      drag: false,
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 3, spacing: 15 },
        },
        "(min-width: 1025px)": {
          slides: { perView: 5, spacing: 15 },
        },
      },
      slides: {
        perView: 2,
        spacing: 15,
      },
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },

    }
  )

  return (
    <section className={`section-clients ${data.length === 0 ? "hidden" : ""}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <ul ref={sliderRef} className="keen-slider">
              {data.map((data, index) => {
                return (
                  <li
                    key={index}
                    className="keen-slider__slide"
                  >
                    <div className="container-img">
                      <ImageWrapper url={data?.logo} customClasses={"media"} fit="fit" defaultDimensions={{ width: "300", height: "300" }} attributes={{ "data-preload": "" }} />
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

export default OurClientsSection;