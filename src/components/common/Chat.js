"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";
import image1 from "@/assets/svg/btn-chat-1.svg";
import image2 from "@/assets/svg/btn-chat-2.svg";
import image3 from "@/assets/svg/btn-chat-3.svg";
import { enableChat } from "@/utils/utilityFunctions";
import { useDetectClickOutside } from 'react-detect-click-outside';

const Chat = ({ config, triggerEvents }) => {
  const [chatConfig, setChatConfig] = useState();
  const path = usePathname();
  const chatRef = useRef(null);

  const wrapperRef = useDetectClickOutside({
    onTriggered: () => {
      const chat = chatRef.current;
      if (chat) chat.classList.remove("active");
    }
  });


  useEffect(() => {
    if (config) {
      setChatConfig(config);
      enableChat();
    }
  }, [config]);

  const activateChat = useCallback(() => {
    const chat = chatRef.current;
    if (chat) chat.classList.add("active");
  }, []);

  const setupInactivityTrigger = useCallback(
    (timeout) => {
      let inactivityTimeout;

      const resetTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
          activateChat();
        }, timeout * 1000);
      };

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);

      resetTimer();

      return () => {
        clearTimeout(inactivityTimeout);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      };
    },
    [activateChat]
  );

  const setupScrollTrigger = useCallback((threshold) => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = (scrollPosition / documentHeight) * 100;

      if (scrollPercentage >= threshold) {
        activateChat();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activateChat]);

  useEffect(() => {
    const slug = "/" + path.split("/")[1].trim();

    const triggerEvent = triggerEvents.find((event) => event.slug === slug);
    if (!triggerEvent) return;

    const { trigger, value } = triggerEvent;

    switch (trigger) {
      case "onLoad":
        setTimeout(() => {
          activateChat();
        }, value * 1000);
        break;

      case "onInactivity":
        return setupInactivityTrigger(value);

      case "onScroll":
        return setupScrollTrigger(value);

      default:
        break;
    }
  }, [path, triggerEvents, activateChat, setupInactivityTrigger, setupScrollTrigger]);

  if (!chatConfig?.widget) return;

  return (
    <div ref={wrapperRef}>
      <div ref={chatRef} className="chat" data-cursor-style="off">
        <button className="btn-chat">
          <div className="btn-wrapper">
            <span>Hello?</span>
            <div className="container-img btn-top">
              <img
                src={image1.src}
                data-preload
                className="media"
                alt=""
              />
            </div>
            <div className="bg-1"></div>
            <div className="container-img btn-middle">
              <img
                src={image2.src}
                data-preload
                className="media"
                alt=""
              />
            </div>
            <div className="bg-2"></div>
            <div className="container-img btn-bottom">
              <img
                src={image3.src}
                data-preload
                className="media"
                alt=""
              />
            </div>
          </div>
        </button>
        {chatConfig.widget && (
          <div className="container-chat">
            {parse(chatConfig.widget)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;