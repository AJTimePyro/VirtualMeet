'use client'

import { useParams, useRouter } from "next/navigation";
import usePeer from "@/hook/usePeer";
import useStream from "@/hook/useStream";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import VideoStream from "@/components/videoStreamer";
import InputHandler from "@/components/inputBox";
import { type UserStreamData } from "@/interfaces/StreamInterface";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default function MeetPage() {
    const params = useParams();
    const meetParam = params.meetid;
    const meetID = Array.isArray(meetParam) ? meetParam.at(0)! : meetParam;

    const myStream = useStream();
    const {peer, peerID} = usePeer();
    const [streamArray, setStreamArray] = useState<Array<UserStreamData>>([]);
    const [username, setUsername] = useState('');
    const [isUserNameSet, updateIsUserNameSet] = useState(false);
    const receivedUsername = useRef('');
    const route = useRouter();

    const permissionDeniedNotification = () => Store.addNotification({
        title : "Error",
        message : "You can't join without camera and mic permission",
        type : "danger",
        insert : "top",
        container : "bottom-center",
        animationIn : ["animate__animated", "animate__fadeIn"],
        animationOut : ["animate__animated", "animate__fadeOut"],
        dismiss : {
            duration : 2750,
            onScreen : true
        }
    });

    const streamHandler = (stream : MediaStream) => {
        setStreamArray(
            prevState => [...prevState, {
                stream : stream,
                username : receivedUsername.current,
                streamID : stream.id
            }]
        );
    }

    useEffect(
        () => {
            if (!peer || !peerID || !(myStream instanceof MediaStream) || !isUserNameSet) return;

            (async () => {
                await axios.post(
                    "/api/new-user",
                    {
                        meetID,
                        peerID,
                        username
                    }
                );
            })();

            peer.on(
                "call", (call) => {
                    receivedUsername.current = call.metadata.username;
                    call.answer(myStream);
                    call.once("stream", streamHandler);
                }
            );
    
            pusherClient.subscribe(meetID);
            pusherClient.bind(
                "new-user-joined",
                (data : {newUserPeerID : string, userName : string}) => {
                    const { newUserPeerID, userName } = data;
                    if (peerID != newUserPeerID) {
                        receivedUsername.current = userName;
                        const call = peer.call(
                            newUserPeerID,
                            myStream,
                            {
                                metadata : {
                                    username : username
                                }
                            }
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
        [peerID, myStream, isUserNameSet]
    );

    useEffect(
        () => {
            if (myStream === -1) {
                permissionDeniedNotification();
                setTimeout(
                    () => route.push('/'),
                    3000
                );
            }
            else if (myStream instanceof MediaStream && username) {
                setStreamArray(
                    prevState => [...prevState, {
                        stream : myStream,
                        username : username,
                        streamID : myStream.id,
                        mute : true
                    }]
                );
            }
        },
        [myStream, isUserNameSet]
    );

    const userNameHandler = () => {
        if (username && !isUserNameSet && myStream instanceof MediaStream) updateIsUserNameSet(true);
    };

    return (
        !isUserNameSet ?
        <section className="w-full my-14 flex justify-center flex-col">
            <div className="flex justify-center relative my-6">
                <InputHandler
                    inputValue={username}
                    labelText="Enter your name"
                    inputName="nameInput"
                    fieldName="Name"
                    onChangeFn={
                        (event : ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
                    }
                    keyDownHandler={
                        (event) => {
                            if (event.key.toLowerCase() == "enter") userNameHandler();
                        }
                    }
                />
            </div>

            <div className="m-auto mb-8">
                <button className={`bg-[#a9faa2] p-4 rounded hover:bg-opacity-90 transition-all duration-150 ${username && myStream instanceof MediaStream ? "cursor-pointer" : "cursor-not-allowed"}`} onClick={userNameHandler}>
                    Enter the meet
                </button>
            </div>

            <ReactNotifications/>
        </section> :

        <section className="flex flex-wrap gap-2 md:gap-8 justify-center mt-8 mx-4">
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
        </section>
    )
}