'use client'

import { Open_Sans } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import InputHandler from "./inputBox";

const openSans = Open_Sans(
    {
        weight : "600",
        subsets : ["latin"]
    }
)

export default function NewMeetOrJoin() {
    const route = useRouter();
    const [meetID, setMeetID] = useState('');

    const createMeet = async () => {
        const meetCode = await axios.post("/api/create-meet");
        route.push("/meet/" + meetCode.data.uuid);
    };

    const joinMeet = async () => {
        if (meetID) {
            route.push("/meet/" + meetID);
        }
    }

    return (
        <div className="pl-5 pr-5 flex justify-center flex-col" style={openSans.style}>
            <div className="m-auto mb-4 md:mb-5">
                <button className="
                bg-zinc-400
                bg-opacity-30 hover:bg-opacity-25 max-sm:focus:bg-opacity-25
                p-2 pl-3 pr-3 md:p-3
                rounded-2xl
                transition-all duration-150 ease-in-out
                shadow-[0_0_10px_rgba(0,0,0)] hover:shadow-[0_0_5px_#b7aeae] focus:shadow-[0_0_5px_#b7aeae]
                text-md sm:text-lg md:text-xl lg:text-2xl
                text-white
                "
                style={
                    {
                        textShadow : "5px 5px 15px black"
                    }
                }
                onClick={createMeet}
                >
                    Create New Meet
                </button>
            </div>

            <div className="relative m-auto mb-4 md:mb-5">
                <span className="
                    text-white
                    md:text-xl
                    select-none
                        before:absolute
                        before:top-3 md:before:top-4
                        before:right-5 md:before:right-7
                        before:-z-10
                        before:w-[49.25vw] md:before:w-[48.75vw]
                        before:h-px
                        before:bg-white

                        after:absolute
                        after:top-3 md:after:top-4
                        after:left-5 md:after:left-7
                        after:-z-10
                        after:w-[49.25vw] md:after:w-[48.75vw]
                        after:h-px
                        after:bg-white
                    ">
                    Or
                </span>
            </div>

            <div className="m-auto flex relative">
                <InputHandler
                    inputValue={meetID}
                    labelText="Enter Code to join"
                    inputName="JoinInput"
                    onChangeFn={
                        (event : ChangeEvent<HTMLInputElement>) => setMeetID(event.target.value)
                    }
                    keyDownHandler={
                        (event) => {
                            if (event.key.toLowerCase() == 'enter') joinMeet()
                        }
                    }
                />

                <button
                    className="
                    absolute
                    right-0 top-0
                    text-black
                    text-base
                    bg-[#a9faa2]
                    p-4 pr-2
                    rounded-s-3xl rounded-e
                    hover:bg-opacity-80
                    transition-all duration-200
                    "
                    onClick={joinMeet}
                >
                    Join
                </button>
            </div>
        </div>
    )
};