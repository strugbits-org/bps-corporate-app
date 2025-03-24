"use client";
import { useEffect, useState } from "react";
import ProductCartSlider from "../common/ProductCartSlider";
import SocialVerticalBar from "./SocialVerticalBar";
import ReactPlayer from "react-player";
import { formatDate } from "@/utils/utilityFunctions";
import { ImageWrapper } from "../common/ImageWrapper";

// Helper function to process text nodes with links
const processHeadingNodes = (nodes) => {
  let finalText = "";
  nodes.forEach((node) => {
    if (node.type === "TEXT") {
      const linkDecoration = node.textData?.decorations?.find(
        (item) => item.type === "LINK"
      );
      if (linkDecoration) {
        const link = linkDecoration.linkData.link.url;
        finalText += ` <a href="${link}">${node.textData.text}</a>`;
      } else {
        finalText += node.textData.text;
      }
    }
  });
  return finalText;
};

const processTextNodes = (nodes) => {
  let finalText = "";
  nodes.forEach((node) => {
    if (node.type === "TEXT") {
      const linkDecoration = node.textData?.decorations?.find(
        (item) => item.type === "LINK"
      );
      const boldDecoration = node.textData?.decorations?.find(
        (item) => item.type === "BOLD"
      );

      let text = node.textData.text;

      if (boldDecoration) {
        text = `<b>${text}</b>`;
      }

      if (linkDecoration) {
        const link = linkDecoration.linkData.link.url;
        finalText += ` <a href="${link}">${text}</a>`;
      } else {
        finalText += text;
      }
    }
  });

  return finalText;
};

