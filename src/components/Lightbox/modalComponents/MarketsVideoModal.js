"use client"
import React, { useEffect, useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { getFullVideoURL } from "@/utils/generateWixURL";
import { usePathname } from "next/navigation";
import { logError } from "@/utils/utilityFunctions";

const MarketsVideoModal = ({ markets }) => {
  const [src, setSrc] = useState(null);
  const pathname = usePathname();
  const page_name = pathname.split("/")[1].trim();

  useEffect(() => {
    const getData = async () => {
      try {
        const slug = pathname.split("/")[2];
        if (page_name !== "market") return;
        const marketSection = markets.find((market) => market.slug === slug);
        if (!marketSection) {
          throw new Error(`Video Not found for market: ${slug}`);
        }
        setSrc(getFullVideoURL(marketSection.video));
      } catch (error) {
        logError("Error fetching Market video data(modal): ", error);
      }
    }
    getData();
  }, [pathname])

  if (page_name !== "market") return;

  return (
    <ModalWrapper name={"modal-markets-video"} no_wrapper={true}>
      <div className="container-img video-wrapper market-intro-video-modal" data-aos="d:loop">
        <video
          data-src={src}
          src={src}
          className="player-video media"
          playsInline
        ></video>
      </div>
    </ModalWrapper>
  );
};

export default MarketsVideoModal;
