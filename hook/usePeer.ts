import type Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const usePeer = () => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [peerID, setPeerID] = useState('');
    const isPeerSet = useRef(false);

    useEffect(
        () => {
            if (isPeerSet.current) return;

            isPeerSet.current = true;
            (async () => {
                const myPeer = new (await import('peerjs')).default(
                    {
                        host: "0.peerjs.com",
                        port: 443,
                        path: "/",
                        pingInterval: 5000
                    }
                );
                setPeer(myPeer);

                myPeer.on(
                    "open",
                    (id) => {
                        setPeerID(id);
                    }
                )
            })()
        },
        []
    )

    return {
        peer,
        peerID
    };
}

export default usePeer;