'use client';
import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants";

interface SidebarProps {
  isOpen?: boolean;
  toggleSidebar?: () => void;
  closeSidebar?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-full w-[250px] lg:h-auto dark:bg-tokena-dark-blue-1 border-r dark:border-tokena-dark-gray dark:border-opacity-40 transform lg:static bg-white ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col font-mona font-medium px-3`}
      >
        <div className="my-5 py-3 bg-tokena-blue bg-opacity-5 rounded-xl px-3 cursor-pointer" onClick={() => router.push("/")}>
          <div className="flex items-center space-x-2">
            <div className="p-2">
              <img src="/images/logo.svg" alt="Tokena Logo" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-tokena-dark-2">Tokena</h1>
              <p className="text-xs text-tokena-blue font-bold">Finance app</p>
            </div>
          </div>
        </div>
        <h2 className="text-tokena-dark-gray dark:text-tokena-gray text-sm mx-1">Menu</h2>
        <nav className="mt-4 flex-1 text-xs">
          <ul className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <li key={link.label} onClick={() => router.push(link.path)}>
                  <a
                    href="#"
                    className={`flex items-center p-3 ${isActive
                        ? "text-tokena-white bg-tokena-blue"
                        : "text-tokena-dark dark:text-tokena-gray dark:hover:bg-tokena-blue hover:bg-gray-100"
                      } rounded-xl`}
                  >
                    <img
                      src={link.icon}
                      alt={`${link.label} Icon`}
                      className={`w-5 h-5 ${isActive ? 'invert' : 'dark:invert'}`}
                    />
                    <span className="ml-4">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-2 flex items-center justify-between mt-auto dark:bg-tokena-dark-blue-2 dark:rounded-xl mb-3">
          <div className="flex items-center">
            <img
              src="/images/profile.svg"
              alt="User Profile"
              className="dark:invert"
            />
            <div className="ml-2">
              <div className="text-xs font-medium text-tokena-dark dark:text-tokena-gray">John Doe</div>
              <div className="text-xs font-medium text-tokena-dark-gray dark:text-tokena-gray">johndoe8@gmail.com</div>
            </div>
          </div>
          <img
            src="/icons/chevron-down.svg"
            alt="Chevron Down Icon"
            className="w-4 h-4 dark:invert"
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
