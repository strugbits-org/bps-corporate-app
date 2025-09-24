import DelayedLink from "@/components/common/DelayedLink";
import { ImageWrapper } from "@/components/common/ImageWrapper";

const Services = ({ data }) => {
  return (
    <div className="wrapper-submenu-services wrapper-submenu">
      <div className="container-title-mobile">
        <h2 className="submenu-title">Services</h2>
        <button className="btn-go-back" data-submenu-close>
          <i className="icon-arrow-left-3"></i>
          <span>Go back</span>
        </button>
      </div>
      <ul className="list-submenu-services list-submenu">
        {data.filter(x => x.menuItem).map((service, index) => (
          <li key={index}>
            <DelayedLink
              to={`/services/${service.slug}`}
              className="service-link"
              attributes={{ "data-menu-close": "" }}
            >
              <div className="container-img bg-blue">
                <ImageWrapper url={service?.image} defaultDimensions={{ width: 1280, height: 600 }} customClasses={"media"} attributes={{ "data-preload": "" }} />
              </div>
              <h2 className="service-title split-words">
                {service.cardName}
              </h2>
              <span className="number">
                {index > 10 ? index + 1 : "0" + (index + 1)}
              </span>
            </DelayedLink>
          </li>)
        )}
      </ul>
    </div>
  );
};
export default Services;
