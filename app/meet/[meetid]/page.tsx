'use client'

import { useParams } from "next/navigation";
import usePeer from "@/hook/usePeer";
import useStream from "@/hook/useStream";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import VideoStream from "@/components/videoStreamer";

export default function MeetPage() {
    const params = useParams();
    const meetParam = params.meetid;
    const meetID = Array.isArray(meetParam) ? meetParam.at(0)! : meetParam;

    const myStream = useStream();
    const {peer, peerID} = usePeer();
    const [streamArray, setStreamArray] = useState<Array<MediaStream | null>>([]);
    const [username, setUsername] = useState('');

    const streamHandler = (stream : MediaStream) => {
        setStreamArray(
            prevState => [...prevState, stream]
        );
    }

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

            peer.on(
                "call", (call) => {
                    call.answer(myStream);
                    call.once("stream", streamHandler);
                }
            );
    
            pusherClient.subscribe(meetID);
            pusherClient.bind(
                "new-user-joined",
                (newUserPeerID : string) => {
    
                    if (peerID != newUserPeerID) {
                        const call = peer.call(
                            newUserPeerID,
                            myStream
                        );
                        call.once("stream", streamHandler);
                    }
                }
            )
    
            return () => {
                pusherClient.unbind("new-user-joined");
                pusherClient.unsubscribe(meetID);
                peer.off("call");
            }
        },
        [peerID, myStream]
    );

    useEffect(
        () => {
            if (myStream) {
                setStreamArray(
                    prevState => [...prevState, myStream]
                );
            }
        },
        [myStream]
    )

    return (
        !username ?
        <div className="w-full">
            <div className="flex justify-center">
                <div className="relative">
                    <input
                        name="nameInput"
                        type="text"
                        value={username}
                        onChange={
                            (event) => setUsername(event.target.value)
                        }
                        placeholder=' '
                        className=""
                    />
                    <label
                        className="
                            absoulte top-0 left-0"
                        htmlFor="nameInput"
                    >
                        Enter Name
                    </label>
                </div>
            </div>
        </div> :

        <div>
            {
                streamArray.map(
                    (stream) => {
                        return <VideoStream key={stream?.id} stream={stream}/>;
                    }
                )
            }
        </div>
    )
}