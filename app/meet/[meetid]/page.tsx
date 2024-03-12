'use client'

import { useParams } from "next/navigation";
import usePeer from "@/hook/usePeer";
import useStream from "@/hook/useStream";
import { ChangeEvent, useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import VideoStream from "@/components/videoStreamer";
import InputHandler from "@/components/inputBox";
import { type UserStreamData } from "@/interfaces/StreamInterface";

export default function MeetPage() {
    const params = useParams();
    const meetParam = params.meetid;
    const meetID = Array.isArray(meetParam) ? meetParam.at(0)! : meetParam;

    const myStream = useStream();
    const {peer, peerID} = usePeer();
    const [streamArray, setStreamArray] = useState<Array<UserStreamData>>([]);
    const [username, setUsername] = useState('');
    const [isUserNameSet, updateIsUserNameSet] = useState(false);

    const streamHandler = (stream : MediaStream) => {
        setStreamArray(
            prevState => [...prevState, {
                stream : stream,
                username : username,
                streamID : stream.id
            }]
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
                    prevState => [...prevState, {
                        stream : myStream,
                        username : username,
                        streamID : myStream.id
                    }]
                );
            }
        },
        [myStream]
    )

    return (
        !isUserNameSet ?
        <div className="w-full my-20">
            <div className="flex justify-center relative">
                <InputHandler
                    inputValue={username}
                    labelText="Enter your name"
                    inputName="nameInput"
                    onChangeFn={
                        (event : ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
                    }
                    keyDownHandler={
                        (event) => {
                            if (event.key.toLowerCase() == "enter") {
                                updateIsUserNameSet(true);
                            }
                        }
                    }
                />
            </div>
        </div> :

        <div>
            {
                streamArray.map(
                    (streamData) => {
                        return <VideoStream
                            key={streamData.streamID}
                            streamData={streamData}
                        />;
                    }
                )
            }
        </div>
    )
}