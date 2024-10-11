import React from "react";
import DelayedLink from "./DelayedLink";

const ContactDetails = ({ contactData, contactusData, socialLinks }) => {

  return (
    <div className="column-2">
      <div className="container-info">
        <div className="container-tel">
          <DelayedLink target={"_blank"} to={"tel:" + contactusData?.sfPhone}>
            <span>{contactusData?.sfPhone}</span>
          </DelayedLink>
          <DelayedLink target={"_blank"} to={"tel:" + contactusData?.lvPhone}>
            <span>{contactusData?.lvPhone}</span>
          </DelayedLink>
        </div>
        <DelayedLink target={"_blank"} to={"mailto:" + contactusData?.infoEmail}>
          <span>{contactusData?.infoEmail}</span>
        </DelayedLink>
      </div>
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
      <ul className="list-address">
        {contactData.map((data, index) => {
          return (
            <li key={index}>
              <h3 className="city">{data.city}</h3>
              <address>
                {data.address1} <br />
                {data.address2} <br />
                {data.address3}
              </address>
              <div className="phones">
                <DelayedLink to={`tel:${data.phone1}`} target={"_blank"}>
                  <span>{data.phone1}</span>
                </DelayedLink>
                <DelayedLink to={`tel:${data.phone2}`} target={"_blank"}>
                  <span>{data.phone2}</span>
                </DelayedLink>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactDetails;
