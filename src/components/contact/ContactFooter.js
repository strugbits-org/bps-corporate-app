import ContactForm from "../common/ContactForm"
import ContactDetails from "../common/ContactDetails"

const ContactFooter = ({data, contactData, socialLinks}) => {
  return (
    <section
        className="contact-footer bg-blue-1 pt-lg-85 pt-mobile-55 pb-lg-padding pb-tablet-15 pb-phone-padding-fluid"
        data-cursor-style="off"
        data-aos="d:loop, trigger:.contact-intro"
      >
        <div className="container-fluid">
          <div className="row contact-info">
            {/* contact form start.. */}
            <ContactForm data={data} />
            {/* contact form end.. */}

            {/* contactDetails here */}
            <ContactDetails contactData={contactData} contactusData={data} socialLinks={socialLinks} />
          </div>

          <div className="row mt-135 no-mobile">
            <div className="col-lg-6">
              <p className="fs--14 font-2 white-1">{data?.copyrightText}</p>
            </div>
            <div className="col-lg-6 flex-end">
              <p className="fs--14 font-2 white-1">{data?.bottomDescription}</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default ContactFooter