import pusherJs, { type Channel } from "pusher-js";
import { useEffect, useState } from "react";

const usePusher = (
    meetID : string
) => {
    const [pusherChannel, setPusherChannel] = useState<null | Channel>(null);
    
    useEffect(
        () => {
            (async () => {
                const myPusher = new pusherJs(
                    process.env.NEXT_PUBLIC_PUSHER_KEY!,
                    {
                        cluster : process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
                    }
                )
    
                const myPusherChannel = myPusher.subscribe(meetID);
                setPusherChannel(myPusherChannel);
                myPusherChannel.bind(
                    "client-new-user-joined",
                    (newUserPeerID : string) => {
                        console.log("New user joined " + newUserPeerID);
                    }
                    // () => console.log("hi jaan")
                )

                // return () => myPusher.unsubscribe(meetID);
            })()
        },
        []
    )

    return pusherChannel;
};

export default usePusher;