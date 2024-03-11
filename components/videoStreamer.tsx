import { useEffect, useRef } from "react";

export default function VideoStream(
    {
        stream
    } : { stream : MediaStream | null }
) {

    const videoRef = useRef<null | HTMLVideoElement>(null);
    useEffect(
        () => {
            videoRef.current!.srcObject = stream;
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
                {stream?.id}
            </span>
        </div>
    )
}