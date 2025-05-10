import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { MainComponent } from "../utils/MainComponent";

export function DashBoard() {
  const [SidebarOpen, SetSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <span>
        <Sidebar SidebarOpen={SidebarOpen} SetSidebarOpen={SetSidebarOpen} />
      </span>
      <div className="w-full">
        <MainComponent />
      </div>
    </div>
  );
}
