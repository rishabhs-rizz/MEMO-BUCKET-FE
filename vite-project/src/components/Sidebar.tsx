import { BrainIcon } from "../icons/BrainIcon";
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
            <SidebarItems icon={<TwitterIcon />} text="Tweets" />
            <SidebarItems icon={<YoutubeIcon />} text="Videos" />
          </div>
        </>
      )}
    </div>
  );
}
