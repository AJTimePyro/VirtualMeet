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
    const [currentTime, setCurrentTime] = useState('');
    let screenWidth : number = 0;
    
    useEffect(
        () => {
            screenWidth = window.screen.width;
            
            if (screenWidth > 640) {
                dateOpt.hour = "2-digit";
                dateOpt.minute = "2-digit";
                dateOpt.second = "2-digit";
                dateOpt.hour12 = false;
            }
        },
        []
    );
    
    useEffect(
        () => {
            if (screenWidth > 480) {
                const interval = setInterval(
                    () => {
                        setCurrentTime(new Date().toLocaleDateString("en-In", dateOpt))
                    },
                    1000
                );
                return () => clearInterval(interval)
            }
        },
        []
    );

    return (
            currentTime && 
            <div className="text-center">
                <span className="text-black" style={openSans.style}>
                    { currentTime }
                </span>
            </div>
    );
};