import { generateImageURL } from "@/common/functions/imageURL";
import { refreshMagazineIframe } from "@/utils/utilityFunctions";

const AboutBottomSection = ({ sectionDetails }) => {
  return (
    <>
      <section className="about-check-out">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="container-box">
                <h2 className="fs--60 lh-100 white-1 title">
                  <span className="line-1 d-block">{sectionDetails.magazineTitle1}</span>
                  <span className="line-2 d-block">{sectionDetails.magazineTitle2}</span>
                </h2>
                <div className="container-img">
                  <btn-modal-open
                    group="modal-about-magazine"
                    data-cursor-style="off"
                  >
                    <img
                      src={generateImageURL({ wix_url: sectionDetails.magazineCoverImage, w: "310", h: "410", fit: "fit", q: "95" })}
                      data-preload
                      className="media"
                      alt=""
                      onClick={() => refreshMagazineIframe()}
                    />
                  </btn-modal-open>
                </div>

                <div className="bg-box"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutBottomSection;
