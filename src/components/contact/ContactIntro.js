import { getFullVideoURL } from "@/utils/generateWixURL";

const ContactIntro = ({ data }) => {
    return (
        <section className="contact-intro" data-aos="d:loop">
            <div className="container-fluid pos-relative z-5">
                <div className="row">
                    <div className="col-lg-5 offset-lg-6 column-1">
                        <h1
                            className="fs--165 title-contact white-1 split-chars"
                            data-aos="d:loop"
                        >
                            {data?.title}
                        </h1>
                        <div className="container-text fs--25 lh-140 fs-tablet-18 white-1 mt-15">
                            <p data-aos="fadeInUp .8s ease-out-cubic .8s, d:loop">
                                {data?.description1}
                            </p>
                            <p
                                className="mt-lg-35 mt-mobile-15"
                                data-aos="fadeInUp .8s ease-out-cubic .9s, d:loop"
                            >
                                {data?.description2}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-img bg-img">
                <video
                    data-src={getFullVideoURL(data?.backgroundVideo)}
                    src={getFullVideoURL(data?.backgroundVideo)}
                    data-preload
                    autoPlay
                    loop
                    data-parallax-top
                    data-translate-y="30rem"
                    className="media"
                    muted
                    playsInline
                ></video>
            </div>
        </section>
    )
}

export default ContactIntro;