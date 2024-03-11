'use client'

import { useParams } from "next/navigation";
import usePeer from "@/hook/usePeer";
import useStream from "@/hook/useStream";
import { useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";

export default function MeetPage() {
    const params = useParams();
    const meetID = params.meetid;
    if (Array.isArray(meetID)) return;

    const videoRef = useRef<null | HTMLVideoElement>(null);
    const myStream = useStream();
    const {peer, peerID} = usePeer();

    useEffect(
        () => {
            if (peerID) {
                (async () => {
                    await axios.post(
                        "/api/new-user",
                        {
                            meetID,
                            peerID
                        }
                    );
                })();
            }

            pusherClient.subscribe(meetID);
            pusherClient.bind(
                "new-user-joined",
                (newUserPeerID : string) => {
                    if (newUserPeerID != peerID) {
                        console.log("New user joined " + newUserPeerID);
                    }
                }
            )

            return () => {
                pusherClient.unbind("new-user-joined");
                pusherClient.unsubscribe(meetID);
            }
        },
        [peer, peerID]
    );

    useEffect(
        () => {
            if (videoRef.current && myStream) {
                videoRef.current.srcObject = myStream;
            }
        },
        [videoRef, myStream]
    )

    return (
        <div>
            <video ref={videoRef} autoPlay={true} muted={true}/>
        </div>
    )
}