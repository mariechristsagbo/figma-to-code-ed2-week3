import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-72 bg-white border-r h-screen flex flex-col font-mona font-medium px-4">
      <div className="my-5 py-3 bg-tokena-blue bg-opacity-5 rounded-lg px-3">
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
      <h2 className="text-tokena-dark-gray text-md mx-1">Menu</h2>
      <nav className="mt-6 flex-1">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-white bg-tokena-blue rounded-lg">
              <img src="/icons/home.svg" alt="Dashboard Icon" className="w-5 h-5" />
              <span className="ml-4">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/news.svg" alt="News Icon" className="w-5 h-5" />
              <span className="ml-4">News</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/activities.svg" alt="Activities Icon" className="w-5 h-5" />
              <span className="ml-4">Activities</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/cards.svg" alt="Cards Icon" className="w-5 h-5" />
              <span className="ml-4">Cards</span>
            </a>
          </li>
          <li className="flex items-center justify-between p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
            <a href="#" className="flex items-center">
              <img src="/icons/reports.svg" alt="Reports Icon" className="w-5 h-5" />
              <span className="ml-4">Reports</span>
            </a>
            <img src="/icons/chevron-down.svg" alt="Chevron Down Icon" className="w-5 h-5" />
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/notifications.svg" alt="Notifications Icon" className="w-5 h-5" />
              <span className="ml-4">Notifications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/billing.svg" alt="Billing Icon" className="w-5 h-5" />
              <span className="ml-4">Billing</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/invoices.svg" alt="Invoices Icon" className="w-5 h-5" />
              <span className="ml-4">Invoices</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/help-center.svg" alt="Help Center Icon" className="w-5 h-5" />
              <span className="ml-4">Help Center</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-3 text-tokena-dark hover:bg-gray-100 rounded-lg">
              <img src="/icons/settings.svg" alt="Settings Icon" className="w-5 h-5" />
              <span className="ml-4">Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="px-3 py-4 mt-auto flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/profile.svg" alt="User Profile" />
          <div className="ml-2">
            <div className="text-sm font-medium text-tokena-dark">John Doe</div>
            <div className="text-sm font-medium text-tokena-dark-gray">johndoe8@gmail.com</div>
          </div>
        </div>
        <img src="/icons/chevron-down.svg" alt="Chevron Down Icon" className="w-5 h-5" />
      </div>
    </aside>
  );
};

export default Sidebar;
