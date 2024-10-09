import { generateImageURL } from "@/common/functions/imageURL";
import DelayedLink from "../common/DelayedLink";

const MarketSection = ({ data, homeSectionDetails }) => {
  let data_delay = 0;

  return (
    <section className={`section-markets ${data.length === 0 ? "hidden" : ""}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 offset-lg-5">
            <h2
              className="fs--60 fs-phone-40 blue-1 text-center split-chars"
              data-aos="d:loop"
            >
              {homeSectionDetails.marketTitle}
            </h2>
          </div>
          <div className="col-12 mt-lg-50 mt-tablet-40 mt-phone-35">
            <ul className="list-markets list-projects font-60 grid-lg-25 grid-tablet-50">
              {data.map((data, index) => {
                data_delay += 50;

                return (
                  <li
                    key={index}
                    className="grid-item list-item"
                    data-aos="d:loop"
                    data-delay-desktop={data_delay.toString()}
                  >
                    <DelayedLink
                      to={`/market/${data.slug}`}
                      className="market-link project-link"
                      attributes={{
                        "data-cursor-style": "view",
                        "data-menu-close": "",
                      }}
                    >
                      <div
                        className="container-img bg-blue"
                        data-cursor-style="view"
                      >
                        <img
                          src={generateImageURL({ wix_url: data?.image, h: "600", w: "600", q: "90" })}
                          data-preload
                          className="media"
                          alt=""
                        />
                      </div>
                      <div className="container-text">
                        <h3 className="title-project split-words">
                          {data.cardname}
                        </h3>
                        <ul className="list-tags">
                          {data.marketTags.map((tag, index) => (
                            <li key={index}>
                              <span>{tag}</span>
                            </li>
                          ))}
                          ;
                        </ul>
                      </div>
                    </DelayedLink>
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

export default MarketSection;
