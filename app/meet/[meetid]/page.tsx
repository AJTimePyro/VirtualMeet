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
    const videoRef2 = useRef<null | HTMLVideoElement>(null);
    const myStream = useStream();
    const {peer, peerID} = usePeer();

    useEffect(
        () => {
            if (!peer || !peerID || !myStream) return;

            (async () => {
                await axios.post(
                    "/api/new-user",
                    {
                        meetID,
                        peerID
                    }
                );
            })();
    
            pusherClient.subscribe(meetID);
            pusherClient.bind(
                "new-user-joined",
                (newUserPeerID : string) => {
    
                    if (peerID != newUserPeerID) {
                        console.log("New user joined " + newUserPeerID);
    
                        const call = peer.call(
                            newUserPeerID,
                            myStream
                        );

                        call.on(
                            "stream",
                            (stream) => {
                                console.log("incoming stream from " + call.peer);
                                videoRef2.current!.srcObject = stream;
                            }
                        );
                    }
                }
            )
    
            return () => {
                pusherClient.unbind("new-user-joined");
                pusherClient.unsubscribe(meetID);
            }
        },
        [peer, peerID, myStream]
    );

    useEffect(
        () => {
            if (!peer || !myStream) return;

            peer.on(
                "call",
                (call) => {
                    call.answer(myStream);
                    
                    call.on(
                        "stream",
                        (stream) => {
                            console.log("incoming stream from " + call.peer);
                            videoRef2.current!.srcObject = stream;
                        }
                    );
                }
            );
        },
        [peer, myStream]
    )

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
            <video ref={videoRef2} autoPlay={true} muted={true}/>
        </div>
    )
}