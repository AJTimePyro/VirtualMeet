import { type UserStreamData } from "@/interfaces/StreamInterface";
import { useEffect, useRef } from "react";

interface VideoStreamProps {
    streamData : UserStreamData
};

export default function VideoStream(
    {
        streamData
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
        <div>
            <video
                ref={videoRef}
                autoPlay={true}
                muted={true}
            />

            <span>
                {streamData?.username}
            </span>
        </div>
    );
}