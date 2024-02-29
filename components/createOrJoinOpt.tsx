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
            <div className="m-auto mb-10 sm:mb-16 md:mb-20" style={openSans.style}>
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

            <div className="m-auto">
                <input
                    type="text"
                    className=""
                />
            </div>
        </div>
    )
};