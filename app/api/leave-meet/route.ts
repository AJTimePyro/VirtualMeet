import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const {meetID, requestedStreamID} = await req.json();

    await pusherServer.trigger(
        meetID,
        "leaving-meet",
        requestedStreamID
    );

    return new Response(
        null,
        {
            status : 200
        }
    );
};