import { generateImageURL } from "@/utils/generateWixURL";
import React, { useState } from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import DelayedLink from "../common/DelayedLink";
import { formatDate } from "@/utils/utilityFunctions";

const BlogListing = ({ data, seeMore, applyFilters, loading }) => {
    const [selectedStudios, setSelectedStudios] = useState([]);
    const [selectedMarkets, setSelectedMarkets] = useState([]);

    const [studiosDropdownActive, setSudiosDropdownActive] = useState(false);
    const [marketsDropdownActive, setMarketsDropdownActive] = useState(false);

    const handleStudioFilter = (tag) => {
        setSudiosDropdownActive(false);
        setMarketsDropdownActive(false);
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
        setSudiosDropdownActive(false);
        setMarketsDropdownActive(false);
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
        <section className="blog-intro pt-lg-145 pt-tablet-115 pt-phone-120 pb-lg-150 pb-tablet-100 pb-phone-155">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <h1
                            className="fs--60 text-center mb-lg-45 mb-mobile-40 split-words"
                            data-aos="d:loop"
                        >
                            {data.blogSectionDetails.blogTitle}
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
                                    <span>{selectedStudios.length === 0 || data.studios.length === selectedStudios.length ? "All " : ""}Studios</span>
                                    <i className="icon-arrow-down"></i>
                                </button>
                                <div className={`list-dropdown ${studiosDropdownActive ? "active" : ""}`}>
                                    <div className="container-wrapper-list">
                                        <div className="wrapper-list">
                                            <ul className="list-portfolio-tags list-dropdown-tags">
                                                <li>
                                                    <button
                                                        onClick={() => { resetFilter("studios") }}
                                                        className={`portfolio-btn-tag ${selectedStudios.length === 0 ? "active" : ""
                                                            }`}>
                                                        <span>All Studios</span>
                                                    </button>
                                                </li>
                                                {data.studios?.map((item, index) => (
                                                    <li key={index}>
                                                        <button
                                                            onClick={() => { handleStudioFilter(item._id) }}
                                                            className={`portfolio-btn-tag ${selectedStudios.includes(item._id)
                                                                ? "active"
                                                                : ""
                                                                }`}>
                                                            {item.cardName}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div ref={marketsDropdownref} className="market-tags">
                                <button
                                    onClick={() => { setMarketsDropdownActive(!marketsDropdownActive) }}
                                    className={`btn-tag-mobile no-desktop ${marketsDropdownActive ? "active" : ""}`}
                                >
                                    <span>{selectedMarkets.length === 0 || data.markets.length === selectedMarkets.length ? "All " : ""}Markets</span>
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
                                                {data.markets?.map((market, index) => (
                                                    <li key={index}>
                                                        <button
                                                            onClick={() => { handleMarketFilter(market._id) }}
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

                <div className="row row-2 mt-lg-60 mt-tablet-40 mt-phone-35">
                    <div className="col-lg-12 column-1">
                        <ul className="list-blog grid-lg-25 grid-tablet-50">
                            {data.items?.map((item) => {
                                return item.blogRef && item.author && (
                                    <li key={item._id} className="grid-item" data-aos="d:loop">
                                        <DelayedLink
                                            to={`/article/${encodeURIComponent(item.slug)}`}
                                            className="link-blog link-blog-animation"
                                            attributes={{
                                                "data-aos": "d:loop",
                                            }}
                                        >
                                            <div className="container-img bg-blue" data-cursor-style="view" >
                                                <div className="wrapper-img">
                                                    {item.blogRef.coverImage && <img
                                                        src={generateImageURL({ wix_url: item?.blogRef?.coverImage, w: "440", h: "302", fit: "fit", q: "90" })}
                                                        data-preload
                                                        className="media"
                                                        alt=""
                                                    />}
                                                </div>
                                            </div>
                                            <div className="container-text">
                                                <div className="container-author-post-info">
                                                    <div className="author">
                                                        <span className="author-name">
                                                            {item.author.nickname}
                                                        </span>
                                                    </div>
                                                    <div className="date">
                                                        <span>{formatDate(item.blogRef.lastPublishedDate.$date)}</span>
                                                    </div>
                                                </div>
                                                <h2 className="title-blog">{item.blogRef.title}</h2>
                                                <p className="text-blog">{item.blogRef.excerpt}</p>
                                            </div>
                                        </DelayedLink>
                                        <ul style={{ marginTop: 2 }} className="list-tags-small">
                                            {item.markets.map((market, index) => (
                                                <li key={index} onClick={() => { handleMarketFilter(market._id) }} className={`tag-small cursor-pointer ${selectedMarkets.includes(market._id)
                                                    ? "active"
                                                    : ""
                                                    }`}  >
                                                    <span>{market.cardname}</span>
                                                </li>
                                            ))}
                                            {item.studios.sort(sortTags).map((studio, index) => (
                                                <React.Fragment key={index}>
                                                    {index < 2 && (
                                                        <li onClick={() => { handleStudioFilter(studio._id) }} className={`tag-small cursor-pointer ${selectedStudios.includes(studio._id)
                                                            ? "active"
                                                            : ""
                                                            }`} >
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
                                    </li>
                                );
                            })}
                        </ul>
                        {data.items.length === 0 && <h6 className="fs--40 text-center split-words not_found_text" data-aos="d:loop">No Data found</h6>}
                    </div>
                    {data.items.length < data?.totalCount && !loading && (
                        <div className="col-lg-2 offset-lg-5 flex-center mt-lg-70 mt-tablet-60 mt-phone-85">
                            <button
                                onClick={() => seeMore({ selectedStudios, selectedMarkets, disableLoader: true })}
                                className="btn-border-blue"
                                attributes={{
                                    "data-cursor-style": "off",
                                }}
                            >
                                <span>{data.blogSectionDetails.seeMoreButtonText}</span>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default BlogListing;