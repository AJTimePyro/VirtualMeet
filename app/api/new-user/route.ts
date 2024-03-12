import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const {meetID, peerID} = await req.json();
    await pusherServer.trigger(
        meetID,
        "new-user-joined",
        peerID
    );

    return new Response(
        null,
        {
            status : 200
        }
    );
}