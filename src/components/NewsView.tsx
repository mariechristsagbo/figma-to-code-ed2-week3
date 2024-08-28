'use client'
import React, { useState } from 'react'
import Header from "./Header"
import NewsCard from "./NewsCard"
import Sidebar from './Sidebar'

export default function NewsView() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex-1 font-mona">
            <div className="flex items-center w-full px-1 py-3 lg:p-6">
                <button
                    className="lg:hidden p-4 focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <img src="/icons/hamburger.svg" alt="Menu" className="w-8 h-8 border rounded-lg p-1 dark:border-tokena-dark-gray dark:border-opacity-40" />
                </button>
                <Header />
            </div>

            <div className='p-4 lg:p-6'>
                <div className="py-8">
                    <h1 className="font-semibold text-xl dark:text-tokena-light-gray text-tokena-dark">Latest crypto news</h1>
                    <NewsCard />
                </div>

                <div className="lg:hidden flex">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        closeSidebar={closeSidebar}
                    />
                </div>
            </div>
        </div>
    )
}
