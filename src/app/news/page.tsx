import Sidebar from "@/components/Sidebar"
import NewsView from "@/components/NewsView"

export default function News() {
  return (
    <div className="flex dark:bg-tokena-dark-blue-1 dark:text-tokena-gray min-h-screen w-full">
      <Sidebar/>
      <NewsView/>
    </div>
  )
}
