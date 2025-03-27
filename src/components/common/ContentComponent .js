"use client"
import React, { useEffect, useState } from "react";

const ContentComponent = ({ content, title, maxWords }) => {

  const [showAll, setShowAll] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);
  const [wordCount, setWordCount] = useState(maxWords);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const words = content.split(" ");
    setIsReadMore(words.length > maxWords);
    setWords(words);
    setWordCount(maxWords);
  }, [content]);

  useEffect(() => {
    if (showAll) {
      setWordCount(words.length);
    } else {
      setWordCount(maxWords);
    }
  }, [showAll]);

  const handleReadMore = () => {
    setShowAll(!showAll);
  }

  return (
    <div className={`container-text ${isReadMore ? "container-read-more" : ""}`}>
      <h2 className="title">
        {title}
      </h2>
      <div className={`wrapper-text ${showAll ? "active" : ""}`}>
        <p>{words.slice(0, wordCount).join(" ")}</p>
      </div>
      {isReadMore && (
        <button onClick={handleReadMore} className="btn-read-more">
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
