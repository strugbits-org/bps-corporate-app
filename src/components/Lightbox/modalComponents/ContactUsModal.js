import React from "react";
import { ModalWrapper } from "../ModalWrapper";
import ContactForm from "@/components/common/ContactForm";
import ContactDetails from "@/components/common/ContactDetails";

const ContactUsModal = ({ contactUsContent, contactData, socialLinks }) => {
  return (
    <ModalWrapper name={"modal-contact"}>
      <ContactForm data={contactUsContent} />
      <ContactDetails contactData={contactData} contactusData={contactUsContent} socialLinks={socialLinks} />
    </ModalWrapper>
  );
};

export default ContactUsModal;
