'use client'
import { useState } from "react";
import Sidebar from "@/components/Sidebar"
import DashboardView from "@/components/DashboardView"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  return (
    <div className="flex dark:bg-tokena-dark-blue-1 dark:text-tokena-gray min-h-screen w-full">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />
      <DashboardView/>
    </div>
  )
} }
