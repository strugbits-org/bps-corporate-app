import { Link } from "react-router-dom";
import { portfolioData } from "../../common/constats/portfolioData";
import React from "react";

const OurWorkCard = () => {
  return (
    <div className="row row-2">
      <div className="col-lg-12 column-1">
        <ul className="list-portfolio grid-lg-25 grid-tablet-50">
          {portfolioData.items.map((data) => {
            return (
              <li key={data.id} className="grid-item">
                <Link
                  to="/project"
                  className="link-portfolio link-portfolio-animation"
                  data-aos="d:loop"
                >
                  <div
                    className="container-img bg-blue"
                    data-cursor-style="view"
                  >
                    <div className="wrapper-img">
                      <img
                        src={data.img}
                        data-preload
                        className="media"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="container-text">
                    <ul className="list-tags-small">
                    {Object.values(data.tags).map((tag, index) => (
                        <React.Fragment key={index}>
                          {index < 3 ? (
                            <li
                              className={`tag-small ${
                                index === 0 ? "active" : ""
                              }`}
                            >
                              <span>{tag}</span>
                            </li>
                          ) : null}
                        </React.Fragment>
                      ))}
                      {Object.values(data.tags).length > 3 ? (
                        <li className="tag-small">
                          <span>
                            +{Object.values(data.tags).length - 3} studios
                          </span>
                        </li>
                      ) : null}
                    </ul>

                    <h2 className="title-portfolio">{data.title}</h2>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className="col-lg-2 offset-lg-5 flex-center mt-lg-60 mt-mobile-40"
        data-aos="fadeIn .8s ease-in-out .2s, d:loop"
      >
        <button className="btn-border-blue" data-cursor-style="off">
          <span>See more</span>
        </button>
      </div>
    </div>
  );
};

export default OurWorkCard;
