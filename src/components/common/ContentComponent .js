import React, { useEffect, useState } from "react";

const ContentComponent = ({ content, title, maxWords }) => {
  // const demo = `The Mega Bash addressed these cultural integration challenges by creating experiences that mirrored the values of both VMware and Broadcom. From the storytelling bracelet activity to collaborative spaces, from high energy blender bike tournaments to our door large scale games ,  that encouraged mingling and dialogue, the event was a step forward in knitting together the fabric of both organizations into a unified entity.

  // The event's atmosphere was charged with excitement, showcasing the potential of the newly united workforce.`;
  const [showAll, setShowAll] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    const words = content.split(" ");
    setIsReadMore(words.length > maxWords);

    const paragraphsArray = [];
    let currentParagraph = "";
    words.forEach((word, index) => {
      currentParagraph += (currentParagraph ? " " : "") + word;
      if ((index + 1) % maxWords === 0 || index === words.length - 1) {
        paragraphsArray.push(currentParagraph);
        currentParagraph = "";
      }
    });

    setParagraphs(paragraphsArray);

    // console.log("content", content);
    // if (words.length > maxWords) console.log("content", content);

  }, [content, maxWords]);

  return (
    <div className={`container-text ${isReadMore ? "container-read-more" : ""}`}>
      <h2 className="title">
        {title}
      </h2>
      <div className={`wrapper-text ${showAll ? "active" : ""}`}>
        <p>{paragraphs[0]}</p>
        <div className={"readmore-paragraphs text"}>
          {paragraphs.slice(1).map((paragraph, index) => <React.Fragment key={index}><br /><p>{paragraph}</p></React.Fragment>)}
        </div>
      </div>
      {isReadMore && (
        <button onClick={() => setShowAll(!showAll)} className="btn-read-more">
          <div className="btn-text">
            <span className="read-more">Read More</span>
            <span className="to-go-back">To go back</span>
          </div>
          <i className="icon-arrow-down"></i>
        </button>
      )}
    </div>
  );
};

export default ContentComponent;
