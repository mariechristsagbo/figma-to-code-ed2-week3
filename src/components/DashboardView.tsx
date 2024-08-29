'use client'
import React, { useState } from "react";
import MarketTable from "./MarketTable";
import BalanceSection from "./BalanceSection";
import SearchBar from "./SearchBar";
import { SearchResult } from "@/types";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardView() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <div className="flex-1 p-6 font-mona">
      <div className="flex items-center w-full">
        <button
          className="lg:hidden p-4 focus:outline-none"
          onClick={toggleSidebar}
        >
          <img src="/icons/hamburger.svg" alt="Menu" className="w-8 h-8 border rounded-lg p-1 dark:border-tokena-dark-gray dark:border-opacity-40" />
        </button>
        <Header />
      </div>

      <BalanceSection />
      <section className="my-10">
        <div className="flex items-center justify-between md:flex-row flex-col gap-4">
          <SearchBar onSearchResults={setSearchResults} />

          <button className="flex items-center justify-between lg:w-1/6 w-80 p-3 px-4 border border-tokena-gray dark:border-tokena-dark-gray dark:border-opacity-40 rounded-xl">
            <span className="text-tokena-dark-gray font-medium">Categories</span>
            <img src="/icons/chevron-down.svg" alt="Chevron Down" className="w-4 h-4 dark:invert" />
          </button>
        </div>
      </section>

      <MarketTable searchResults={searchResults} />

      <div className="lg:hidden flex">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
      </div>

    </div>
  );
}
