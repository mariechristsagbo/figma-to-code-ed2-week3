import Sidebar from "@/components/Sidebar"
import DashboardView from "@/components/DashboardView"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar/>
      <DashboardView/>
    </div>
  )
}
