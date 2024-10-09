import React from 'react'
import image1 from "@/assets/svg/btn-chat-1.svg"
import image2 from "@/assets/svg/btn-chat-2.svg"
import image3 from "@/assets/svg/btn-chat-3.svg"
import { useEffect, useState } from 'react';
import { enableChat } from '@/utils/utilityFunctions';
import { getChatConfiguration } from '@/services';
import parse from 'html-react-parser';

const Chat = () => {
  const [chatConfig, setChatConfig] = useState();
  const [chatEnabled, setChatEnabled] = useState(false);

  const getConfig = async () => {
    try {
      const currentOrigin = window.location.origin;
      const config = await getChatConfiguration(currentOrigin);
      if (config && config.enable) {
        setChatConfig(config);
        setChatEnabled(true);
        enableChat();
      }
    } catch (error) {
      // console.log("err", error);
    }
  }
  useEffect(() => {
    getConfig();
  }, [])

  if (!chatEnabled) {
    return null;
  }

  return (
    <div className="chat" data-cursor-style="off">
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
  )
}

export default Chat