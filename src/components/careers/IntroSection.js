import { convertToHTML } from "@/utils/utilityFunctions";
import { DefaultButton } from "../common/DefaultButton";
import { getFullVideoURL } from "@/utils/generateWixURL";
// import { ImageWrapper } from "../common/ImageWrapper";

export const IntroSection = ({ data }) => {
    return (
        <section className="careers-intro pt-mobile-120 pb-lg-125 pb-mobile-50">
            <div className="container-fluid">
                <div className="row row-1">
                    <div className="col-lg-8 col-md-10 offset-md-1 offset-lg-2 column-1">
                        <h1 className="fs--160 text-center split-words" data-aos="d:loop">{data.title}</h1>
                        <DefaultButton
                            customClasses={"btn-large btn-blue mt-lg-70 mt-mobile-30"}
                            data={{
                                label: data?.buttonLabel,
                                action: data?.buttonAction
                            }}
                            attributes={{
                                "data-aos": "fadeIn - .3s, d:loop",
                                "data-cursor-style": "off",
                            }}
                        ></DefaultButton>
                    </div>
                </div>
                <div className="row row-2 mt-lg-125 mt-mobile-70">
                    <div className="col-lg-10 offset-lg-1 mb-lg-55 mb-mobile-30 column-1">
                        <div className="container-video">
                            {/* <div className="container-img play-img">
                                <ImageWrapper url={data.videoPlayButton} type={"svg"} customClasses={"media"} attributes={{ "data-preload": "" }} />
                            </div>
                            <div className="main-video" data-aos="d:loop">
                                <video data-src={getFullVideoURL(data.mainVideo)} src={getFullVideoURL(data.mainVideo)}
                                    data-preload className="player-video careers-video media" muted loop playsInline></video>
                            </div> */}
                            <div className="thumb"><video data-src={getFullVideoURL(data.videoThumbPosterVideo)}
                                src={getFullVideoURL(data.videoThumbPosterVideo)} data-preload data-autoplay loop
                                className=" media" muted playsInline></video>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-5 col-md-5 offset-lg-1">
                        <h2 className="fs--80 split-words" data-aos="d:loop">{data.heading2}</h2>
                    </div>
                    <div className="col-lg-5 col-md-7 offset-lg-2 mt-phone-20">
                        <div className="container-text fs--20" data-aos="fadeIn .6s ease-in-out .4s, d:loop">
                            {convertToHTML({ content: data.paragraph })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
