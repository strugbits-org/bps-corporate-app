"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Wrapper = ({ children }) => {
    const pathname = usePathname();

    const path = pathname.trim() === "/" ? "home" : pathname.substring(1);
    let cleanPath = path.split("/")[0].trim();

    useEffect(() => {
        if (typeof window !== "undefined") document.body.dataset.pg = `pg-${cleanPath}`;
    }, [cleanPath]);
    return (
        <>
            <div className="cursor-wrapper" id="wrapper-cursor">
                <div>
                    <span className="view text-wrapper">
                        <span>view</span>
                    </span>
                </div>
            </div>
            <div id="main-transition">
                <div id={`pg-${cleanPath}`} className="wrapper" data-scroll-container>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Wrapper;