const PostDetails = ({ data, blogSectionDetails, tags }) => {
  const [singleData, setSingleData] = useState([]);
  const [errorProfilePhoto, setErrorProfilePhoto] = useState(false);

  const title = data?.blogRef?.title;
  const date = formatDate(data?.blogRef?.lastPublishedDate?.$date);
  const profileImage = data?.author?.profilePhoto;
  const authorName = data?.author?.nickname;

  useEffect(() => {
    const processContent = (nodes) => {
      let blogData = [];

      // Add cover image if exists
      if (data?.blogRef?.coverImage) {
        blogData.push({
          type: "cover",
          image: data?.blogRef?.coverImage,
          sq: 0,
        });
      }

      // Process content nodes
      nodes?.forEach((item, index) => {
        switch (item.type) {
          case "PARAGRAPH":
            if (item.nodes?.length > 0) {
              blogData.push({
                type: "paragraph",
                text: processTextNodes(item.nodes),
                sq: index + 1,
              });
            } else {
              blogData.push({ type: "line-break", sq: index + 1 });
            }
            break;

          case "HEADING":
            if (item.nodes?.length > 0) {
              blogData.push({
                type: "heading",
                text: processHeadingNodes(item.nodes),
                level: item.headingData.level,
                sq: index + 1,
              });
            } else {
              blogData.push({ type: "line-break", sq: index + 1 });
            }
            break;

          case "VIDEO":
            blogData.push({
              type: "video",
              video: item.videoData.video.src.url ||
                `https://video.wixstatic.com/${item.videoData.video.src.id}`,
              thumbnail: item.videoData.thumbnail.src.url ||
                `https://static.wixstatic.com/${item.videoData.thumbnail.src.id}`,
              sq: index + 1,
            });
            break;

          case "BULLETED_LIST":
            if (item.nodes?.length > 0) {
              const items = item.nodes
                .filter(node => node.type === "LIST_ITEM")
                .map(node => {
                  const paragraph = node.nodes?.find(n => n.type === "PARAGRAPH");
                  return paragraph?.nodes?.length > 0
                    ? processTextNodes(paragraph.nodes)
                    : "";
                })
                .filter(Boolean);

              blogData.push({
                type: "bulleted-list",
                items,
                sq: index + 1,
              });
            }
            break;

          case "ORDERED_LIST":
            if (item.nodes?.length > 0) {
              const items = item.nodes
                .filter(node => node.type === "LIST_ITEM")
                .map(node => {
                  const paragraph = node.nodes?.find(n => n.type === "PARAGRAPH");
                  return paragraph?.nodes?.length > 0
                    ? processTextNodes(paragraph.nodes)
                    : "";
                })
                .filter(Boolean);

              blogData.push({
                type: "ordered-list",
                items,
                sq: index + 1,
              });
            }
            break;

          case "GALLERY":
            const gallery = item?.galleryData?.items
              ?.filter(galleryItem => galleryItem.image?.media?.src)
              .map(galleryItem => ({
                type: "cover",
                image: galleryItem.image.media.src.url,
                sq: 0,
              }));

            blogData.push({
              type: "gallery",
              images: gallery,
              sq: index + 1,
            });
            break;

          case "IMAGE":
            blogData.push({
              type: "image",
              image: item.imageData.image.src.id,
              sq: index + 1,
            });
            break;
        }
      });

      return blogData;
    };

    const singlePost = async () => {
      const processedContent = processContent(data?.blogRef?.richContent?.nodes);
      setSingleData(processedContent);
    };

    singlePost();
  }, [data]);

  const renderContent = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        );
      case "heading":
        return <h2 key={index}>{item.text}</h2>;
      case "video":
        return (
          <div key={index} className="container-video">
            <ReactPlayer
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "2rem",
                border: "1px solid #efefef",
                overflow: "hidden",
              }}
              url={item.video}
              width="100%"
              height="500px"
              controls
              light={item.thumbnail}
              playing
            />
          </div>
        );
      case "gallery":
        return (
          <div key={index} className="slider-article">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {item?.images?.map((galleryItem, galleryIndex) => (
                  <div key={galleryIndex} className="swiper-slide">
                    <div className="container-img">
                      <ImageWrapper
                        url={galleryItem.image}
                        defaultDimensions={{ width: 960, height: 540 }}
                        type="blogImage"
                        customClasses="media"
                        attributes={{ "data-preload": "" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="swiper-button-prev">
              <i className="icon-arrow-left-3"></i>
            </div>
            <div className="swiper-button-next">
              <i className="icon-arrow-right-3"></i>
            </div>
          </div>
        );
      case "image":
        return (
          <div key={index} className="container-img">
            <ImageWrapper
              key={item.image}
              url={item.image}
              type="blogImage"
              defaultDimensions={{ width: 960, height: 540 }}
            />
          </div>
        );
      case "bulleted-list":
        return (
          <ul key={index} className="bulleted-list">
            {item.items.map((listItem, listIndex) => (
              <li
                key={listIndex}
                dangerouslySetInnerHTML={{ __html: listItem }}
              />
            ))}
          </ul>
        );
      case "ordered-list":
        return (
          <ol key={index} className="ordered-list">
            {item.items.map((listItem, listIndex) => (
              <li
                key={listIndex}
                dangerouslySetInnerHTML={{ __html: listItem }}
              />
            ))}
          </ol>
        );
      default:
        return null;
    }
  };

  return (
    <section className="article-intro pt-lg-150 pt-mobile-125">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-5 offset-lg-3 column-1">
            <div className="wrapper-text">
              <div
                className="container-author-post-info"
                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
              >
                <div className="author">
                  {profileImage && !errorProfilePhoto ? (
                    <div className="container-img">
                      <ImageWrapper
                        url={profileImage}
                        onError={() => setErrorProfilePhoto(true)}
                        defaultDimensions={{ width: 80, height: 80 }}
                        customClasses="media"
                        attributes={{ "data-preload": "" }}
                      />
                    </div>
                  ) : (
                    <div className="container-img customProfile">
                      {authorName?.split(" ").map(name => name[0].toUpperCase()).join("")}
                    </div>
                  )}
                  <h2 className="author-name">{authorName}</h2>
                </div>
                <div className="date">
                  <span>{date}</span>
                </div>
              </div>
              <h1
                className="fs--40 fs-mobile-35 lh-140 article-title split-words"
                data-aos="d:loop"
              >
                {title}
              </h1>
            </div>
          </div>
        </div>
        <div className="row row-2 mt-lg-15 mt-tablet-25 mt-phone-45">
          <div className="col-lg-10 offset-lg-1 column-1">
            <div className="article-content pb-lg-180 pb-tablet-60 pb-phone-40 min-h-100">
              {singleData.length > 0 && singleData[0].type === "cover" && (
                <div className="article-thumb" data-aos="d:loop">
                  <div className="container-img">
                    <ImageWrapper
                      url={singleData[0].image}
                      defaultDimensions={{ width: 1920, height: 1080 }}
                      customClasses="media"
                      attributes={{
                        "data-preload": "",
                        "data-parallax-top": "",
                        "data-translate-y": "20%"
                      }}
                      alt="cover"
                    />
                  </div>
                </div>
              )}

              <div className="article-text mt-lg-60 mt-tablet-40 mt-phone-85">
                <div
                  className="editor"
                  data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                >
                  {singleData.map(renderContent)}
                </div>
              </div>

              {tags?.length > 0 && (
                <div className="article-tags mt-lg-140 mt-tablet-40 mt-phone-115">
                  <h3
                    className="fs--22 mb-lg-25 mb-tablet-40 mb-phone-25 split-words"
                    data-aos="d:loop"
                  >
                    Tags
                  </h3>
                  <ul className="list-post-tags" data-aos="d:loop">
                    {tags.map((item, index) => (
                      <li key={index}>
                        <div className="btn-tag">
                          <span>{item.label}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {data?.storeProducts?.length > 0 && (
              <div className="container-slider-produtcts mt-lg-padding-fluid mt-tablet-100 mt-phone-105">
                <h2 className="slider-title">
                  {blogSectionDetails?.featuredProductsTitle}
                </h2>
                <ProductCartSlider data={data} />
              </div>
            )}
          </div>

          <div className="col-lg-1 column-2 no-mobile" data-aos="fadeIn .8s ease-in-out .2s, d:loop">
            <div className="wrapper-share">
              <h3 className="fs--18 text-center d-inline-block mb-25">Share</h3>
              <SocialVerticalBar title={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;