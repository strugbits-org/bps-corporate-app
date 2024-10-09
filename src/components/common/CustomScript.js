"use client";

import { markPageLoaded } from "@/utils/utilityFunctions";
import { usePathname } from "next/navigation";
import Script from "next/script";
import React from "react";

export const CustomScripts = () => {
    const pathname = usePathname();
    const baseUrl = process.env.BASE_URL;
    const canonicalUrl = `${baseUrl}${pathname}`;
    markPageLoaded();
    return (
        <>
            <link rel="canonical" href={canonicalUrl} />
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
