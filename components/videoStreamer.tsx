import { type UserStreamData } from "@/interfaces/StreamInterface";
import { useEffect, useRef } from "react";

interface VideoStreamProps {
    streamData : UserStreamData,
    videoWidth? : number
};

export default function VideoStream(
    {
        streamData,
        videoWidth
    } : VideoStreamProps
) {

    const videoRef = useRef<null | HTMLVideoElement>(null);
    useEffect(
        () => {
            videoRef.current!.srcObject = streamData.stream;
        },
        []
    );

    return (
        <div className="flex flex-col gap-2 justify-center border-gray-600 border-solid border-4 rounded-lg p-2">
            <video
                ref={videoRef}
                autoPlay={true}
                muted={true}
                disablePictureInPicture={true}
                width={420}
            />

            <span className="text-white text-center md:text-lg">
                {streamData?.username}
            </span>
        </div>
    );
}