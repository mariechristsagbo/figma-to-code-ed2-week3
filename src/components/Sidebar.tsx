'use client';
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const router = useRouter();
  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-72 h-full sm:h-auto dark:bg-tokena-dark-blue-1 border-r dark:border-tokena-dark-gray dark:border-opacity-40 transform lg:static bg-white ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col font-mona font-medium px-4`}
      >
        <div className="my-5 py-3 bg-tokena-blue bg-opacity-5 rounded-xl px-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="flex items-center space-x-2">
            <div className="p-2">
              <img src="/images/logo.svg" alt="Tokena Logo" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-tokena-dark-2">Tokena</h1>
              <p className="text-sm text-tokena-blue font-bold">Finance app</p>
            </div>
          </div>
        </div>
        <h2 className="text-tokena-dark-gray dark:text-tokena-gray text-md mx-1">Menu</h2>
        <nav className="mt-6 flex-1 text-sm">
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-white bg-tokena-blue rounded-xl">
                <img
                  src="/icons/home.svg"
                  alt="Dashboard Icon"
                  className="w-5 h-5"
                />
                <span className="ml-4">Dashboard</span>
              </a>
            </li>
            <li onClick={() => router.push("/news")}>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/news.svg"
                  alt="News Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">News</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/activities.svg"
                  alt="Activities Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Activities</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/cards.svg"
                  alt="Cards Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Cards</span>
              </a>
            </li>
            <li className="flex items-center justify-between p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
              <a href="#" className="flex items-center">
                <img
                  src="/icons/reports.svg"
                  alt="Reports Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Reports</span>
              </a>
              <img
                src="/icons/chevron-down.svg"
                alt="Chevron Down Icon"
                className="w-5 h-5 dark:invert"
              />
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/notifications.svg"
                  alt="Notifications Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Notifications</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/billing.svg"
                  alt="Billing Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Billing</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/invoices.svg"
                  alt="Invoices Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Invoices</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/help-center.svg"
                  alt="Help Center Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Help Center</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100 rounded-xl">
                <img
                  src="/icons/settings.svg"
                  alt="Settings Icon"
                  className="w-5 h-5 dark:invert"
                />
                <span className="ml-4">Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="px-3 py-4 flex items-center justify-between mt-auto dark:bg-tokena-dark-blue-2 dark:rounded-xl mb-3">
          <div className="flex items-center">
            <img
              src="/images/profile.svg"
              alt="User Profile"
              className="dark:invert"
            />
            <div className="ml-2">
              <div className="text-sm font-medium text-tokena-dark dark:text-tokena-gray">John Doe</div>
              <div className="text-sm font-medium text-tokena-dark-gray dark:text-tokena-gray">johndoe8@gmail.com</div>
            </div>
          </div>
          <img
            src="/icons/chevron-down.svg"
            alt="Chevron Down Icon"
            className="w-5 h-5 dark:invert"
          />
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
