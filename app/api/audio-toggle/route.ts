import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const {meetID, newState, requestedStreamID} = await req.json();
    await pusherServer.trigger(
        meetID,
        "audio-toggle", {
            newState : newState,
            requestedStreamID : requestedStreamID
        }
    );

    return new Response(
        null,
        {
            status : 200
        }
    );
};