import PusherServer from "pusher";
import PusherClient from "pusher-js";


export const pusherServer = new PusherServer({
    appId : process.env.NEXT_PUSHER_APP_ID!,
    key : process.env.NEXT_PUSHER_KEY!,
    secret : process.env.NEXT_PUSHER_SECRET!,
    cluster : process.env.NEXT_PUSHER_CLUSTER!,
    useTLS : true
});

export const pusherClient = new PusherClient(
    process.env.NEXT_PUSHER_KEY!,
    {
        cluster : process.env.NEXT_PUSHER_CLUSTER!
    }
);