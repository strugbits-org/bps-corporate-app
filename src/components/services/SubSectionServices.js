import { generateImageURL } from "@/utils/generateWixURL";

export const SubSectionServices = ({ data }) => {

  if (data?.subServices?.length === 0) return;

  return (
    <section className="services-description pt-lg-210 pt-tablet-105 pt-phone-200">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2 className="fs--60 text-center split-words" data-aos="d:loop">
              {data?.subServicesTitle}
            </h2>
          </div>
          <div className="col-12 mt-40">
            <ul
              className="list-services grid-lg-25 grid-md-50"
              data-aos="d:loop"
            >
              {data.subServices.sort((a, b) => a.orderNumber - b.orderNumber).map((service, index) => {
                return (
                  <li key={index} className="grid-item">
                    <div className="content">
                      <div className="container-img">
                        <img
                          src={generateImageURL({ wix_url: service?.image, w: "480", h: "302", q: "90" })}
                          data-preload
                          className="media"
                          alt=""
                        />
                      </div>
                      <div className="container-text">
                        <h3 className="service-name split-words">
                          {service.title}
                        </h3>
                        <p className="service-description">{service.description}</p>
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
}
