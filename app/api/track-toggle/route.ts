import { pusherServer } from "@/lib/pusher";
import { NextRequest } from "next/server";

export async function POST(req : NextRequest) {
    const {meetID, newState, requestedStreamID, track} = await req.json();

    let trackToUpdate;
    switch (track.toLowerCase()) {
        case "audio":
            trackToUpdate = "audio";
            break;
        case "video":
            trackToUpdate = "video";
            break;
        default:
            return new Response(
                null,
                {
                    status : 406
                }
            );
    };

    await pusherServer.trigger(
        meetID,
        `${trackToUpdate}-toggle`, {
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