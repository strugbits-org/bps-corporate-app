import React from "react";
import image1 from "../../assets/images/logo/logo-bps-b.svg"
import image2 from "../../assets/images/logo/logo-bps-p.svg"
import image3 from "../../assets/images/logo/logo-bps-s.svg"

const Loading = () => {
  return (
    <div id="loader">
      <div className="column-progress">
        <section className="loading-progressbar"></section>
      </div>
      <div className="container-logo">
        <div className="z-5">
          <img
            src={image1.src}
            data-preload
            className="img-b z-3 media"
            alt=""
          />
        </div>
        <div className="z-4">
          <img
            src={image2.src}
            data-preload
            className="img-p z-2 media"
            alt=""
          />
        </div>
        <div className="z-3">
          <img
            src={image3.src}
            data-preload
            className="img-s z-1 media"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
