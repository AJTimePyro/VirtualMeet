import { type UserStreamData } from "@/interfaces/StreamInterface";
import { useEffect, useRef } from "react";

interface VideoStreamProps {
    streamData : UserStreamData,
    videoWidth? : number
};

export default function VideoStream(
    {
        streamData
    } : VideoStreamProps
) {

    const videoRef = useRef<null | HTMLVideoElement>(null);
    useEffect(
        () => {
            if (videoRef.current) {
                videoRef.current.srcObject = streamData.stream;
            }
        },
        []
    );

    return (
        <div className="flex flex-col gap-2 justify-center border-gray-600 border-solid border-4 rounded-lg p-2">
            <video
                ref={videoRef}
                autoPlay={true}
                muted={streamData.mute}
                disablePictureInPicture={true}
                width={420}
                height={315}
                className={`${streamData.videoOff ? "hidden" : "block"}`}
            />
            {
                streamData.videoOff && <div className="h-[315px] w-[420px] bg-black"/>
            }

            <span className="text-white text-center md:text-lg select-none">
                {streamData?.username}
            </span>
        </div>
    );
}