import { BrainIcon } from "../icons/BrainIcon";
import { HomeIcon } from "../icons/HomeIcon";
import { SidebarIcon } from "../icons/Sidebaricon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { SidebarItems } from "./SidebarItems";

//@ts-ignore
export function Sidebar({ SidebarOpen, SetSidebarOpen }) {
  return (
    <div
      className={`transition-all duration-300 bg-white min-h-screen ${
        SidebarOpen ? "w-48" : "w-12"
      }`}
    >
      <div className="p-2" onClick={() => SetSidebarOpen(!SidebarOpen)}>
        <SidebarIcon />
      </div>

      {SidebarOpen && (
        <>
          <div className="flex justify-center pt-2 text-lg font-semibold gap-2 text-blue-700">
            <BrainIcon /> BRAINLY
          </div>
          <div className="items flex-col mt-4">
            <a href="http://localhost:5173/dashboard">
              <SidebarItems icon={<HomeIcon />} text="Home" />
            </a>
            <a href="http://localhost:5173/dashboard/twitter">
              <SidebarItems icon={<TwitterIcon />} text="Tweets" />
            </a>
            <a href="http://localhost:5173/dashboard/youtube">
              <SidebarItems icon={<YoutubeIcon />} text="Videos" />
            </a>
          </div>
        </>
      )}
    </div>
  );
}
