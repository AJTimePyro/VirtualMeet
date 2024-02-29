import NewMeetOrJoin from "@/components/createOrJoinOpt";
import Navbar from "@/components/navbar";
import { Roboto } from "next/font/google";
import "./page.css";

const roboto = Roboto(
  {
    weight : "500",
    subsets : ["latin-ext"]
  }
)

export default function Home() {
  return (
    <main>
      <Navbar/>
      
      <section className="mt-10 sm:mt-16 md:mt-20">
        <div
          className="pl-5 pr-5 select-none mb-10 sm:mb-16 md:mb-20 opacity-100 transition-opacity"
          style={
            {animation : "SlideToRightWithFadeOut 1s linear"}
          }
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center" style={roboto.style}>
            Virtual Meet the ultimate video conference
          </h1>
        </div>

        <NewMeetOrJoin />
      </section>
    </main>
  );
}
