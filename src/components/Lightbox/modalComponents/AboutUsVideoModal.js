import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import getFullVideoURL from "@/common/functions/videoURL";
import { useRouter } from "next/router";

const AboutUsVideoModal = ({ data }) => {
  const router = useRouter();
  const pathname = router.pathname.trim() === "/" ? "home" : router.pathname.substring(1);
  const page_name = pathname.split("/")[0].trim();
  if (page_name !== "about") return;

  return (
    <ModalWrapper name={"modal-about-video"} no_wrapper={true}>
      <div className="container-img video-wrapper about-modal-video" data-aos="d:loop">
        {data && data.lightboxVideo ? (
          <video
            data-src={getFullVideoURL(data.lightboxVideo)}
            src={getFullVideoURL(data.lightboxVideo)}
            className="player-video media"
            playsInline
          ></video>
        ) : (
          <h6
            className="fs--40 text-center split-words not_found_text"
            data-aos="d:loop"
          >
            No video found
          </h6>
        )}

      </div>
    </ModalWrapper>
  );
};

export default AboutUsVideoModal;
