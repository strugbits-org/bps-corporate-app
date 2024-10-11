"use client"
import React, { useEffect, useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { getMarketSection } from "@/services/market";
import { getFullVideoURL } from "@/utils/generateWixURL";
import { usePathname } from "next/navigation";

const MarketsVideoModal = () => {
  const [src, setSrc] = useState(null);
  const pathname = usePathname();
  const page_name = pathname.split("/")[1].trim();

  useEffect(() => {
    const getData = async () => {
      const slug = pathname.split("/")[2];
      if (page_name !== "market") return;
      const marketSection = await getMarketSection(slug);
      setSrc(getFullVideoURL(marketSection?.video));
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
