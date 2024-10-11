import React from 'react';
import { generateImageURL, getFullVideoURL } from '@/utils/generateWixURL';

const HeroSection = ({data}) => {
    return (
        <section className="home-intro" data-aos="d:loop">
            <div className="container-img">
                {data.background && data.background.startsWith("wix:video") ? 
                (<video
                    data-src={getFullVideoURL(data.background)}
                    src={getFullVideoURL(data.background)}
                    autoPlay
                    loop
                    muted
                    className="media"
                    data-preload
                    alt=""
                    data-parallax-top
                    data-translate-y="50%"
                />)
                : data.background && data.background.startsWith("wix:image") ?
                ( <img
                    src={generateImageURL({ wix_url:data?.background, q:"95"})}
                    data-preload
                    className="media"
                    alt=""
                    data-parallax-top
                    data-translate-y="50%"
                />)   
                : null}
                <p className="fs--14 font-2 blue-1">
                    {data.heroSectionTitle}
                </p>
            </div>
        </section>
    );
};
export default HeroSection;
