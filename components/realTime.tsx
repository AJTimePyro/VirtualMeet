'use client'

import { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans(
    {
        weight : "600",
        subsets : ["latin"]
    }
);

const dateOpt : Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

export default function RealTime() {
    const screenWidth = window.screen.width;
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleDateString("en-In", dateOpt));

    if (window.screen.width < 480) return <></>;

    else if (screenWidth > 640) {
        dateOpt.hour = "2-digit";
        dateOpt.minute = "2-digit";
        dateOpt.second = "2-digit";
        dateOpt.hour12 = false;

        useEffect(
            () => {
                const interval = setInterval(
                    () => {
                        setCurrentTime(new Date().toLocaleDateString("en-In", dateOpt))
                    },
                    1000
                );
    
                return () => clearInterval(interval)
            },
            []
        );
    }



    return (
        <div className="text-center">
            <span className="text-black" style={openSans.style}>
                { currentTime }
            </span>
        </div>
    );
};