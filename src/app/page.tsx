
import Sidebar from "@/components/Sidebar"
import DashboardView from "@/components/DashboardView"

export default function Dashboard() {
  
  return (
    <div className="flex dark:bg-tokena-dark-blue-1 dark:text-tokena-gray min-h-screen w-full">
      <Sidebar/>
      <DashboardView/>
    </div>
  )
} 
