import React from "react";
import DelayedLink from "../common/DelayedLink";
import { DefaultButton } from "../common/DefaultButton";
import { formatDate } from "@/utils/utilityFunctions";
import { ImageWrapper } from "../common/ImageWrapper";

const RecentPosts = ({ posts, blogSectionDetails }) => {
  return (
    <section
      className={`article-recent-posts pt-lg-245 pt-tablet-105 pt-phone-150 pb-lg-150 pb-mobile-100 ${
        posts.length === 0 ? "hidden" : ""
      }`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 column-1">
            <h2
              className="fs--60 text-center mb-lg-35 mb-tablet-40 mb-phone-100 split-words"
              attributes={{
                "data-aos": "d:loop",
              }}
            >
              {blogSectionDetails?.recentPostsSectionTitle}
            </h2>
            <div className="slider-content-mobile">
              <div className="swiper-container">
                <div className="swiper-wrapper list-blog list-slider-mobile grid-lg-25">
                  {posts?.map((data) => {
                    return (
                      <div key={data._id} className="swiper-slide grid-item">
                        <DelayedLink
                          to={`/article/${encodeURIComponent(data.slug)}`}
                          className="link-blog link-blog-animation"
                          attributes={{
                            "data-aos": "d:loop",
                          }}
                        >
                          <div
                            className="container-img bg-blue"
                            data-cursor-style="view"
                          >
                            <div className="wrapper-img">
                              <ImageWrapper url={data?.blogRef?.coverImage} defaultDimensions={{ width: 480, height: 320 }} customClasses="media" fit={"fit"} q={"80"} attributes={{"data-preload":""}} />
                            </div>
                          </div>
                          <div className="container-text">
                            <div className="container-author-post-info">
                              <div className="author">
                                <span className="author-name">
                                  {data?.author?.nickname}
                                </span>
                              </div>
                              <div className="date">
                                <span>
                                  {formatDate(
                                    data?.blogRef.lastPublishedDate.$date
                                  )}
                                </span>
                              </div>
                            </div>
                            <h2 className="title-blog">
                              {data?.blogRef?.title}
                            </h2>
                            <p className="text-blog">
                              {data?.blogRef?.excerpt}
                            </p>
                            <ul
                              style={{ marginTop: 2 }}
                              className="list-tags-small"
                            >
                              {data.markets.map((market, index) => (
                                <li
                                  key={index}
                                  className={`tag-small
                                                    ? "active"
                                                    : ""
                                                    }`}
                                >
                                  <span>{market.cardname}</span>
                                </li>
                              ))}
                              {data.studios.map((studio, index) => (
                                <React.Fragment key={index}>
                                  {index < 2 && (
                                    <li
                                      className={`tag-small 
                                                            ? ${
                                                              index === 0
                                                            } "active"
                                                            : ""
                                                            }`}
                                    >
                                      <span>{studio.cardName}</span>
                                    </li>
                                  )}
                                </React.Fragment>
                              ))}
                              {data.studios.length > 2 ? (
                                <li className="tag-small">
                                  <span>
                                    +{data.studios.length - 2} studios
                                  </span>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </DelayedLink>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-5 flex-center mt-70">
            <DefaultButton
              customClasses={"btn-border-blue"}
              data={{
                label: blogSectionDetails?.recentPostsButtonText,
                action: blogSectionDetails?.recentPostsButtonAction,
              }}
              attributes={{
                "data-cursor-style": "off",
              }}
            ></DefaultButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentPosts;
