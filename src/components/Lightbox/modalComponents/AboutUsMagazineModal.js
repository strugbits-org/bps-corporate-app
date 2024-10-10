"use client"
import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import parse from 'html-react-parser';
import { usePathname } from "next/navigation";

const AboutUsMagazineModal = ({ data }) => {
  const pathname = usePathname();
  const cleanPath = pathname.trim() === "/" ? "home" : pathname.substring(1);
  const page_name = cleanPath.split("/")[0].trim();
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
