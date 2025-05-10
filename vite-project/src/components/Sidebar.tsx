import { BrainIcon } from "../icons/BrainIcon";
import { SidebarIcon } from "../icons/Sidebaricon";
import { TwitterIcon } from "../icons/twitterIcon";
import { YoutubeIcon } from "../icons/youtubeIcon";
import { SidebarItems } from "./SidebarItems";

//@ts-ignore
export function Sidebar({SidebarOpen, SetSidebarOpen}){
    if(!SidebarOpen){
      return <div className='fixed top-0 left-0'>
      <div className='hover:cursor-pointer hover:bg-slate-200' onClick={()=> {SetSidebarOpen(!SidebarOpen)}}>
        <SidebarIcon/>
      </div>
      </div>
    }
    return <div className=' transition-all duration-150 w-0 md:w-48 h-screen bg-white'>
      <span className='hover:cursor-pointer' onClick={()=> {SetSidebarOpen(!SidebarOpen)}}>
        <SidebarIcon/>
      </span>
      <div className="flex justify-center pt-2 text-lg font-semibold gap-2 text-blue-700"><BrainIcon/> BRAINLY</div>
      <div><SidebarItems icon={<TwitterIcon/>} text={"Tweets"}/></div>
      <div><SidebarItems icon={<YoutubeIcon/>} text={"Videos"}/></div>
    </div>
  }