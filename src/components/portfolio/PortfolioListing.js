"use client"
import React, { useState } from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import DelayedLink from "../common/DelayedLink";
import { ImageWrapper } from "../common/ImageWrapper";
import { updatedWatched } from "@/utils/utilityFunctions";

const PortfolioListing = ({ portfolioSectionDetails, studios, markets, portfolios }) => {
  const pageSize = 8;
  const [pageLimit, setPageLimit] = useState(pageSize);
  const [filteredPortfolios, setFilteredPortfolios] = useState(portfolios);
  
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);

  const [studiosDropdownActive, setSudiosDropdownActive] = useState(false);
  const [marketsDropdownActive, setMarketsDropdownActive] = useState(false);

  const handleAutoSeeMore = () => {
    setPageLimit((prev) => prev + pageSize);
    updatedWatched(true);
  }

  const applyFilters = ({ selectedStudios, selectedMarkets }) => {
    let filteredPortfolios = portfolios;

    if (selectedStudios.length > 0 && selectedMarkets.length > 0) {
      filteredPortfolios = filteredPortfolios.filter(blog =>
        blog.studios.some(studio => selectedStudios.includes(studio._id)) ||
        blog.markets.some(market => selectedMarkets.includes(market._id))
      );
    } else if (selectedStudios.length > 0) {
      filteredPortfolios = filteredPortfolios.filter(blog =>
        blog.studios.some(studio => selectedStudios.includes(studio._id))
      );
    } else if (selectedMarkets.length > 0) {
      filteredPortfolios = filteredPortfolios.filter(blog =>
        blog.markets.some(market => selectedMarkets.includes(market._id))
      );
    }

    setFilteredPortfolios(filteredPortfolios);
    updatedWatched(true);
  };

  const handleStudioFilter = (tag) => {
    if (selectedStudios.includes(tag)) {
      const _selectedStudios = selectedStudios.filter((el) => el !== tag);
      setSelectedStudios(_selectedStudios);
      applyFilters({ selectedStudios: _selectedStudios, selectedMarkets });
    } else {
      const _selectedStudios = [...selectedStudios, tag];
      setSelectedStudios(_selectedStudios);
      applyFilters({ selectedStudios: _selectedStudios, selectedMarkets });
    }
  };
  const handleMarketFilter = (category) => {
    if (selectedMarkets.includes(category)) {
      const _selectedMarkets = selectedMarkets.filter((el) => el !== category);
      setSelectedMarkets(_selectedMarkets);
      applyFilters({ selectedStudios, selectedMarkets: _selectedMarkets });
    } else {
      const _selectedMarkets = [...selectedMarkets, category];
      setSelectedMarkets(_selectedMarkets);
      applyFilters({ selectedStudios, selectedMarkets: _selectedMarkets });
    }
  };

  const resetFilter = (type) => {
    if (type === "studios") {
      setSelectedStudios([]);
      applyFilters({ selectedStudios: [], selectedMarkets });
    } else if (type === "markets") {
      setSelectedMarkets([]);
      applyFilters({ selectedStudios, selectedMarkets: [] });
    }
  }

  const sortTags = (a, b) => {
    const idAFound = selectedStudios.includes(a._id);
    const idBFound = selectedStudios.includes(b._id);
    if (idAFound && !idBFound) {
      return -1;
    } else if (!idAFound && idBFound) {
      return 1;
    } else {
      return 0;
    }
  };

  const studiosDropdownref = useDetectClickOutside({ onTriggered: () => { if (studiosDropdownActive) setSudiosDropdownActive(false) } });
  const marketsDropdownref = useDetectClickOutside({ onTriggered: () => { if (marketsDropdownActive) setMarketsDropdownActive(false) } });

  return (
    <section className="portfolio-intro pt-lg-145 pt-mobile-105">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mb-lg-60 mb-tablet-40 mb-phone-35">
            <h1 className="fs--60 text-center split-words" data-aos="d:loop">
              {portfolioSectionDetails.portfolioTitle}
            </h1>

            <div
              className="container-list-tags mt-lg-55 mt-tablet-40 mt-phone-30"
              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
            >
              <div ref={studiosDropdownref} className="portfolio-tags">
                <button
                  onClick={() => { setSudiosDropdownActive(!studiosDropdownActive) }}
                  className={`btn-tag-mobile no-desktop ${studiosDropdownActive ? "active" : ""}`}
                >
                  <span>{selectedStudios.length === 0 || studios.length === selectedStudios.length ? "All " : ""}Studios</span>
                  <i className="icon-arrow-down"></i>
                </button>
                <div className={`list-dropdown ${studiosDropdownActive ? "active" : ""}`}>
                  <div className="container-wrapper-list">
                    <div className="wrapper-list">
                      <ul
                        className={`list-portfolio-tags list-dropdown-tags ${studios.length === 0 ? "hidden" : ""
                          }`}
                      >
                        <li>
                          <button
                            onClick={() => { resetFilter("studios") }}
                            className={`portfolio-btn-tag ${selectedStudios.length === 0 ? "active" : ""}`}>
                            <span>All Studios</span>
                          </button>
                        </li>
                        {studios?.map((item, index) => (
                          <li key={index}>
                            <button
                              onClick={() => {
                                handleStudioFilter(item._id);
                              }}
                              className={`portfolio-btn-tag ${selectedStudios.includes(item._id)
                                ? "active"
                                : ""
                                }`}
                            >
                              {item.cardName}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={marketsDropdownref} className={`market-tags ${markets?.length === 0 ? "hidden" : ""}`}
              >
                <button
                  onClick={() => { setMarketsDropdownActive(!marketsDropdownActive) }}
                  className={`btn-tag-mobile no-desktop ${marketsDropdownActive ? "active" : ""}`}
                >
                  <span>{selectedMarkets.length === 0 || markets.length === selectedMarkets.length ? "All " : ""}Markets</span>
                  <i className="icon-arrow-down"></i>
                </button>
                <div className={`list-dropdown ${marketsDropdownActive ? "active" : ""}`}>
                  <div className="container-wrapper-list">
                    <div className="wrapper-list">
                      <ul className="list-market-tags list-dropdown-tags">
                        <li>
                          <button
                            onClick={() => { resetFilter("markets") }}
                            className={`portfolio-btn-tag ${selectedMarkets.length === 0 ? "active" : ""
                              }`}
                          >
                            <span>All Markets</span>
                          </button>
                        </li>
                        {markets?.map((market, index) => (
                          <li key={index}>
                            <button
                              onClick={() => {
                                handleMarketFilter(market._id);
                              }}
                              className={`portfolio-btn-tag ${selectedMarkets.includes(market._id)
                                ? "active"
                                : ""
                                }`}
                              key={`category-${index}`}
                            >
                              {market.cardname}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row row-2">
          <div className="col-lg-12 column-1">
            <ul
              className={`list-portfolio grid-lg-25 grid-tablet-50 ${filteredPortfolios.length === 0 ? "hidden" : ""
                }`}
            >
              {filteredPortfolios.slice(0, pageLimit).map((item) => {
                return (
                  <li key={item._id} className="grid-item">
                    <DelayedLink
                      to={`/project/${item.slug}`}
                      className="link-portfolio link-portfolio-animation"
                      attributes={{
                        "data-aos": "d:loop",
                      }}
                    >
                      <div
                        className="container-img bg-blue"
                        data-cursor-style="view"
                      >
                        <div className="wrapper-img">
                          <ImageWrapper url={item?.portfolioRef?.coverImage?.imageInfo} type={"2"} customClasses={"media"} attributes={{ "data-preload": "" }} />
                        </div>
                      </div>
                    </DelayedLink>
                    <div className="link-portfolio">
                      <div className="container-text">
                        <ul className="list-tags-small">
                          {item.markets.map((market, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                handleMarketFilter(market._id);
                              }}
                              className={`tag-small cursor-pointer ${selectedMarkets.includes(market._id)
                                ? "active"
                                : ""
                                }`}
                            >
                              <span>{market.cardname}</span>
                            </li>
                          ))}
                          {item.studios.sort(sortTags).map((studio, index) => (
                            <React.Fragment key={index}>
                              {index < 2 && (
                                <li
                                  onClick={() => {
                                    handleStudioFilter(studio._id);
                                  }}
                                  className={`tag-small cursor-pointer ${selectedStudios.includes(studio._id)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <span>{studio.cardName}</span>
                                </li>
                              )}
                            </React.Fragment>
                          ))}
                          {item.studios.length > 2 ? (
                            <li className="tag-small cursor-default">
                              <span>+{item.studios.length - 2} studios</span>
                            </li>
                          ) : null}
                        </ul>
                        <h2 className="title-portfolio">
                          {item.portfolioRef.title}
                        </h2>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {filteredPortfolios.length === 0 && (
              <h6
                className="fs--40 text-center split-words not_found_text"
                data-aos="d:loop"
              >
                No Data found
              </h6>
            )}
          </div>
          {pageLimit < filteredPortfolios.length && (
            <div
              className="col-lg-2 offset-lg-5 flex-center mt-lg-60 mt-mobile-40"
              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
            >
              <button
                onClick={handleAutoSeeMore}
                className="btn-border-blue"
                data-cursor-style="off"
              >
                <span>{portfolioSectionDetails.seeMoreButtonText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioListing;