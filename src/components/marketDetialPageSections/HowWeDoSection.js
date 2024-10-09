import { generateImageURL } from "@/common/functions/imageURL";
import { convertToHTML } from "@/utils/utilityFunctions";

const HowWeDoSection = ({data,marketSectionDetails}) => {

  const parseDescription = (description) => {
    const options = {
      content: description,
      class_ul: "bullet_points column-paragraph",
      class_p: "column-paragraph",
      data_aos_p: "fadeInUp .6s ease-out-cubic .3s, d:loop"
    }
    const html = convertToHTML(options);
    return html;
  }

  return (
    <section className="market-how-we-do-it pt-lg-270 pt-tablet-100 pt-phone-150">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 column-1">
            <h2 className="fs--60 text-center split-chars" data-aos="d:loop">
              {marketSectionDetails?.cardsSectionTitle}
            </h2>
            <ul className="list-how-we-do-it mt-lg-50 mt-mobile-40">
              {data.howWeDoItSections.sort((a, b) => a.orderNumber - b.orderNumber).map((item, index) => {
                return (
                  <li key={index}>
                    <div className="list-column-img">
                      <div className="container-img" data-aos="d:loop">
                        <img
                          src={generateImageURL({ wix_url: item?.image,w: "790", h: "605", q: "90" })}
                          data-preload
                          className="media"
                          alt=""
                          data-parallax
                          data-scale-from="1.2"
                        />
                      </div>
                    </div>
                    <div className="list-column-text">
                      <h3
                        className="column-title split-words"
                        data-aos="d:loop"
                      >
                        {item.title}
                      </h3>
                      {parseDescription(item.description)}
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

export default HowWeDoSection;