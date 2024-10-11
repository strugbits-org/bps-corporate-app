"use client";

import { useEffect } from "react";
import { markPageLoaded } from "@/utils/utilityFunctions";

export const AnimationLoaded = () => {
    useEffect(() => {
        markPageLoaded();
    }, []);

    return null;
};
