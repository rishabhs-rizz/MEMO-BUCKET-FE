import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { MainComponent } from "../utils/MainComponent";

export function DashBoard() {
  const [SidebarOpen, SetSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar SidebarOpen={SidebarOpen} SetSidebarOpen={SetSidebarOpen} />
      <div className="flex-1 overflow-auto">
        <MainComponent />
      </div>
    </div>
  );
}
