'use client'

import { useParams } from "next/navigation";
import usePeer from "@/hook/usePeer";
import useStream from "@/hook/useStream";
import { useEffect, useRef } from "react";

export default function MeetPage() {
    const params = useParams();
    // console.log(params.meetid);
    const {peer, peerID} = usePeer();
    const myStream = useStream();

    const videoRef = useRef<null | HTMLVideoElement>(null);

    useEffect(
        () => {
            if (videoRef.current && myStream) {
                videoRef.current.srcObject = myStream;
            }
        },
        [videoRef, myStream]
    )
    console.log(myStream);
    return (
        <div>
            <video ref={videoRef} autoPlay={true} muted={true}/>
        </div>
    )
}