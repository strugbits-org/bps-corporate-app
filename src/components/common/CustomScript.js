"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";

export const CustomScripts = () => {
    const pathname = usePathname();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const canonicalUrl = `${BASE_URL}${pathname}`;

    return (
        <>
            <link rel="canonical" href={canonicalUrl} />

            {/* <Script src={`https://www.googletagmanager.com/gtag/js?id=G-WBJ97DL`} strategy="afterInteractive" />
            <Script src='//fw-cdn.com/11846215/4437905.js' chat='false' strategy="afterInteractive" />

            <Script id="pinterest-tags" strategy="afterInteractive">
                {`
          !function(e){if(!window.pintrk){window.pintrk = function () {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '2613816880133');
          pintrk('page');
          `}
            </Script> */}

            <Script rel="modulepreload" href="/assets/app2.js" />
            <Script rel="modulepreload" href="/assets/all.js" />
            <Script rel="modulepreload" href="/assets/search.js" />
            <Script rel="modulepreload" href="/assets/forms.js" />
            <Script rel="modulepreload" href="/assets/chat.js" />

            <Script async type="module" src="/assets/app2.js"></Script>
            <Script async type="module" src="/assets/search.js"></Script>
            <Script async type="module" src="/assets/forms.js"></Script>
            <Script async type="module" src="/assets/chat.js"></Script>
        </>
    );
};
export default CustomScripts;
