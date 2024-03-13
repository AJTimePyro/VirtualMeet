import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const {meetID, peerID, username} = await req.json();
    await pusherServer.trigger(
        meetID,
        "new-user-joined",{
            newUserPeerID : peerID,
            userName : username
        }
    );

    return new Response(
        null,
        {
            status : 200
        }
    );
}