import { Open_Sans } from "next/font/google";

const openSans = Open_Sans(
    {
        weight : "600",
        subsets : ["latin"]
    }
)

export default function NewMeetOrJoin() {
    return (
        <div className="pl-5 pr-5 flex justify-center flex-col">
            <div className="m-auto mb-4 md:mb-5" style={openSans.style}>
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
                        textShadow : "5px 5px 5px black"
                    }
                }
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

            <div className="m-auto relative">
                <input
                    name="JoinInput"
                    type="text"
                    className="
                        bg-slate-300
                        bg-opacity-40
                        text-white
                        py-5 px-4
                        h-14
                        rounded
                        outline-none
                        peer
                        focus:pt-9
                    "
                    placeholder=" "
                />
                <label
                    className="
                        text-white text-opacity-75
                        absolute
                        top-4 left-4 -z-10
                        peer-focus:scale-90
                        peer-focus:top-1
                        peer-focus:left-1
                        transition-all duration-150
                    "
                    htmlFor="JoinInput">
                    Enter Meeting Code to join
                </label>
            </div>
        </div>
    )
};