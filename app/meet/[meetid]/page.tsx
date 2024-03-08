'use client'

import { useParams } from "next/navigation";
import usePeer from "@/hook/usePeer";

export default function MeetPage() {
    const params = useParams();
    // console.log(params.meetid);
    const {peer, peerID} = usePeer();
    return (
        <div>
            
        </div>
    )
}