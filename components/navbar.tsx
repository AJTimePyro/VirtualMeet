import { Open_Sans } from "next/font/google";
import RealTime from "./realTime";

const openSans = Open_Sans(
    {
        weight : "600",
        subsets : ["latin"]
    }
)

export default function Navbar() {
    return (
        <nav className="flex justify-between bg-[#a9faa2] pl-4 pr-4 items-center">
            <div>
                <img
                    className="w-48 h-16 object-cover object-center"
                    src="web-logo.png"
                    alt="Virtual Meet Logo"
                />
            </div>

            <RealTime />
        </nav>
    );
};