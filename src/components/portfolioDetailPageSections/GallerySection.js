import React, { useState, useEffect } from "react";
import ProductCartSlider from "../commonComponents/ProductCartSlider";
import { generateImageURL } from "../../common/functions/imageURL";

const GallerySection = ({ data, portfolioSectionDetails }) => {
  const [gallery, setGallery] = useState([]);

  function convertGallery(images) {
    let desiredArray = [];
    for (let i = 0; i < images.length; i += 3) {
      let obj1 = { multipleImages: [images[i], images[i + 1]] };
      let obj2 = { fullImage: images[i + 2] };

      desiredArray.push(obj1, obj2);
    }
    return desiredArray;
  }

  useEffect(() => {
    if (data && data.galleryImages && data.galleryImages.length !== 0) {
      let formattedArray = convertGallery(data.galleryImages);
      setGallery(formattedArray);
    }
  }, [data]);

  return (
    <section className="project-photo-gallery pt-lg-165 pt-tablet-105 pt-phone-145">
      <div className="container-fluid">
        <div className="row">
          {gallery.length !== 0 && (
            <div className="col-lg-10 offset-lg-1">
              <h2
                className="fs--60 text-center mb-md-40 mb-phone-30 split-words"
                data-aos="d:loop"
              >
                {portfolioSectionDetails?.gallerySectionTitle}
              </h2>

              <div className="wrapper-gallery">
                {gallery.map((item, index) =>
                  item.fullImage ? (
                    <div
                      key={index}
                      className="module-photo-gallery-img-100 module-gallery"
                    >
                      <div className="module-column" data-aos="d:loop">
                        <div className="container-img bg-blue">
                          <div className="wrapper-img">
                            <img
                              src={generateImageURL({
                                wix_url: item.fullImage,
                                q: "90",
                                w: "1920",
                                h: "1280",
                                fit: "fit",
                              })}
                              data-preload
                              className="media"
                              alt="imageasd"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    item.multipleImages &&
                    item.multipleImages.length !== 0 && (
                      <div
                        key={index}
                        className="module-photo-gallery-img-50 module-gallery"
                      >
                        {item.multipleImages.map((imageUrl, _index) => {
                          return (
                            imageUrl && (
                              <div
                                key={_index}
                                className="module-column"
                                data-aos="d:loop"
                              >
                                <div className="container-img bg-blue">
                                  <div className="wrapper-img">
                                    <img
                                      src={generateImageURL({
                                        wix_url: imageUrl,
                                        q: "90",
                                        w: "780",
                                        h: "720",
                                      })}
                                      data-preload
                                      className="media"
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })}
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          )}
          <div
            className={`col-lg-10 offset-lg-1 column-2 ${
              data?.storeProducts.length === 0 ? "hidden" : ""
            }`}
          >
            <div className="container-slider-produtcts">
              <h2 className="slider-title split-words" data-aos="d:loop">
                {portfolioSectionDetails?.productsSectionTitle}
              </h2>

              <ProductCartSlider data={data} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
