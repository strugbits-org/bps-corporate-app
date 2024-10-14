"use client"
import { generateImageURL } from "@/utils/generateWixURL";
import DelayedLink from "@/components/common/DelayedLink";
import Newsletter from "@/components/common/Newsletter";
import { DynamicLink } from "@/components/common/DynamicLink";
import { usePathname } from "next/navigation";
import { ImageWrapper } from "../common/ImageWrapper";

const Footer = ({ menu, footerData, contactData, socialLinks }) => {
  const pathname = usePathname();
  const disabledPages = ["/contact"];

  return (
    <footer id="footer" className={`${disabledPages.includes(pathname) ? "d-none" : ""}`} data-cursor-style="off">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-7 column-1">
            <div className="container-logo">
              <div data-parallax data-end="bottom bottom" className="z-3">
                <ImageWrapper url={footerData.logo1} original={true} attributes={{ "data-preload": "" }} customClasses={"img-b z-3 media"} />
              </div>
              <div
                data-parallax
                data-translate-y-from="-15%"
                data-translate-x-from="10%"
                data-start="10% bottom"
                data-end="bottom center"
                className="z-2"
              >
                <ImageWrapper url={footerData.logo2} attributes={{ "data-preload": "" }} original={true} customClasses={"img-p z-2 media"} />
              </div>
              <div
                data-parallax
                data-translate-y-from="-30%"
                data-translate-x-from="30%"
                data-start="20% bottom"
                data-end="bottom center"
                className="z-1"
              >
                <ImageWrapper url={footerData.logo3} attributes={{ "data-preload": "" }} original={true} customClasses={"img-s z-1 media"} />
              </div>
            </div>
            <h2 className="fs--60 fs-mobile-50 title-footer white-1 mt-lg-170 mt-mobile-20">
              {footerData?.heading}
            </h2>
          </div>
          <div className="col-lg-5 column-2 pt-lg-65 pt-mobile-50">
            <div className="wrapper-newsletter-menu">

              <Newsletter data={footerData} />

              <div className="container-footer-menu mt-lg-165 mt-tablet-55 mt-phone-125">
                <ul className="list-footer-menu">
                  {menu.map((item) => {
                    return (
                      <li key={item._id} className="list-item">
                        <DynamicLink
                          customClasses={"link-footer-menu"}
                          data={{
                            label: item.title,
                            action: item.action
                          }}
                        >
                        </DynamicLink>
                      </li>
                    )
                  })}
                  <li className="list-item item-social-media">
                    <ul className="list-social-media">
                      {socialLinks.map((item, index) => (
                        <li key={index}>
                          <DelayedLink to={item.link} target="_blank"
                            attributes={{
                              "rel": "noopener noreferrer"
                            }}>
                            <i className={item.icon}></i>
                          </DelayedLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="container-address mt-lg-145 mt-phone-115">
              <ul className="list-address">
                {contactData.map((data, index) => {
                  return (

                    <li key={index}>
                      <h3 className="city">{data?.city}</h3>
                      <address>
                        {data?.address1} <br />
                        {data?.address2} <br />
                        {data?.address3}
                      </address>
                      <div className="phones">
                        <DelayedLink to={`tel:${data?.phone1}`} target={"_blank"}>
                          <span>{data?.phone1}</span>
                        </DelayedLink>
                        <DelayedLink to={`tel:${data?.phone2}`} target={"_blank"}>
                          <span>{data?.phone2}</span>
                        </DelayedLink>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row row-2 mt-lg-80 mt-mobile-45">
          <div className="col-lg-12 column-1">
            <p className="fs--14 font-2 white-1">{footerData?.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
