import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import parse from 'html-react-parser';
import { useRouter } from "next/router";

const AboutUsMagazineModal = ({ data }) => {
  const router = useRouter();
  const pathname = router.pathname.trim() === "/" ? "home" : router.pathname.substring(1);
  const page_name = pathname.split("/")[0].trim();
  if (page_name !== "about") return;
  return (
    <ModalWrapper name={"modal-about-magazine"} no_wrapper={true}>
      <div id="trendMagazine" className="wrapper-modal" data-aos="d:loop">
        {parse(data.magazineEmbededCode)}
      </div>
    </ModalWrapper>
  );
};

export default AboutUsMagazineModal;
